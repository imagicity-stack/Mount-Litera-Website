import { Buffer } from 'node:buffer';

const RAZORPAY_ORDER_ENDPOINT = 'https://api.razorpay.com/v1/orders';

export default class Razorpay {
  constructor(options = {}) {
    const { key_id, key_secret } = options;

    this.keyId = key_id;
    this.keySecret = key_secret;

    this.orders = {
      create: (params) => this.createOrder(params)
    };
  }

  hasCredentials() {
    return Boolean(this.keyId && this.keySecret);
  }

  async createOrder(params = {}) {
    if (!this.hasCredentials()) {
      throw new Error('Missing Razorpay credentials.');
    }

    const authToken = Buffer.from(`${this.keyId}:${this.keySecret}`).toString('base64');

    const response = await fetch(RAZORPAY_ORDER_ENDPOINT, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${authToken}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(params)
    });

    const data = await response.json().catch(() => ({}));

    if (!response.ok) {
      const message = data?.error?.description || 'Failed to create Razorpay order.';
      const error = new Error(message);
      error.details = data;
      throw error;
    }

    return data;
  }
}
