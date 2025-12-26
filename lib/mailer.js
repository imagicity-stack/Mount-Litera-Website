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

  const fromAddress = process.env.SMTP_FROM || CONTACT_EMAIL;

  const mailOptions = {
    from: `Elden Heights School <${fromAddress}>`,
    to: CONTACT_EMAIL,
    subject,
    text,
    ...(html ? { html } : {}),
    ...(replyTo ? { replyTo } : {})
  };

  await transporterInstance.sendMail(mailOptions);
}
