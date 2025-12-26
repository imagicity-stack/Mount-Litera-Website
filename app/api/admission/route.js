import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mailer';

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
  const { ADMISSION_TO, SMTP_USER } = process.env;

  if (!ADMISSION_TO || !SMTP_USER) {
    return NextResponse.json(
      { error: 'Mail configuration is incomplete.' },
      { status: 500 }
    );
  }

  try {
    const formData = await request.json();
    const applicantEmail = formData?.email;

    if (!applicantEmail) {
      return NextResponse.json(
        { error: 'Email is required.' },
        { status: 400 }
      );
    }

    const submissionText = formatFields(formData);

    await sendEmail({
      from: SMTP_USER,
      to: ADMISSION_TO,
      subject: 'New Admission Enquiry',
      text: submissionText,
      replyTo: applicantEmail
    });

    const acknowledgementText = `Dear Parent/Guardian,\n\nThank you for submitting an admission enquiry to The Elden Heights. Our admissions team has received your details and will contact you shortly.\n\nIf you have any urgent questions, please reply to this email.\n\nWarm regards,\nThe Elden Heights Admissions Team`;

    await sendEmail({
      from: SMTP_USER,
      to: applicantEmail,
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
