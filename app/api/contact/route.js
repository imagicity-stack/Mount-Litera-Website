import { NextResponse } from 'next/server';

import { sendMail } from '@/lib/mailer';

export async function POST(request) {
  try {
    const formData = await request.json();
    const { name, email, message } = formData || {};

    if (!name || !email || !message) {
      return NextResponse.json(
        { error: 'Please provide your name, email, and message.' },
        { status: 400 }
      );
    }

    const subject = `Website Contact Request - ${name}`;
    const text = [`Name: ${name}`, `Email: ${email}`, 'Message:', message].join('\n');
    const html = `
      <h2>Website Contact Request</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
    `;

    await sendMail({
      subject,
      text,
      html,
      replyTo: email
    });

    return NextResponse.json({
      success: true,
      message: 'Thanks for reaching out! We will reply shortly.'
    });
  } catch (error) {
    console.error('Error submitting contact form:', error);
    const message =
      error?.message === 'SMTP credentials are not configured.'
        ? 'The contact form is temporarily unavailable. Please try again later.'
        : 'Unable to submit the contact form right now. Please try again later.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
