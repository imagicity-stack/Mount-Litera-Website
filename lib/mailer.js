import nodemailer from 'nodemailer';

const DEFAULT_FROM = 'noreply@eldenheights.org';

/**
 * Email is sent through one of two transports:
 *
 *   1. Microsoft Graph API (preferred) — app-only OAuth, works with Security
 *      Defaults / MFA left ON and survives the Dec 2026 SMTP basic-auth
 *      retirement. Enabled when MS_TENANT_ID + MS_CLIENT_ID + MS_CLIENT_SECRET
 *      are configured.
 *   2. SMTP (nodemailer) — fallback, used when the Graph vars are absent and
 *      the SMTP_* vars are present.
 *
 * Both share the same sendEmail({ to, subject, text, html, replyTo, from })
 * signature so the API routes never need to know which transport is active.
 */

function resolveSender(from) {
  return from || process.env.MS_SENDER || process.env.SMTP_FROM || DEFAULT_FROM;
}

function toAddressList(value) {
  if (!value) return [];
  const list = Array.isArray(value) ? value : String(value).split(',');
  return list.map((address) => String(address).trim()).filter(Boolean);
}

// ---------------------------------------------------------------------------
// Microsoft Graph transport
// ---------------------------------------------------------------------------

let graphToken = { value: null, expiresAt: 0 };

function hasGraphConfig() {
  return Boolean(
    process.env.MS_TENANT_ID &&
      process.env.MS_CLIENT_ID &&
      process.env.MS_CLIENT_SECRET
  );
}

async function getGraphToken() {
  const now = Date.now();
  // Reuse the cached token until 60s before it expires.
  if (graphToken.value && now < graphToken.expiresAt - 60_000) {
    return graphToken.value;
  }

  const { MS_TENANT_ID, MS_CLIENT_ID, MS_CLIENT_SECRET } = process.env;

  const response = await fetch(
    `https://login.microsoftonline.com/${MS_TENANT_ID}/oauth2/v2.0/token`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: new URLSearchParams({
        client_id: MS_CLIENT_ID,
        client_secret: MS_CLIENT_SECRET,
        scope: 'https://graph.microsoft.com/.default',
        grant_type: 'client_credentials'
      }).toString()
    }
  );

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    const error = new Error(
      `Graph token request failed (${response.status}): ${data.error || ''} ${
        data.error_description || ''
      }`.trim()
    );
    error.responseCode = response.status;
    error.response = data.error_description || data.error;
    throw error;
  }

  graphToken = {
    value: data.access_token,
    expiresAt: now + (Number(data.expires_in) || 3600) * 1000
  };

  return graphToken.value;
}

async function sendViaGraph({ to, subject, text, html, replyTo, from }) {
  const sender = resolveSender(from);
  const token = await getGraphToken();

  const message = {
    subject,
    body: html
      ? { contentType: 'HTML', content: html }
      : { contentType: 'Text', content: text || '' },
    toRecipients: toAddressList(to).map((address) => ({
      emailAddress: { address }
    }))
  };

  const replyToList = toAddressList(replyTo);
  if (replyToList.length > 0) {
    message.replyTo = replyToList.map((address) => ({
      emailAddress: { address }
    }));
  }

  const response = await fetch(
    `https://graph.microsoft.com/v1.0/users/${encodeURIComponent(
      sender
    )}/sendMail`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ message, saveToSentItems: false })
    }
  );

  // Graph sendMail returns 202 Accepted with an empty body on success.
  if (!response.ok) {
    const detail = await response.text().catch(() => '');
    const error = new Error(
      `Graph sendMail failed (${response.status}): ${detail}`
    );
    error.responseCode = response.status;
    error.response = detail;
    throw error;
  }
}

// ---------------------------------------------------------------------------
// SMTP transport (fallback)
// ---------------------------------------------------------------------------

let transporter;

function getTransporter() {
  if (transporter) {
    return transporter;
  }

  const { SMTP_HOST, SMTP_PORT = 587, SMTP_USER, SMTP_PASS } = process.env;

  const missing = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS'].filter(
    (key) => !process.env[key]
  );

  if (missing.length > 0) {
    throw new Error(
      `SMTP configuration is incomplete. Missing: ${missing.join(', ')}`
    );
  }

  const port = Number(SMTP_PORT) || 587;
  const secure = port === 465;

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure,
    // Force STARTTLS on submission port 587 (Microsoft 365 / Outlook mandates
    // TLS 1.2+ and will not accept an unencrypted AUTH). Ignored when secure=true.
    requireTLS: !secure,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    },
    tls: {
      // Ensure TLS is negotiated on submission ports like 587
      minVersion: 'TLSv1.2'
    }
  });

  return transporter;
}

async function sendViaSmtp({ to, subject, text, html, replyTo, from }) {
  const transporterInstance = getTransporter();

  await transporterInstance.sendMail({
    from: resolveSender(from),
    to,
    subject,
    text,
    ...(html ? { html } : {}),
    ...(replyTo ? { replyTo } : {})
  });
}

// ---------------------------------------------------------------------------
// Public API
// ---------------------------------------------------------------------------

export async function sendEmail({ to, subject, text, html, replyTo, from }) {
  if (!to) {
    throw new Error('Recipient address is required.');
  }

  if (hasGraphConfig()) {
    return sendViaGraph({ to, subject, text, html, replyTo, from });
  }

  return sendViaSmtp({ to, subject, text, html, replyTo, from });
}
