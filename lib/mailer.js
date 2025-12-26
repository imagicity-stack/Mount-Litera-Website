import nodemailer from 'nodemailer';

import { CONTACT_EMAIL } from './contactInfo';

let transporter;

function getTransporter() {
  if (transporter) {
    return transporter;
  }

  const { SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_USER || !SMTP_PASS) {
    throw new Error('SMTP credentials are not configured.');
  }

  transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  });

  return transporter;
}

export async function sendMail({ subject, text, html, replyTo }) {
  const transporterInstance = getTransporter();

  const mailOptions = {
    from: `The Elden Heights School Website <${process.env.SMTP_USER}>`,
    to: CONTACT_EMAIL,
    subject,
    text,
    ...(html ? { html } : {}),
    ...(replyTo ? { replyTo } : {})
  };

  await transporterInstance.sendMail(mailOptions);
}
