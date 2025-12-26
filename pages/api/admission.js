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

  const { ADMISSION_TO, SMTP_USER } = process.env;
  const { parent_email: parentEmail, ...rest } = req.body || {};

  if (!ADMISSION_TO) {
    return res.status(500).json({ success: false, error: 'Admissions recipient is not configured.' });
  }

  if (!parentEmail) {
    return res.status(400).json({ success: false, error: 'Parent email is required.' });
  }

  try {
    const transporter = createTransporter();
    const text = formatFields({ parent_email: parentEmail, ...rest });

    await transporter.sendMail({
      from: SMTP_USER,
      to: ADMISSION_TO,
      subject: 'New Admission Enquiry',
      text
    });

    const acknowledgementText = `Dear Parent/Guardian,\n\nThank you for submitting an admission enquiry to The Elden Heights. Our admissions team has received your details and will contact you shortly.\n\nIf you have any urgent questions, please reply to this email.\n\nWarm regards,\nThe Elden Heights Admissions Team`;

    await transporter.sendMail({
      from: SMTP_USER,
      to: parentEmail,
      subject: 'Admission Enquiry Received | The Elden Heights',
      text: acknowledgementText
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Admission enquiry email error:', error);
    return res.status(500).json({ success: false, error: 'Failed to process admission enquiry.' });
  }
}
