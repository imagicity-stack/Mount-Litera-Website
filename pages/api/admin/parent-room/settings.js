/**
 * Parent Room availability configuration.
 *
 * Follows the same shape as `/api/settings`: read the merged document, write
 * validated fields back. Every value is clamped by `mergeParentRoomSettings`
 * before it is stored, so a mistyped session length or a day that ends before
 * it starts cannot take the booking calendar down.
 */

import { requireAdmin } from '@/lib/adminAuth';
import { defaultParentRoomSettings } from '@/lib/parentRoom';
import { loadSettings, saveSettings } from '@/lib/parentRoomStore';

export default async function handler(req, res) {
  const adminUser = await requireAdmin(req, res);
  if (!adminUser) return undefined;

  res.setHeader('Cache-Control', 'no-store');

  if (req.method === 'GET') {
    const settings = await loadSettings();
    return res.status(200).json({ settings, defaults: defaultParentRoomSettings });
  }

  if (req.method === 'PUT') {
    const body = req.body || {};
    // Only keys the schema declares, so the document cannot grow junk fields.
    const updates = {};
    Object.keys(defaultParentRoomSettings).forEach((key) => {
      if (key in body) updates[key] = body[key];
    });

    try {
      const settings = await saveSettings(updates, adminUser.email);
      return res.status(200).json({ settings, message: 'Settings saved.' });
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error('Parent Room settings save failed:', error?.message);
      return res.status(500).json({ message: 'Could not save the settings.' });
    }
  }

  res.setHeader('Allow', 'GET, PUT');
  return res.status(405).json({ message: 'Method not allowed.' });
}
