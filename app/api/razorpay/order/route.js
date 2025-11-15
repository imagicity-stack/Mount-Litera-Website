import Razorpay from './razorpay';
import { NextResponse } from 'next/server';

const TOKEN_AMOUNT_IN_PAISE = 50000;

export async function POST(request) {
  try {
    const body = await request.json();
    const amount = Number(body?.amount ?? TOKEN_AMOUNT_IN_PAISE);

    if (!amount || Number.isNaN(amount)) {
      return NextResponse.json({ error: 'Amount is required for order creation.' }, { status: 400 });
    }

    if (!process.env.RAZORPAY_KEY_ID || !process.env.RAZORPAY_KEY_SECRET) {
      return NextResponse.json(
        { error: 'Payment gateway is not configured. Please contact the school team.' },
        { status: 500 }
      );
    }

    const razorpay = new Razorpay({
      key_id: process.env.RAZORPAY_KEY_ID,
      key_secret: process.env.RAZORPAY_KEY_SECRET
    });

    const order = await razorpay.orders.create({
      amount,
      currency: 'INR',
      receipt: 'admission_token'
    });

    if (!order?.id) {
      throw new Error('Invalid response from Razorpay order creation.');
    }

    return NextResponse.json({ orderId: order.id });
  } catch (error) {
    console.error('Error creating Razorpay order:', error);
    return NextResponse.json(
      { error: 'Unable to create payment order. Please try again later.' },
      { status: 500 }
    );
  }
}
