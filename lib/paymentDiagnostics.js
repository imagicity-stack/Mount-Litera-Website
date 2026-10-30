/**
 * Payment failures: what the payer is told, and what the school is told.
 *
 * These are two different audiences and they need different things.
 *
 * A parent at a pay button can do exactly one of two things: try again, or
 * reach us another way. They cannot act on "Authentication failed", "amount
 * must be at least 100" or any other order-creation fault, because every one
 * of them is at our end. So no gateway text reaches a payer — it was alarming
 * and it advertised that the school's payment setup was misconfigured. The
 * only distinction worth making to them is whether trying again might work.
 *
 * The school needs the opposite: the gateway's own words, and a reading of
 * what they imply. That goes to the server log and to the admin self-check,
 * both of which are behind the admin guard.
 */

/** Whether another attempt could plausibly succeed. */
export const GATEWAY_FAULT = {
  /** Credentials or account state. Retrying changes nothing. */
  CONFIG: 'config',
  /** The gateway did not answer, or answered 5xx. Worth another try. */
  TRANSIENT: 'transient',
  /** The gateway rejected the request itself — still our end, not the payer's. */
  REQUEST: 'request'
};

const CONFIG_PATTERNS = [
  /authentication failed/i,
  /unauthor/i,
  /invalid api key/i,
  /not activated/i,
  /account .*(suspend|disabl|block)/i,
  /merchant .*(not|disabl)/i
];

/**
 * Read a RazorpayError (or any thrown value) into a fault class, the line a
 * payer should see, and the reason the school should see.
 */
export const classifyGatewayError = (error) => {
  const code = error?.code || '';
  const status = Number(error?.status) || 0;
  const message = String(error?.message || '');

  const transient =
    code === 'timeout' || code === 'network' || (status >= 500 && status <= 599);

  const config =
    code === 'no_credentials' ||
    status === 401 ||
    status === 403 ||
    CONFIG_PATTERNS.some((pattern) => pattern.test(message));

  const fault = transient ? GATEWAY_FAULT.TRANSIENT : config ? GATEWAY_FAULT.CONFIG : GATEWAY_FAULT.REQUEST;

  return {
    fault,
    /**
     * Deliberately free of gateway wording. The config and request cases both
     * say "our end" because that is true of both, and both say the record is
     * safe — by the time an order is raised the registration or booking is
     * already written, so the school can finish it by hand.
     */
    payerMessage:
      fault === GATEWAY_FAULT.TRANSIENT
        ? 'We could not reach the payment gateway just now. Please try again in a moment.'
        : 'Online payment is not working at the moment. This is a problem at our end, not with your details, and what you have entered is saved. Please message us on WhatsApp and we will complete it for you.',
    /** For the log and the admin self-check only. */
    adminReason: message || code || 'unknown gateway failure'
  };
};

/**
 * What a credential shape report implies, in plain English, most severe first.
 * Shared by every module's payment self-check so one fix covers all of them.
 *
 * `config` is the output of `describePaymentConfig`.
 */
export const diagnoseCredentials = (config) => {
  const problems = [];

  if (!config.keyIdPresent) problems.push('RAZORPAY_KEY_ID is not set.');
  if (!config.keySecretPresent) problems.push('RAZORPAY_KEY_SECRET is not set.');

  if (config.keyIdHadWhitespace) {
    problems.push(
      'RAZORPAY_KEY_ID has whitespace around it (usually a newline picked up when pasting). It is trimmed before use, but fix it at the source.'
    );
  }
  if (config.keySecretHadWhitespace) {
    problems.push(
      'RAZORPAY_KEY_SECRET has whitespace around it. It is trimmed before use, but an untrimmed secret is the usual cause of both failed orders and failed signature checks.'
    );
  }
  if (config.keyIdPresent && config.mode === 'unrecognised') {
    problems.push(
      'RAZORPAY_KEY_ID does not start with rzp_test_ or rzp_live_ — check that the key id and the secret have not been swapped.'
    );
  }
  if (!config.publishableKeyMatchesSecretKey) {
    problems.push(
      'NEXT_PUBLIC_RAZORPAY_KEY_ID does not match RAZORPAY_KEY_ID, so the checkout would open against a different account than the order was created in.'
    );
  }

  return problems;
};

/**
 * What to do when the credentials are well-formed and the gateway still says
 * no. This is the case a shape check cannot see: the keys look perfect and
 * belong to nothing. Ordered by how often each one turns out to be the cause.
 */
export const REJECTED_CREDENTIAL_CAUSES = [
  'The key was regenerated in the Razorpay dashboard and the new one was never copied here. Regenerating immediately invalidates the old secret, and nothing in this project would notice.',
  'The key id and the secret come from different key pairs — for example a live id kept alongside a secret from the test pair.',
  'The keys belong to a different Razorpay account than the one now in use.',
  'The account is not activated for live payments, so its live keys are not usable yet.'
];

/**
 * Turn a failed ₹1 probe into instructions. Kept beside the causes so the
 * self-check never reports "rejected" without saying what to do about it.
 */
export const interpretProbeFailure = (probe, config) => {
  if (!probe || probe.ok) return null;

  const credentialFault = classifyGatewayError(probe).fault === GATEWAY_FAULT.CONFIG;
  if (!credentialFault) {
    return {
      headline: 'The gateway refused the request, but not over the credentials.',
      causes: [],
      nextStep: 'The gateway’s own reason is shown above; it describes the order, not the keys.'
    };
  }

  return {
    headline: `Razorpay rejected these ${config.mode === 'unrecognised' ? '' : `${config.mode} `}credentials.`,
    causes: REJECTED_CREDENTIAL_CAUSES,
    nextStep:
      'Generate a fresh key pair in the Razorpay dashboard (Settings → API Keys), set RAZORPAY_KEY_ID, RAZORPAY_KEY_SECRET and NEXT_PUBLIC_RAZORPAY_KEY_ID from that one pair, then redeploy — environment variables are read at build time, so a change without a redeploy leaves the old value live.'
  };
};
