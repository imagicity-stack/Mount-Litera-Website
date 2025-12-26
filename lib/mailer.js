import nodemailer from 'nodemailer';

import { CONTACT_EMAIL } from './contactInfo';

let transporter;

function getTransporter() {
  if (transporter) {
    return transporter;
  }

  const { SMTP_HOST, SMTP_PORT = 587, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error('SMTP configuration is incomplete.');
  }

  const port = Number(SMTP_PORT) || 587;
  const secure = port === 465;

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port,
    secure,
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
