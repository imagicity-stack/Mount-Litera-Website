import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mailer';

async function parseRequestBody(request) {
  const contentType = request.headers.get('content-type') || '';

  if (contentType.includes('application/json')) {
    try {
      return await request.json();
    } catch (error) {
      console.error('Failed to parse contact JSON body:', error);
      return {};
    }
  }

  if (
    contentType.includes('application/x-www-form-urlencoded') ||
    contentType.includes('multipart/form-data')
  ) {
    const formData = await request.formData();
    return Object.fromEntries(formData.entries());
  }

  return {};
}

function formatFields(fields) {
  const labels = {
    name: 'Name',
    email: 'Email',
    message: 'Message'
  };

  const entries = Object.entries(fields || {});

  if (entries.length === 0) {
    return 'No form fields provided.';
  }

  return entries
    .map(([key, value]) => `${labels[key] || key}: ${Array.isArray(value) ? value.join(', ') : value}`)
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
    const formData = await parseRequestBody(request);
    const text = formatFields(formData);
    const replyTo = formData?.email ? { replyTo: formData.email } : undefined;

    await sendEmail({
      from: SMTP_USER,
      to: CONTACT_TO,
      subject: 'New Website Contact Enquiry',
      text,
      ...replyTo
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
