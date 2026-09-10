import crypto from 'node:crypto';
import { cleanKey } from '@/lib/razorpayClient';
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

    // Trimmed: a secret pasted into the hosting dashboard with a trailing
    // newline signs a different HMAC than Razorpay used, so a genuine payment
    // would be rejected here as an invalid signature.
    const secret = cleanKey(process.env.RAZORPAY_KEY_SECRET);

    if (!secret) {
      return NextResponse.json(
        { error: 'Payment gateway is not configured. Please contact the school team.' },
        { status: 500 }
      );
    }

    const expectedSignature = crypto
      .createHmac('sha256', secret)
      .update(`${orderId}|${paymentId}`)
      .digest('hex');

    if (expectedSignature !== String(signature).trim()) {
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
