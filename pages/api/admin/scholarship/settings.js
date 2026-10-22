/**
 * Scholarship settings, and a way to prove the notification email works.
 *
 * GET returns the stored settings plus the *resolved* notification addresses —
 * which inbox the registration alerts are actually going to right now, and
 * which environment variable supplied it. That is a question the office will
 * ask, and reading it off a screen beats reading it off a deployment config.
 *
 * POST with `action: "test-email"` sends a real message to that inbox, so
 * "will we be told when someone registers?" has an answer you can see land.
 */

import { requireAdmin } from '@/lib/adminAuth';
import { defaultScholarshipSettings, previewNextNumber } from '@/lib/scholarshipSettings';
import { loadScholarshipSettings, saveScholarshipSettings } from '@/lib/scholarshipStore';
import {
  adminRecipient,
  dispatch,
  senderAddress,
  testNotificationEmail
} from '@/lib/scholarshipEmails';

/** Which variable actually supplied the recipient, for the portal to show. */
const recipientSource = () => {
  if (process.env.SCHOLARSHIP_TO) return 'SCHOLARSHIP_TO';
  if (process.env.ADMISSION_TO) return 'ADMISSION_TO';
  if (process.env.CONTACT_TO) return 'CONTACT_TO';
  return 'built-in default';
};

const senderSource = () => {
  if (process.env.MS_SENDER) return 'MS_SENDER';
  if (process.env.SMTP_FROM) return 'SMTP_FROM';
  return 'built-in default';
};

const transport = () =>
  process.env.MS_TENANT_ID && process.env.MS_CLIENT_ID && process.env.MS_CLIENT_SECRET
    ? 'Microsoft Graph'
    : process.env.SMTP_HOST
      ? 'SMTP'
      : 'not configured';

export default async function handler(req, res) {
  const adminUser = await requireAdmin(req, res);
  if (!adminUser) return undefined;

  res.setHeader('Cache-Control', 'no-store');

  const notifications = {
    recipient: adminRecipient(),
    recipientSource: recipientSource(),
    sender: senderAddress(),
    senderSource: senderSource(),
    transport: transport()
  };

  if (req.method === 'GET') {
    const settings = await loadScholarshipSettings();
    return res.status(200).json({
      settings,
      defaults: defaultScholarshipSettings,
      preview: previewNextNumber(settings),
      notifications
    });
  }

  if (req.method === 'PUT') {
    const body = req.body || {};
    // Only keys the schema declares, so the document cannot grow junk fields.
    const updates = {};
    Object.keys(defaultScholarshipSettings).forEach((key) => {
      if (key in body) updates[key] = body[key];
    });

    try {
      const settings = await saveScholarshipSettings(updates, adminUser.email);
      return res.status(200).json({
        settings,
        preview: previewNextNumber(settings),
        notifications,
        message: 'Settings saved.'
      });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Scholarship settings save failed:', error?.message);
      return res.status(500).json({ message: 'Could not save the settings.' });
    }
  }

  if (req.method === 'POST') {
    if (req.body?.action !== 'test-email') {
      return res.status(400).json({ message: 'Unknown action.' });
    }
    const to = notifications.recipient;
    if (transport() === 'not configured') {
      return res.status(503).json({
        message:
          'No email transport is configured. Set the MS_* variables for Microsoft Graph, or the SMTP_* variables.',
        notifications
      });
    }
    const sent = await dispatch({
      to,
      template: testNotificationEmail({ ...notifications, by: adminUser.email })
    });
    return res.status(sent ? 200 : 502).json({
      message: sent
        ? `Test email sent to ${to}. If it does not arrive, check the spam folder and the sender's mailbox.`
        : 'The test email could not be sent. The server log has the reason.',
      notifications
    });
  }

  res.setHeader('Allow', 'GET, PUT, POST');
  return res.status(405).json({ message: 'Method not allowed.' });
}
