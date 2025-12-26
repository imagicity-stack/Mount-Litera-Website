import { NextResponse } from 'next/server';

import { sendMail } from '@/lib/mailer';

export async function POST(request) {
  try {
    const formData = await request.json().catch(() => ({}));

    const entries = Object.entries(formData || {});

    if (entries.length === 0) {
      return NextResponse.json({ error: 'Please provide contact details.' }, { status: 400 });
    }

    const formattedText = entries
      .map(([key, value]) => `${key}: ${value ?? ''}`)
      .join('\n');

    const formattedHtml = `
      <h2>New Website Contact Enquiry</h2>
      <ul>
        ${entries
          .map(
            ([key, value]) =>
              `<li><strong>${key}:</strong> ${String(value ?? '')}
              </li>`
          )
          .join('')}
      </ul>
    `;

    const subject = 'New Website Contact Enquiry';

    await sendMail({
      to: process.env.CONTACT_TO || process.env.SMTP_USER,
      subject,
      text: formattedText,
      html: formattedHtml,
      replyTo: formData?.email
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
