/**
 * Edenwoods Merit Scholarship — receipt and admit card.
 *
 * Sent through the site's existing transport (`lib/mailer.js`, Microsoft Graph
 * with an SMTP fallback) using the sender the rest of the site already uses.
 * No credentials and no transport code are introduced here — only the words
 * and the layout.
 *
 * The admit card is built as an HTML table rather than an attached PDF on
 * purpose: it renders in every mail client, prints cleanly from a phone, and
 * needs no reader app on a device where the parent may have none.
 */

import { sendEmail } from '@/lib/mailer';
import { SITE_URL } from '@/lib/seoData';
import {
  bandFor,
  classLabel,
  contact,
  foundation,
  keyDates,
  scholarship,
  testFormats,
  venue,
  whatToBring
} from '@/lib/scholarship';

const DEEP = '#06423C';
const EDEN = '#0C5A54';
const BRIGHT = '#0D746C';
const INK = '#141414';
const INK_SOFT = '#333333';
const INK_MUTED = '#5C5C5C';
const HAIRLINE = '#D5D5D5';
const GROUND = '#F2F2F2';

const SERIF = "'Playfair Display', 'Libre Baskerville', Georgia, 'Times New Roman', serif";
const SANS = "Inter, 'Helvetica Neue', Helvetica, Arial, sans-serif";

export const siteUrl = () =>
  String(process.env.NEXT_PUBLIC_SITE_URL || SITE_URL || '').replace(/\/$/, '');

/** The inbox the Foundation reads scholarship registrations in. */
export const adminRecipient = () =>
  process.env.SCHOLARSHIP_TO ||
  process.env.ADMISSION_TO ||
  process.env.CONTACT_TO ||
  'admissions@eldenheights.org';

export const senderAddress = () =>
  process.env.MS_SENDER || process.env.SMTP_FROM || 'noreply@eldenheights.org';

const escapeHtml = (value) =>
  String(value ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

const formatDob = (value) => {
  const d = new Date(value);
  if (Number.isNaN(d.getTime())) return value || '';
  return d.toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' });
};

// ------------------------------------------------------------------- Chrome

const shell = ({ eyebrow, heading, body, footerNote }) => `
<!doctype html>
<html lang="en">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:0;background:${GROUND};">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:${GROUND};padding:28px 12px;">
    <tr><td align="center">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:620px;background:#FFFFFF;border:1px solid ${HAIRLINE};">
        <tr>
          <td style="padding:26px 32px 0 32px;border-top:4px solid ${DEEP};">
            <p style="margin:0;font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${EDEN};">
              ${escapeHtml(foundation.name)}
            </p>
            <p style="margin:4px 0 0 0;font-family:${SANS};font-size:11px;letter-spacing:0.04em;color:${INK_MUTED};">
              ${escapeHtml(scholarship.name)}
            </p>
          </td>
        </tr>
        ${
          eyebrow
            ? `<tr><td style="padding:22px 32px 0 32px;"><p style="margin:0;font-family:${SANS};font-size:11px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:${INK_MUTED};">${escapeHtml(
                eyebrow
              )}</p></td></tr>`
            : ''
        }
        <tr>
          <td style="padding:${eyebrow ? '10px' : '22px'} 32px 0 32px;">
            <h1 style="margin:0;font-family:${SERIF};font-size:26px;line-height:1.2;font-weight:500;color:${INK};">${escapeHtml(
              heading
            )}</h1>
          </td>
        </tr>
        <tr><td style="padding:20px 32px 30px 32px;font-family:${SANS};font-size:15px;line-height:1.62;color:${INK_SOFT};">
          ${body}
        </td></tr>
        <tr><td style="padding:0 32px 28px 32px;">
          <div style="border-top:1px solid ${HAIRLINE};padding-top:16px;font-family:${SANS};font-size:12px;line-height:1.6;color:${INK_MUTED};">
            ${footerNote ? `<p style="margin:0 0 10px 0;">${footerNote}</p>` : ''}
            <p style="margin:0;font-weight:700;color:${INK};">${escapeHtml(foundation.name)}</p>
            <p style="margin:2px 0 0 0;">WhatsApp ${escapeHtml(contact.whatsapp)} · ${escapeHtml(
              contact.email
            )}</p>
          </div>
        </td></tr>
      </table>
    </td></tr>
  </table>
</body>
</html>`;

const paragraph = (t) =>
  `<p style="margin:0 0 14px 0;font-family:${SANS};font-size:15px;line-height:1.62;color:${INK_SOFT};">${t}</p>`;

const detailTable = (rows) => `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border-top:1px solid ${HAIRLINE};margin:6px 0 18px 0;">
  ${rows
    .filter(([, v]) => v !== '' && v !== null && v !== undefined)
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

const textRows = (rows) =>
  rows
    .filter(([, v]) => v !== '' && v !== null && v !== undefined)
    .map(([l, v]) => `${l}: ${v}`)
    .join('\n');

// --------------------------------------------------------------- Admit card

/**
 * The admit card block. Given its own heavy border and the registration
 * number at display size, because this is the thing a parent will hold up at
 * the gate on test day.
 */
export const admitCardBlock = (record) => {
  const band = bandFor(record.classApplying);
  const format = testFormats.find((f) => f.band === band);
  const reporting =
    record.reportingTime ||
    (band === 'activity'
      ? 'Your time slot will be confirmed on WhatsApp'
      : 'Reporting time will be confirmed on WhatsApp');

  return `
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="border:3px solid ${DEEP};margin:4px 0 20px 0;">
  <tr><td style="background:${DEEP};padding:14px 20px;">
    <p style="margin:0;font-family:${SANS};font-size:10px;font-weight:700;letter-spacing:0.2em;text-transform:uppercase;color:#FFFFFF;opacity:0.75;">
      ${escapeHtml(foundation.name)}
    </p>
    <p style="margin:4px 0 0 0;font-family:${SERIF};font-size:19px;font-weight:500;color:#FFFFFF;">Admit Card</p>
  </td></tr>
  <tr><td style="padding:20px;">
    <p style="margin:0;font-family:${SANS};font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${INK_MUTED};">
      Registration number
    </p>
    <p style="margin:4px 0 18px 0;font-family:${SANS};font-size:26px;font-weight:700;letter-spacing:0.06em;color:${EDEN};">
      ${escapeHtml(record.registrationNumber)}
    </p>
    ${detailTable([
      ['Child', escapeHtml(record.childName)],
      ['Date of birth', escapeHtml(formatDob(record.dob))],
      ['Class for 2027–28', escapeHtml(classLabel(record.classApplying))],
      ['Parent', escapeHtml(record.parentName)],
      ['Test date', escapeHtml(keyDates.test.label)],
      ['Reporting', escapeHtml(reporting)],
      ['Format', escapeHtml(`${format?.title} · ${format?.duration}`)],
      ...(format?.subjects?.length
        ? [['Subjects', escapeHtml(format.subjects.join(', '))]]
        : []),
      ['Venue', escapeHtml(venue.name) + '<br>' + escapeHtml(venue.address)]
    ])}
    <p style="margin:0 0 6px 0;font-family:${SANS};font-size:10px;font-weight:700;letter-spacing:0.16em;text-transform:uppercase;color:${INK_MUTED};">
      Bring with you
    </p>
    <ul style="margin:0;padding-left:18px;font-family:${SANS};font-size:13px;line-height:1.7;color:${INK_SOFT};">
      ${whatToBring.map((item) => `<li>${escapeHtml(item)}</li>`).join('')}
    </ul>
    ${
      band === 'activity'
        ? `<p style="margin:14px 0 0 0;font-family:${SANS};font-size:13px;line-height:1.6;color:${BRIGHT};font-weight:700;">A parent stays with the child throughout the activity.</p>`
        : ''
    }
  </td></tr>
</table>`;
};

const admitCardText = (record) => {
  const band = bandFor(record.classApplying);
  const format = testFormats.find((f) => f.band === band);
  return [
    'ADMIT CARD',
    textRows([
      ['Registration number', record.registrationNumber],
      ['Child', record.childName],
      ['Date of birth', formatDob(record.dob)],
      ['Class for 2027-28', classLabel(record.classApplying)],
      ['Parent', record.parentName],
      ['Test date', keyDates.test.label],
      ['Reporting', record.reportingTime || 'Confirmed on WhatsApp'],
      ['Format', `${format?.title} - ${format?.duration}`],
      ...(format?.subjects?.length ? [['Subjects', format.subjects.join(', ')]] : []),
      ['Venue', `${venue.name}, ${venue.address}`]
    ]),
    '',
    'Bring with you:',
    whatToBring.map((i) => `- ${i}`).join('\n')
  ].join('\n');
};

// ---------------------------------------------------------------- Templates

/** To the parent, the moment the ₹199 is taken. Receipt plus admit card. */
export const parentReceiptEmail = (record, token) => {
  const admitUrl = `${siteUrl()}${scholarshipAdmitPath(record, token)}`;

  const html = shell({
    eyebrow: 'Registration confirmed',
    heading: `${record.childName} is registered.`,
    body: `
      ${paragraph(`Dear ${escapeHtml(record.parentName)},`)}
      ${paragraph(
        `Thank you. We have received ₹${record.amount} and your child's place in the ${escapeHtml(
          scholarship.name
        )} test is confirmed. Your admit card is below — keep this email, or <a href="${escapeHtml(
          admitUrl
        )}" style="color:${EDEN};font-weight:700;">open and print it here</a>.`
      )}
      ${admitCardBlock(record)}
      ${detailTable([
        ['Receipt for', `₹${record.amount} registration fee`],
        ['Payment status', 'Paid'],
        ['Transaction', escapeHtml(record.paymentReference || '—')],
        ['Paid to', `${escapeHtml(foundation.name)}`]
      ])}
      ${paragraph(
        `<strong>What happens next.</strong> Results are announced on ${escapeHtml(
          keyDates.results.label
        )} on WhatsApp, and can be checked with your registration number. To claim a scholarship you then submit the TEHS admission form by ${escapeHtml(
          keyDates.claimDeadline.label
        )}; that form costs ₹500 and is paid to the school.`
      )}
      ${paragraph(
        `The ₹199 registration fee is non-refundable. Full terms are at <a href="${escapeHtml(
          `${siteUrl()}/admission/scholarships/edenwoods-merit-2027/terms`
        )}" style="color:${EDEN};">eldenheights.org</a>.`
      )}
    `,
    footerNote:
      'Collected by The Elden Heights School’s payment gateway on behalf of Edenwoods Eduhub Foundation.'
  });

  const text = [
    `Dear ${record.parentName},`,
    '',
    `Thank you. We have received Rs ${record.amount} and ${record.childName}'s place in the ${scholarship.name} test is confirmed.`,
    '',
    admitCardText(record),
    '',
    textRows([
      ['Receipt for', `Rs ${record.amount} registration fee`],
      ['Payment status', 'Paid'],
      ['Transaction', record.paymentReference || '-'],
      ['Paid to', foundation.name]
    ]),
    '',
    `Results: ${keyDates.results.label} on WhatsApp.`,
    `To claim a scholarship, submit the TEHS admission form by ${keyDates.claimDeadline.label} (Rs 500, paid to the school).`,
    'The Rs 199 registration fee is non-refundable.',
    '',
    `Print your admit card: ${admitUrl}`,
    '',
    foundation.name,
    `WhatsApp ${contact.whatsapp} · ${contact.email}`
  ].join('\n');

  return {
    subject: `Registered: ${record.childName} · ${record.registrationNumber} · Edenwoods Merit Scholarship 2027`,
    text,
    html
  };
};

/** To the Foundation. One line per thing somebody will need on test day. */
export const adminRegistrationEmail = (record) => {
  const link = `${siteUrl()}/admin?tab=scholarship&registration=${encodeURIComponent(
    record.registrationNumber
  )}`;

  const rows = [
    ['Registration', escapeHtml(record.registrationNumber)],
    ['Child', escapeHtml(record.childName)],
    ['Date of birth', escapeHtml(formatDob(record.dob))],
    ['Class 2027–28', escapeHtml(classLabel(record.classApplying))],
    ['Current school', escapeHtml(record.currentSchool)],
    ['Parent', escapeHtml(record.parentName)],
    ['WhatsApp', escapeHtml(record.whatsapp)],
    ['Alternate', escapeHtml(record.altPhone)],
    ['Email', escapeHtml(record.email)],
    [
      'Locality',
      escapeHtml(record.locality === 'Other' ? record.localityOther || 'Other' : record.locality)
    ],
    ['Heard via', escapeHtml(record.hearAbout)],
    ['Paid', `₹${record.amount} · ${escapeHtml(record.paymentReference || '—')}`],
    ['Campaign', escapeHtml([record.source, record.campaign, record.adCreative].filter(Boolean).join(' · ') || 'Direct')]
  ];

  return {
    subject: `New scholarship registration · ${record.childName} · ${classLabel(
      record.classApplying
    )} · ${record.registrationNumber}`,
    html: shell({
      eyebrow: 'New registration',
      heading: `${record.childName} — ${classLabel(record.classApplying)}`,
      body: `
        ${paragraph('A ₹199 registration has been paid for and confirmed.')}
        ${detailTable(rows)}
        <table role="presentation" cellpadding="0" cellspacing="0" style="margin:6px 0 4px 0;">
          <tr><td style="background:${EDEN};">
            <a href="${escapeHtml(link)}" style="display:inline-block;padding:13px 26px;font-family:${SANS};font-size:12px;font-weight:700;letter-spacing:0.14em;text-transform:uppercase;color:#FFFFFF;text-decoration:none;">View registration</a>
          </td></tr>
        </table>
      `,
      footerNote: 'This message contains information about a parent and a child. Handle it accordingly.'
    }),
    text: [
      'A Rs 199 registration has been paid for and confirmed.',
      '',
      textRows(rows.map(([l, v]) => [l, String(v).replace(/<[^>]*>/g, ' ')])),
      '',
      `View: ${link}`
    ].join('\n')
  };
};

/** Re-sending the admit card, from the portal. */
export const admitCardEmail = (record) => ({
  subject: `Admit card · ${record.childName} · ${record.registrationNumber}`,
  html: shell({
    eyebrow: 'Admit card',
    heading: 'Your admit card for 5 November',
    body: `
      ${paragraph(`Dear ${escapeHtml(record.parentName)},`)}
      ${paragraph('Here is your admit card. Print it, or show it on your phone at the gate.')}
      ${admitCardBlock(record)}
    `
  }),
  text: [
    `Dear ${record.parentName},`,
    '',
    'Here is your admit card. Print it, or show it on your phone at the gate.',
    '',
    admitCardText(record),
    '',
    foundation.name
  ].join('\n')
});

/**
 * The printable page a receipt links to.
 *
 * Carries the registration's token, not just its number. The public merit list
 * shows registration numbers, so a number-only link would let anyone reading
 * that list pull up a child's name and date of birth.
 */
export const scholarshipAdmitPath = (record, token) =>
  `/admission/scholarships/edenwoods-merit-2027/admit-card?r=${encodeURIComponent(
    record.registrationNumber
  )}&t=${encodeURIComponent(token || '')}`;

// ------------------------------------------------------------------ Dispatch

/**
 * Send one template. Never throws: a registration that is paid for and stored
 * must not be reported as failed because a mailbox was briefly unreachable.
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
    console.error('Scholarship email failed:', {
      to,
      subject: template?.subject,
      message: error?.message,
      responseCode: error?.responseCode
    });
    return false;
  }
};
