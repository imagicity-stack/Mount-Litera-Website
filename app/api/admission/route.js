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
  const { ADMISSION_TO, SMTP_USER } = process.env;

  if (!ADMISSION_TO || !SMTP_USER) {
    return NextResponse.json(
      { error: 'Mail configuration is incomplete.' },
      { status: 500 }
    );
  }

  try {
    const formData = await request.json();
    const { parent_email: parentEmail, ...rest } = formData || {};

    if (!parentEmail) {
      return NextResponse.json(
        { error: 'Parent email is required.' },
        { status: 400 }
      );
    }

    const submissionText = formatFields({ parent_email: parentEmail, ...rest });

    await sendEmail({
      from: SMTP_USER,
      to: ADMISSION_TO,
      subject: 'New Admission Enquiry',
      text: submissionText
    });

    const acknowledgementText = `Dear Parent/Guardian,\n\nThank you for submitting an admission enquiry to The Elden Heights. Our admissions team has received your details and will contact you shortly.\n\nIf you have any urgent questions, please reply to this email.\n\nWarm regards,\nThe Elden Heights Admissions Team`;

    await sendEmail({
      from: SMTP_USER,
      to: parentEmail,
      subject: 'Admission Enquiry Received | The Elden Heights',
      text: acknowledgementText
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admission enquiry email error:', error);
    return NextResponse.json(
      { error: 'Failed to process admission enquiry.' },
      { status: 500 }
    );
  }
}
