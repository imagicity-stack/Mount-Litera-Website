import { NextResponse } from 'next/server';
import { sendEmail } from '@/lib/mailer';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

const REQUIRED_FIELDS = [
  'parentName',
  'studentName',
  'phoneNumber',
  'classOfStudent',
  'examPercentage',
  'studyHours',
  'tuitionRegularity',
  'classRank',
  'priority'
];

const labels = {
  parentName: 'Parent Name',
  studentName: 'Student Name',
  phoneNumber: 'Phone Number',
  emailAddress: 'Email Address',
  classOfStudent: 'Class of Student',
  currentSchool: 'Current School',
  cityLocation: 'City / Location',
  examPercentage: 'Last Exam Percentage',
  studyHours: 'Study Hours Daily',
  tuitionRegularity: 'Tuition Attendance',
  classRank: 'Class Rank',
  priority: 'Top Priority Right Now'
};

const phonePattern = /^\+?[0-9\s()-]{10,15}$/;

function escapeHtml(value = '') {
  return String(value)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function toDisplayRows(payload) {
  return Object.entries(labels).map(([key, label]) => [label, payload[key] || '—']);
}

function formatTextEmail(payload, submittedAt, pageSource) {
  const lines = toDisplayRows(payload).map(([label, value]) => `${label}: ${value}`);

  return [
    'New Success Meter Submission',
    '',
    ...lines,
    `Submission Timestamp: ${submittedAt}`,
    `Page Source: ${pageSource}`
  ].join('\n');
}

function formatHtmlEmail(payload, submittedAt, pageSource) {
  const rows = toDisplayRows(payload)
    .map(
      ([label, value]) => `
      <tr>
        <td style="padding:10px 12px;border:1px solid #e2e8f0;font-weight:600;color:#1e293b;">${escapeHtml(label)}</td>
        <td style="padding:10px 12px;border:1px solid #e2e8f0;color:#334155;">${escapeHtml(value)}</td>
      </tr>`
    )
    .join('');

  return `
  <div style="font-family:Inter,Arial,sans-serif;background:#f8fafc;padding:24px;">
    <div style="max-width:640px;margin:0 auto;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #e2e8f0;">
      <div style="padding:20px 24px;background:linear-gradient(135deg,#fff7ed,#ffe4e6);">
        <h2 style="margin:0;color:#0f172a;font-size:22px;">New Success Meter Submission</h2>
        <p style="margin:8px 0 0;color:#475569;font-size:14px;">Campaign lead captured from /${escapeHtml(pageSource)}.</p>
      </div>
      <div style="padding:20px 24px;">
        <table style="width:100%;border-collapse:collapse;font-size:14px;">${rows}
          <tr>
            <td style="padding:10px 12px;border:1px solid #e2e8f0;font-weight:600;color:#1e293b;">Submission Timestamp</td>
            <td style="padding:10px 12px;border:1px solid #e2e8f0;color:#334155;">${escapeHtml(submittedAt)}</td>
          </tr>
          <tr>
            <td style="padding:10px 12px;border:1px solid #e2e8f0;font-weight:600;color:#1e293b;">Page Source</td>
            <td style="padding:10px 12px;border:1px solid #e2e8f0;color:#334155;">${escapeHtml(pageSource)}</td>
          </tr>
        </table>
      </div>
    </div>
  </div>`;
}

export async function POST(request) {
  const sender = process.env.SMTP_FROM || 'noreply@eldenheights.org';
  const recipient = process.env.SUCCESS_METER_TO || 'contact@eldenheights.org';

  try {
    const payload = await request.json();

    const missingField = REQUIRED_FIELDS.find((field) => !payload?.[field]?.trim?.());
    if (missingField) {
      return NextResponse.json({ error: `${labels[missingField]} is required.` }, { status: 400 });
    }

    if (!phonePattern.test(payload.phoneNumber.trim())) {
      return NextResponse.json({ error: 'Invalid phone number.' }, { status: 400 });
    }

    const submittedAt = new Date().toISOString();
    const pageSource = ['successmetere', 'successmeterh'].includes(payload.pageSource)
      ? payload.pageSource
      : 'successmetere';
    const text = formatTextEmail(payload, submittedAt, pageSource);
    const html = formatHtmlEmail(payload, submittedAt, pageSource);

    await sendEmail({
      from: sender,
      to: recipient,
      subject: 'New Success Meter Lead Submission',
      text,
      html,
      replyTo: payload.emailAddress || undefined
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Success meter submission error:', {
      message: error?.message,
      code: error?.code,
      responseCode: error?.responseCode,
      response: error?.response,
      command: error?.command
    });
    const body = { error: 'Unable to submit Success Meter form right now.' };
    if (process.env.DEBUG_EMAIL === '1') {
      body.detail = error?.message;
      body.smtpResponse = error?.response;
    }
    return NextResponse.json(body, { status: 500 });
  }
}
