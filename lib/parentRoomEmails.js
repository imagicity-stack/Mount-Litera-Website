/**
 * The Parent Room — email templates and dispatch.
 *
 * Sent through the site's existing transport (`lib/mailer.js`, Microsoft Graph
 * with an SMTP fallback) using the sender and recipient the rest of the site
 * already uses. No credentials, no addresses and no transport code are
 * introduced here — only the words and the layout.
 *
 * Every template returns `{ subject, text, html }`. The text part is not a
 * courtesy: these go to parents on phones, through filters, and a mail that
 * arrives as an empty frame is worse than a plain one.
 */

import { sendEmail } from '@/lib/mailer';
import { SITE_URL } from '@/lib/seoData';
import {
  communicationLabel,
  concernLabel,
  languageLabel,
  schoolChangeLabel
} from '@/lib/parentRoom';
import { formatAppointment, formatDateKey, formatMinutes } from '@/lib/parentRoomTime';

const CRIMSON = '#A51C30';
const INK = '#141414';
const INK_SOFT = '#333333';
const INK_MUTED = '#5C5C5C';
const HAIRLINE = '#D5D5D5';
const GROUND = '#F2F2F2';

const SERIF = "'Playfair Display', 'Libre Baskerville', Georgia, 'Times New Roman', serif";
const SANS = "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif";

export const siteUrl = () =>
  String(process.env.NEXT_PUBLIC_SITE_URL || SITE_URL || '').replace(/\/$/, '');

/** The inbox the school reads Parent Room bookings in. */
export const adminRecipient = () =>
  process.env.PARENT_ROOM_TO ||
  process.env.ADMISSION_TO ||
  process.env.CONTACT_TO ||
  'contact@eldenheights.org';

export const senderAddress = () =>
  process.env.MS_SENDER || process.env.SMTP_FROM || 'noreply@eldenheights.org';

const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

// ------------------------------------------------------------------- Chrome

/**
 * The shared frame. Table-based and inline-styled on purpose — email clients
 * are twenty years behind the browser, and a flexbox layout would collapse in
 * Outlook.
 */
const shell = ({ eyebrow, heading, body, footerNote }) => `
<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${GROUND};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${GROUND};padding:28px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:600px;background:#FFFFFF;border:1px solid ${HAIRLINE};">
        <tr>
          <td style="padding:28px 32px 0 32px;border-top:3px solid ${CRIMSON};">
            <p style="margin:0;font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${CRIMSON};">
              The Parent Room
            </p>
            <p style="margin:4px 0 0 0;font-family:${SANS};font-size:11px;letter-spacing:0.04em;color:${INK_MUTED};">
              An initiative by The Elden Heights School
            </p>
          </td>
        </tr>
        ${
          eyebrow
            ? `<tr><td style="padding:24px 32px 0 32px;"><p style="margin:0;font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${INK_MUTED};">${escapeHtml(
                eyebrow
              )}</p></td></tr>`
            : ''
        }
        <tr>
          <td style="padding:${eyebrow ? '10px' : '24px'} 32px 0 32px;">
            <h1 style="margin:0;font-family:${SERIF};font-size:27px;line-height:1.18;font-weight:500;color:${INK};">
              ${escapeHtml(heading)}
            </h1>
          </td>
        </tr>
        <tr><td style="padding:22px 32px 32px 32px;font-family:${SANS};font-size:15px;line-height:1.62;color:${INK_SOFT};">
          ${body}
        </td></tr>
        <tr><td style="padding:0 32px 30px 32px;">
          <div style="border-top:1px solid ${HAIRLINE};padding-top:16px;font-family:${SANS};font-size:12px;line-height:1.6;color:${INK_MUTED};">
            ${footerNote ? `<p style="margin:0 0 10px 0;">${footerNote}</p>` : ''}
            <p style="margin:0;font-weight:700;color:${INK};">The Parent Room</p>
            <p style="margin:2px 0 0 0;">An initiative by The Elden Heights School</p>
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

const paragraph = (text) =>
  `<p style="margin:0 0 14px 0;font-family:${SANS};font-size:15px;line-height:1.62;color:${INK_SOFT};">${text}</p>`;

/** A label/value block — the appointment details, the parent's answers. */
const detailTable = (rows) => `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${HAIRLINE};margin:6px 0 18px 0;">
  ${rows
    .filter(([, value]) => value !== '' && value !== null && value !== undefined)
    .map(
      ([label, value]) => `
  <tr>
    <td style="padding:10px 12px 10px 0;border-bottom:1px solid ${HAIRLINE};font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:0.1em;text-transform:uppercase;color:${INK_MUTED};vertical-align:top;white-space:nowrap;">${escapeHtml(
        label
      )}</td>
    <td style="padding:10px 0;border-bottom:1px solid ${HAIRLINE};font-family:${SANS};font-size:14px;line-height:1.5;color:${INK};">${value}</td>
  </tr>`
    )
    .join('')}
</table>`;

const button = (href, label) => `
<table role="presentation" cellpadding="0" cellspacing="0" style="margin:6px 0 4px 0;">
  <tr><td style="background:${CRIMSON};">
    <a href="${escapeHtml(href)}" style="display:inline-block;padding:13px 26px;font-family:${SANS};font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#FFFFFF;text-decoration:none;">${escapeHtml(
      label
    )}</a>
  </td></tr>
</table>`;

const textRows = (rows) =>
  rows
    .filter(([, value]) => value !== '' && value !== null && value !== undefined)
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n');

// ------------------------------------------------------------------- Helpers

const appointmentLine = (booking, settings) =>
  booking.dateKey && booking.startMinutes !== null && booking.startMinutes !== undefined
    ? formatAppointment(booking.dateKey, booking.startMinutes, settings.sessionDuration)
    : 'To be confirmed';

const meetingBlock = (booking, settings) =>
  booking.meetingLink
    ? `<a href="${escapeHtml(booking.meetingLink)}" style="color:${CRIMSON};">${escapeHtml(
        booking.meetingLink
      )}</a>`
    : escapeHtml(settings.defaultMeetingNote);

const feeLine = (booking) =>
  booking.paymentStatus === 'paid'
    ? `₹${booking.amount} · Paid`
    : booking.paymentStatus === 'waived'
      ? 'Waived'
      : `₹${booking.amount} · Payment pending`;

// ----------------------------------------------------------------- Templates

/** To the school. Everything the counsellor needs before the call. */
export const adminBookingEmail = (booking, settings) => {
  const when = appointmentLine(booking, settings);
  const link = `${siteUrl()}/admin?tab=parent-room&booking=${encodeURIComponent(booking.bookingId)}`;

  const sessionRows = [
    ['Booking ID', escapeHtml(booking.bookingId)],
    ['Appointment', escapeHtml(when)],
    ['Payment', escapeHtml(feeLine(booking))],
    ['Language', escapeHtml(languageLabel(booking.preferredLanguage))]
  ];

  const parentRows = [
    ['Parent', escapeHtml(booking.parentName)],
    ['Mobile', escapeHtml(booking.mobile)],
    ['WhatsApp', escapeHtml(booking.whatsapp)],
    ['Email', escapeHtml(booking.email)],
    ['Prefers', escapeHtml(communicationLabel(booking.preferredCommunication))]
  ];

  const childRows = [
    ['Child', escapeHtml(booking.childFirstName)],
    ['Age', escapeHtml(booking.childAge)],
    ['Class', escapeHtml(booking.currentClass)],
    ['Current school', escapeHtml(booking.currentSchool)]
  ];

  const concernRows = [
    ['Primary concern', escapeHtml(concernLabel(booking.primaryConcern))],
    ['In their words', escapeHtml(booking.concernDetails).replace(/\n/g, '<br>')],
    ['Hopes to get', escapeHtml(booking.sessionExpectation).replace(/\n/g, '<br>')],
    ['School change', escapeHtml(schoolChangeLabel(booking.schoolChangeIntent))]
  ];

  const campaignRows = [
    ['Channel', escapeHtml(booking.channel)],
    ['Source', escapeHtml(booking.source)],
    ['Medium', escapeHtml(booking.medium)],
    ['Campaign', escapeHtml(booking.campaign)],
    ['Creative', escapeHtml(booking.adCreative)]
  ];

  const section = (title) =>
    `<p style="margin:20px 0 0 0;font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${CRIMSON};">${title}</p>`;

  const html = shell({
    eyebrow: 'New booking',
    heading: `${booking.parentName} — ${when}`,
    body: `
      ${paragraph('New Parent Room booking received.')}
      ${detailTable(sessionRows)}
      ${section('Parent')}${detailTable(parentRows)}
      ${section('Child')}${detailTable(childRows)}
      ${section('Concern')}${detailTable(concernRows)}
      ${section('Campaign')}${detailTable(campaignRows)}
      ${button(link, 'View booking')}
    `,
    footerNote:
      'This message contains information about a parent and a minor. Please handle it accordingly.'
  });

  const text = [
    'New Parent Room booking received.',
    '',
    textRows([
      ['Booking ID', booking.bookingId],
      ['Appointment', when],
      ['Payment', feeLine(booking)],
      ['Language', languageLabel(booking.preferredLanguage)]
    ]),
    '',
    'PARENT',
    textRows([
      ['Name', booking.parentName],
      ['Mobile', booking.mobile],
      ['WhatsApp', booking.whatsapp],
      ['Email', booking.email],
      ['Prefers', communicationLabel(booking.preferredCommunication)]
    ]),
    '',
    'CHILD',
    textRows([
      ['First name', booking.childFirstName],
      ['Age', booking.childAge],
      ['Class', booking.currentClass],
      ['Current school', booking.currentSchool]
    ]),
    '',
    'CONCERN',
    textRows([
      ['Primary concern', concernLabel(booking.primaryConcern)],
      ['In their words', booking.concernDetails],
      ['Hopes to get', booking.sessionExpectation],
      ['School change', schoolChangeLabel(booking.schoolChangeIntent)]
    ]),
    '',
    'CAMPAIGN',
    textRows([
      ['Channel', booking.channel],
      ['Source', booking.source],
      ['Medium', booking.medium],
      ['Campaign', booking.campaign],
      ['Creative', booking.adCreative]
    ]),
    '',
    `View booking: ${link}`
  ].join('\n');

  return {
    subject: `New Parent Room Booking | ${booking.parentName} | ${when}`,
    text,
    html
  };
};

/** To the parent. Short, warm, and complete enough to act on. */
export const parentConfirmationEmail = (booking, settings) => {
  const rows = [
    ['Date', escapeHtml(formatDateKey(booking.dateKey))],
    [
      'Time',
      escapeHtml(
        `${formatMinutes(booking.startMinutes)} – ${formatMinutes(
          booking.startMinutes + settings.sessionDuration
        )} IST`
      )
    ],
    ['Duration', `${settings.sessionDuration} minutes`],
    ['With', escapeHtml(settings.counsellorName)],
    ['Mode', 'Online'],
    ['Booking ID', `<strong>${escapeHtml(booking.bookingId)}</strong>`],
    ['Joining', meetingBlock(booking, settings)]
  ];

  const html = shell({
    eyebrow: 'Confirmed',
    heading: 'Your Parent Room session is confirmed.',
    body: `
      ${paragraph(`Hi ${escapeHtml(booking.parentName)},`)}
      ${paragraph('Your private Parent Room session has been confirmed.')}
      ${detailTable(rows)}
      ${paragraph(
        'There is nothing special you need to prepare. Just come with the question that has been on your mind.'
      )}
      ${
        booking.paymentStatus === 'pending'
          ? paragraph(
              `<strong>Fee:</strong> ₹${booking.amount}. The school will contact you with the payment details before your session.`
            )
          : ''
      }
    `,
    footerNote: `If you need to change this session, reply to this email quoting ${escapeHtml(
      booking.bookingId
    )}.`
  });

  const text = [
    `Hi ${booking.parentName},`,
    '',
    'Your private Parent Room session has been confirmed.',
    '',
    textRows([
      ['Date', formatDateKey(booking.dateKey)],
      [
        'Time',
        `${formatMinutes(booking.startMinutes)} – ${formatMinutes(
          booking.startMinutes + settings.sessionDuration
        )} IST`
      ],
      ['Duration', `${settings.sessionDuration} minutes`],
      ['With', settings.counsellorName],
      ['Mode', 'Online'],
      ['Booking ID', booking.bookingId],
      ['Joining', booking.meetingLink || settings.defaultMeetingNote]
    ]),
    '',
    'There is nothing special you need to prepare. Just come with the question that has been on your mind.',
    booking.paymentStatus === 'pending'
      ? `\nFee: ₹${booking.amount}. The school will contact you with the payment details before your session.`
      : '',
    '',
    'The Parent Room',
    'An initiative by The Elden Heights School'
  ].join('\n');

  return { subject: 'Your Parent Room Session is Confirmed', text, html };
};

export const parentRescheduledEmail = (booking, settings) => {
  const rows = [
    ['New date', escapeHtml(formatDateKey(booking.dateKey))],
    [
      'New time',
      escapeHtml(
        `${formatMinutes(booking.startMinutes)} – ${formatMinutes(
          booking.startMinutes + settings.sessionDuration
        )} IST`
      )
    ],
    ['With', escapeHtml(settings.counsellorName)],
    ['Booking ID', `<strong>${escapeHtml(booking.bookingId)}</strong>`],
    ['Joining', meetingBlock(booking, settings)]
  ];

  return {
    subject: 'Your Parent Room Session Has Been Rescheduled',
    html: shell({
      eyebrow: 'Rescheduled',
      heading: 'Your session has moved.',
      body: `
        ${paragraph(`Hi ${escapeHtml(booking.parentName)},`)}
        ${paragraph(
          'Your Parent Room session has been rescheduled. The new details are below — everything else stays the same.'
        )}
        ${detailTable(rows)}
        ${paragraph('If this time does not suit you, reply to this email and we will find another.')}
      `
    }),
    text: [
      `Hi ${booking.parentName},`,
      '',
      'Your Parent Room session has been rescheduled.',
      '',
      textRows([
        ['New date', formatDateKey(booking.dateKey)],
        [
          'New time',
          `${formatMinutes(booking.startMinutes)} – ${formatMinutes(
            booking.startMinutes + settings.sessionDuration
          )} IST`
        ],
        ['With', settings.counsellorName],
        ['Booking ID', booking.bookingId],
        ['Joining', booking.meetingLink || settings.defaultMeetingNote]
      ]),
      '',
      'If this time does not suit you, reply to this email and we will find another.',
      '',
      'The Parent Room',
      'An initiative by The Elden Heights School'
    ].join('\n')
  };
};

export const parentCancelledEmail = (booking, settings, reason = '') => ({
  subject: 'Your Parent Room Session Has Been Cancelled',
  html: shell({
    eyebrow: 'Cancelled',
    heading: 'Your session has been cancelled.',
    body: `
      ${paragraph(`Hi ${escapeHtml(booking.parentName)},`)}
      ${paragraph(
        `Your Parent Room session on ${escapeHtml(
          appointmentLine(booking, settings)
        )} has been cancelled.`
      )}
      ${reason ? paragraph(escapeHtml(reason)) : ''}
      ${paragraph(
        'If you would still like to speak with us, reply to this email and we will arrange another time.'
      )}
    `,
    footerNote: `Booking reference: ${escapeHtml(booking.bookingId)}.`
  }),
  text: [
    `Hi ${booking.parentName},`,
    '',
    `Your Parent Room session on ${appointmentLine(booking, settings)} has been cancelled.`,
    reason ? `\n${reason}` : '',
    '',
    'If you would still like to speak with us, reply to this email and we will arrange another time.',
    '',
    `Booking reference: ${booking.bookingId}`,
    '',
    'The Parent Room',
    'An initiative by The Elden Heights School'
  ].join('\n')
});

export const parentMeetingLinkEmail = (booking, settings) => ({
  subject: 'Your Parent Room Meeting Link',
  html: shell({
    eyebrow: 'Joining details',
    heading: 'Here is the link for your session.',
    body: `
      ${paragraph(`Hi ${escapeHtml(booking.parentName)},`)}
      ${detailTable([
        ['When', escapeHtml(appointmentLine(booking, settings))],
        ['With', escapeHtml(settings.counsellorName)],
        ['Join', meetingBlock(booking, settings)],
        ['Booking ID', escapeHtml(booking.bookingId)]
      ])}
      ${paragraph('You can join a couple of minutes early — we will be there.')}
    `
  }),
  text: [
    `Hi ${booking.parentName},`,
    '',
    textRows([
      ['When', appointmentLine(booking, settings)],
      ['With', settings.counsellorName],
      ['Join', booking.meetingLink || settings.defaultMeetingNote],
      ['Booking ID', booking.bookingId]
    ]),
    '',
    'You can join a couple of minutes early — we will be there.',
    '',
    'The Parent Room',
    'An initiative by The Elden Heights School'
  ].join('\n')
});

export const parentReminderEmail = (booking, settings, window = '24h') => {
  const soon = window === '1h';
  return {
    subject: soon
      ? 'Your Parent Room session starts shortly'
      : 'Your Parent Room session is tomorrow',
    html: shell({
      eyebrow: 'Reminder',
      heading: soon ? 'Your session starts shortly.' : 'Your session is tomorrow.',
      body: `
        ${paragraph(`Hi ${escapeHtml(booking.parentName)},`)}
        ${detailTable([
          ['When', escapeHtml(appointmentLine(booking, settings))],
          ['With', escapeHtml(settings.counsellorName)],
          ['Join', meetingBlock(booking, settings)],
          ['Booking ID', escapeHtml(booking.bookingId)]
        ])}
        ${paragraph('Nothing to prepare — just the question that has been on your mind.')}
      `
    }),
    text: [
      `Hi ${booking.parentName},`,
      '',
      soon ? 'Your Parent Room session starts shortly.' : 'Your Parent Room session is tomorrow.',
      '',
      textRows([
        ['When', appointmentLine(booking, settings)],
        ['With', settings.counsellorName],
        ['Join', booking.meetingLink || settings.defaultMeetingNote],
        ['Booking ID', booking.bookingId]
      ]),
      '',
      'The Parent Room',
      'An initiative by The Elden Heights School'
    ].join('\n')
  };
};

// ------------------------------------------------------------------ Dispatch

/**
 * Send one template. Never throws: a booking that is paid for and stored must
 * not be reported as failed because a mailbox was briefly unreachable. The
 * caller gets `false` and the portal keeps a resend button for exactly this.
 */
export const dispatch = async ({ to, template, replyTo }) => {
  try {
    await sendEmail({
      from: senderAddress(),
      to,
      subject: template.subject,
      text: template.text,
      html: template.html,
      ...(replyTo ? { replyTo } : {})
    });
    return true;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.error('Parent Room email failed:', {
      to,
      subject: template?.subject,
      message: error?.message,
      responseCode: error?.responseCode
    });
    return false;
  }
};
