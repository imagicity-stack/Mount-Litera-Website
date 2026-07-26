import nodemailer from 'nodemailer';

import { CONTACT_EMAIL } from './contactInfo';

let transporter;

function getTransporter() {
  if (transporter) {
    return transporter;
  }

  const { SMTP_HOST, SMTP_PORT = 587, SMTP_USER, SMTP_PASS } = process.env;

  const missing = ['SMTP_HOST', 'SMTP_USER', 'SMTP_PASS'].filter(
    (key) => !process.env[key]
  );

  if (missing.length > 0) {
    throw new Error(`SMTP configuration is incomplete. Missing: ${missing.join(', ')}`);
  }

  const port = Number(SMTP_PORT) || 587;
  const secure = port === 465;

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure,
    // Force STARTTLS on submission port 587 (Microsoft 365 / Outlook mandates
    // TLS 1.2+ and will not accept an unencrypted AUTH). Ignored when secure=true.
    requireTLS: !secure,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    },
    tls: {
      // Ensure TLS is negotiated on submission ports like 587
      minVersion: 'TLSv1.2'
    }
  });

  return transporter;
}

const DEFAULT_FROM = 'noreply@eldenheights.org';

export async function sendEmail({ to, subject, text, html, replyTo, from }) {
  const transporterInstance = getTransporter();

  if (!to) {
    throw new Error('Recipient address is required.');
  }

  const fromAddress =
    from || process.env.SMTP_FROM || process.env.SMTP_USER || DEFAULT_FROM;

  if (!fromAddress) {
    throw new Error('Sender address is not configured.');
  }

  const mailOptions = {
    from: fromAddress,
    to,
    subject,
    text,
    ...(html ? { html } : {}),
    ...(replyTo ? { replyTo } : {})
  };

  await transporterInstance.sendMail(mailOptions);
}
