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
      console.error('Failed to parse admission JSON body:', error);
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
    studentName: 'Student’s Full Name',
    parentName: 'Parent/Guardian Name',
    contactNumber: 'Contact Number',
    email: 'Parent Email',
    classInterested: 'Class Interested In',
    currentSchool: 'Current School',
    address: 'Residential Address',
    message: 'Message / Additional Details'
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
  const { ADMISSION_TO, SMTP_FROM } = process.env;
  const recipient = ADMISSION_TO || 'admission@eldenheights.org';
  const sender = SMTP_FROM || 'noreply@eldenheights.org';

  try {
    const formData = await parseRequestBody(request);
    const applicantEmail = formData?.email;

    if (!applicantEmail) {
      return NextResponse.json(
        { error: 'Email is required.' },
        { status: 400 }
      );
    }

    const submissionText = formatFields(formData);

    await sendEmail({
      from: sender,
      to: recipient,
      subject: 'New Admission Enquiry',
      text: submissionText,
      replyTo: applicantEmail
    });

    const acknowledgementText = `Dear Parent/Guardian,\n\nThank you for submitting an admission enquiry to The Elden Heights. Our admissions team has received your details and will contact you shortly.\n\nIf you have any urgent questions, please reply to this email.\n\nWarm regards,\nThe Elden Heights Admissions Team`;

    await sendEmail({
      from: sender,
      to: applicantEmail,
      subject: 'Admission Enquiry Received | The Elden Heights',
      text: acknowledgementText
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Admission enquiry email error:', {
      message: error?.message,
      code: error?.code,
      responseCode: error?.responseCode,
      response: error?.response,
      command: error?.command
    });
    const body = { error: 'Failed to process admission enquiry.' };
    if (process.env.DEBUG_EMAIL === '1') {
      body.detail = error?.message;
      body.smtpResponse = error?.response;
    }
    return NextResponse.json(body, { status: 500 });
  }
}
