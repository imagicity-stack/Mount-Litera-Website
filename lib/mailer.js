import nodemailer from 'nodemailer';

let transporter;

function getTransporter() {
  if (transporter) {
    return transporter;
  }

  const { SMTP_HOST, SMTP_PORT, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_USER || !SMTP_PASS) {
    throw new Error('SMTP credentials are not configured.');
  }

  transporter = nodemailer.createTransport({
    host: SMTP_HOST || 'smtp.gmail.com',
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

export async function sendMail({ to, subject, text, html, replyTo }) {
  if (!to) {
    throw new Error('Recipient address is required.');
  }

  const transporterInstance = getTransporter();

  const mailOptions = {
    from: `The Elden Heights School Website <${process.env.SMTP_USER}>`,
    to,
    subject,
    text,
    ...(html ? { html } : {}),
    ...(replyTo ? { replyTo } : {})
  };

  await transporterInstance.sendMail(mailOptions);
}
