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

  transporter = nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  });

  return transporter;
}

export async function sendEmail({ to, subject, text, html, replyTo, from }) {
  const transporterInstance = getTransporter();

  if (!to) {
    throw new Error('Recipient address is required.');
  }

  const fromAddress = from || process.env.SMTP_USER;

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
