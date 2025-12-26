import nodemailer from 'nodemailer';

function createTransporter() {
  const { SMTP_HOST, SMTP_PORT = 587, SMTP_USER, SMTP_PASS } = process.env;

  if (!SMTP_HOST || !SMTP_USER || !SMTP_PASS) {
    throw new Error('SMTP configuration is incomplete.');
  }

  return nodemailer.createTransport({
    host: SMTP_HOST,
    port: Number(SMTP_PORT) || 587,
    secure: false,
    requireTLS: true,
    auth: {
      user: SMTP_USER,
      pass: SMTP_PASS
    }
  });
}

function formatFields(fields) {
  const entries = Object.entries(fields || {});

  if (entries.length === 0) {
    return 'No form fields provided.';
  }

  return entries
    .map(([key, value]) => `${key}: ${Array.isArray(value) ? value.join(', ') : value}`)
    .join('\n');
}

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', ['POST']);
    return res.status(405).json({ success: false, error: 'Method Not Allowed' });
  }

  const { CONTACT_TO } = process.env;

  if (!CONTACT_TO) {
    return res.status(500).json({ success: false, error: 'Contact recipient is not configured.' });
  }

  try {
    const transporter = createTransporter();
    const text = formatFields(req.body);

    await transporter.sendMail({
      from: process.env.SMTP_USER,
      to: CONTACT_TO,
      subject: 'New Website Contact Enquiry',
      text
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact form email error:', error);
    return res.status(500).json({ success: false, error: 'Failed to send contact enquiry.' });
  }
}
