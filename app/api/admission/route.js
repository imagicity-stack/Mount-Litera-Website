import { NextResponse } from 'next/server';

import { sendMail } from '@/lib/mailer';

function formatFields(formData) {
  const entries = Object.entries(formData || {});
  const text = entries.map(([key, value]) => `${key}: ${value ?? ''}`).join('\n');
  const html = `
    <h2>New Admission Enquiry</h2>
    <ul>
      ${entries
        .map(
          ([key, value]) =>
            `<li><strong>${key}:</strong> ${String(value ?? '')}</li>`
        )
        .join('')}
    </ul>
  `;

  return { entries, text, html };
}

export async function POST(request) {
  try {
    const formData = await request.json().catch(() => ({}));

    const { entries, text, html } = formatFields(formData);

    if (entries.length === 0) {
      return NextResponse.json({ error: 'Please provide admission details.' }, { status: 400 });
    }

    const parentEmail = formData.parent_email || formData.parentEmail || formData.email;

    if (!parentEmail) {
      return NextResponse.json(
        { error: 'A parent_email value is required for acknowledgement.' },
        { status: 400 }
      );
    }

    const admissionRecipient = process.env.ADMISSION_TO || process.env.CONTACT_TO || process.env.SMTP_USER;

    await sendMail({
      to: admissionRecipient,
      subject: 'New Admission Enquiry',
      text,
      html,
      replyTo: parentEmail
    });

    const acknowledgementText = `Dear ${formData.parentName || 'Parent'},\n\n` +
      'Thank you for submitting your admission enquiry to The Elden Heights. ' +
      'Our admissions counselor will review your information and reach out shortly.\n\n' +
      'Warm regards,\n' +
      'The Elden Heights School';

    const acknowledgementHtml = `
      <p>Dear ${formData.parentName || 'Parent'},</p>
      <p>Thank you for submitting your admission enquiry to <strong>The Elden Heights</strong>. Our admissions counselor will review your information and reach out shortly.</p>
      <p>Warm regards,<br/>The Elden Heights School</p>
    `;

    await sendMail({
      to: parentEmail,
      subject: 'Admission Enquiry Received | The Elden Heights',
      text: acknowledgementText,
      html: acknowledgementHtml
    });

    return NextResponse.json({ success: true, message: 'Enquiry received successfully.' });
  } catch (error) {
    console.error('Error submitting admission enquiry:', error);
    const message =
      error?.message === 'SMTP credentials are not configured.'
        ? 'The admission service is temporarily unavailable. Please try again later.'
        : 'Unable to submit the admission enquiry right now. Please try again later.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
