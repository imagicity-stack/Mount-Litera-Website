/**
 * Razorpay client.
 *
 * A small hand-rolled client rather than the SDK, kept from the original
 * admission-token implementation. It lives in `lib/` because both routers use
 * it: the App Router admission routes (`app/api/razorpay/*`) and the Parent
 * Room's pages-router routes. It previously sat inside an App Router route
 * folder and was imported across from `pages/api`, which is fragile under
 * per-route dependency tracing and is not where this codebase keeps shared
 * server code.
 *
 * Two details matter operationally:
 *
 *   • Credentials are trimmed. A key pasted into a hosting dashboard very often
 *     carries a trailing newline or space, and Razorpay answers that with a
 *     401 that looks exactly like a wrong key.
 *   • Failures carry the gateway's own status, code and description, so a
 *     caller can say what actually went wrong instead of "Bad Gateway".
 */

import { Buffer } from 'node:buffer';

const RAZORPAY_ORDER_ENDPOINT = 'https://api.razorpay.com/v1/orders';

/**
 * Deliberately shorter than the platform's own function timeout (10s by
 * default on Vercel). If this deadline were the longer of the two, a slow
 * gateway would have the function killed underneath it and the caller would
 * get an HTML error page from the platform instead of a JSON reason — which is
 * exactly the unreadable "502 Bad Gateway" this client exists to avoid.
 */
const REQUEST_TIMEOUT_MS = 8000;

/** Env values arrive as strings that may carry whitespace; never trust the edges. */
export const cleanKey = (value) => String(value ?? '').trim();

export class RazorpayError extends Error {
  constructor(message, { status, code, reason, details } = {}) {
    super(message);
    this.name = 'RazorpayError';
    this.status = status;
    this.code = code;
    this.reason = reason;
    this.details = details;
  }
}

export default class Razorpay {
  constructor(options = {}) {
    const { key_id, key_secret } = options;

    this.keyId = cleanKey(key_id);
    this.keySecret = cleanKey(key_secret);

    this.orders = {
      create: (params) => this.createOrder(params)
    };
  }

  hasCredentials() {
    return Boolean(this.keyId && this.keySecret);
  }

  async createOrder(params = {}) {
    if (!this.hasCredentials()) {
      throw new RazorpayError('Missing Razorpay credentials.', { code: 'no_credentials' });
    }

    const authToken = Buffer.from(`${this.keyId}:${this.keySecret}`).toString('base64');

    // Without a deadline a hung gateway holds the serverless function open
    // until the platform kills it, which reads as a timeout rather than a
    // payment problem.
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), REQUEST_TIMEOUT_MS);

    let response;
    try {
      response = await fetch(RAZORPAY_ORDER_ENDPOINT, {
        method: 'POST',
        headers: {
          Authorization: `Basic ${authToken}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(params),
        signal: controller.signal
      });
    } catch (error) {
      throw new RazorpayError(
        error?.name === 'AbortError'
          ? 'The payment gateway did not respond in time.'
          : `Could not reach the payment gateway: ${error?.message || 'network error'}`,
        { code: error?.name === 'AbortError' ? 'timeout' : 'network' }
      );
    } finally {
      clearTimeout(timer);
    }

    const raw = await response.text().catch(() => '');
    let data = {};
    try {
      data = raw ? JSON.parse(raw) : {};
    } catch (error) {
      data = {};
    }

    if (!response.ok) {
      throw new RazorpayError(
        data?.error?.description ||
          (response.status === 401
            ? 'Razorpay rejected the API credentials.'
            : 'Failed to create Razorpay order.'),
        {
          status: response.status,
          code: data?.error?.code || `http_${response.status}`,
          reason: data?.error?.reason || data?.error?.field || '',
          details: data?.error || raw.slice(0, 400)
        }
      );
    }

    return data;
  }
}
