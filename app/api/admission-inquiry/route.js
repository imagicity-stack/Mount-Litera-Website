import { NextResponse } from 'next/server';

import { sendMail } from '@/lib/mailer';

const requiredFields = [
  'studentName',
  'parentName',
  'contactNumber',
  'email',
  'classInterested',
  'address'
];

export async function POST(request) {
  try {
    const formData = await request.json();

    const missingFields = requiredFields.filter((field) => !formData?.[field]);

    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: `Please complete all required fields: ${missingFields.join(', ')}`
        },
        { status: 400 }
      );
    }

    const subject = `New Admission Inquiry - ${formData.studentName}`;
    const text = [
      `Student Name: ${formData.studentName}`,
      `Parent/Guardian: ${formData.parentName}`,
      `Contact Number: ${formData.contactNumber}`,
      `Email Address: ${formData.email}`,
      `Current School: ${formData.currentSchool || 'Not provided'}`,
      `Class Interested: ${formData.classInterested}`,
      `Address: ${formData.address}`,
      `Message: ${formData.message || 'Not provided'}`
    ].join('\n');

    const html = `
      <h2>New Admission Inquiry</h2>
      <p><strong>Student Name:</strong> ${formData.studentName}</p>
      <p><strong>Parent/Guardian:</strong> ${formData.parentName}</p>
      <p><strong>Contact Number:</strong> ${formData.contactNumber}</p>
      <p><strong>Email Address:</strong> ${formData.email}</p>
      <p><strong>Current School:</strong> ${formData.currentSchool || 'Not provided'}</p>
      <p><strong>Class Interested:</strong> ${formData.classInterested}</p>
      <p><strong>Address:</strong> ${formData.address}</p>
      <p><strong>Message:</strong> ${formData.message || 'Not provided'}</p>
    `;

    await sendMail({
      subject,
      text,
      html,
      replyTo: formData.email
    });

    return NextResponse.json({
      success: true,
      message: 'Thank you! Our admissions counselor will contact you shortly.'
    });
  } catch (error) {
    console.error('Error submitting admission inquiry:', error);
    const message =
      error?.message === 'SMTP credentials are not configured.'
        ? 'The inquiry service is temporarily unavailable. Please try again later.'
        : 'Unable to submit the inquiry right now. Please try again later.';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
