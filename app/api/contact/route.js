import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mailer';

function formatFields(fields) {
  const entries = Object.entries(fields || {});

  if (entries.length === 0) {
    return 'No form fields provided.';
  }

  return entries
    .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
    .join('\n');
}

export async function POST(request) {
  const { CONTACT_TO, SMTP_USER } = process.env;

  if (!CONTACT_TO || !SMTP_USER) {
    return NextResponse.json(
      { error: 'Mail configuration is incomplete.' },
      { status: 500 }
    );
  }

  try {
    const formData = await request.json();
    const text = formatFields(formData);

    await sendEmail({
      from: SMTP_USER,
      to: CONTACT_TO,
      subject: 'New Website Contact Enquiry',
      text
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form email error:', error);
    return NextResponse.json(
      { error: 'Failed to send contact enquiry.' },
      { status: 500 }
    );
  }
}
