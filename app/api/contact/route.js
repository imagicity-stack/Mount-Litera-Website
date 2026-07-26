import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

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
  const { CONTACT_TO, MS_SENDER, SMTP_FROM } = process.env;
  const recipient = CONTACT_TO || 'contact@eldenheights.org';
  const sender = MS_SENDER || SMTP_FROM || 'noreply@eldenheights.org';

  try {
    const formData = await parseRequestBody(request);
    const text = formatFields(formData);
    const replyTo = formData?.email ? { replyTo: formData.email } : undefined;

    await sendEmail({
      from: sender,
      to: recipient,
      subject: 'New Website Contact Enquiry',
      text,
      ...replyTo
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Contact form email error:', {
      message: error?.message,
      code: error?.code,
      responseCode: error?.responseCode,
      response: error?.response,
      command: error?.command
    });
    const body = { error: 'Failed to send contact enquiry.' };
    if (process.env.DEBUG_EMAIL === '1') {
      body.detail = error?.message;
      body.smtpResponse = error?.response;
    }
    return NextResponse.json(body, { status: 500 });
  }
}
