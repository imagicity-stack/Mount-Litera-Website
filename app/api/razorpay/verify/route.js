import crypto from 'node:crypto';
import Razorpay from '../order/razorpay';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const body = await request.json();
    const { orderId, paymentId, signature, formData } = body || {};

    if (!orderId || !paymentId || !signature) {
      return NextResponse.json(
        { error: 'Incomplete payment details received for verification.' },
        { status: 400 }
      );
    }

    if (!process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { error: 'Payment gateway is not configured. Please contact the school team.' },
        { status: 500 }
      );
    }

    // Initialising Razorpay satisfies compliance with SDK expectations if utilities are needed later.
    // eslint-disable-next-line no-new
    new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET });

    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    if (expectedSignature !== signature) {
      return NextResponse.json({ success: false, error: 'Invalid payment signature received.' }, { status: 400 });
    }

    console.log('Admissions payment verified:', {
      orderId,
      paymentId,
      signature,
      formData
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error verifying Razorpay payment:', error);
    return NextResponse.json({ error: 'Verification failed. Please try again.' }, { status: 500 });
  }
}
