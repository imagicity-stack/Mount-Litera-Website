import { contentCollectionMap } from '@/lib/contentCollections';

/**
 * Server-side shaping for content records. Shared by the collection route and
 * the single-record route so both agree on exactly which fields exist.
 */

/** Shape a stored document using only the fields its schema declares. */
export const serializeRecord = (key, doc) => {
  const data = doc.data() || {};
  const record = {
    id: doc.id,
    order: typeof data.order === 'number' ? data.order : 0,
    status: data.status === 'hidden' ? 'hidden' : 'published',
    updatedAt: data.updatedAt ? data.updatedAt.toDate().toISOString() : null,
    // Present on keyed collections (the house slug).
    key: data.key || doc.id,
    // Carried for cleanup when a file is replaced or the record removed.
    filePaths: data.filePaths || {}
  };
  contentCollectionMap[key].fields.forEach((field) => {
    const value = data[field.name];
    record[field.name] =
      field.type === 'list' ? (Array.isArray(value) ? value : []) : value || '';
  });
  return record;
};

/**
 * Accept only the fields the schema declares, coerced to the right shape.
 * Anything a client sends that is not in the schema is dropped rather than
 * written, so a collection cannot grow arbitrary fields.
 */
export const sanitizeRecord = (key, body) => {
  const out = {};
  contentCollectionMap[key].fields.forEach((field) => {
    if (!(field.name in body)) return;
    const value = body[field.name];
    if (field.type === 'list') {
      out[field.name] = Array.isArray(value)
        ? value.map((v) => String(v).trim().slice(0, 500)).filter(Boolean).slice(0, 40)
        : [];
    } else if (field.type === 'textarea') {
      out[field.name] = String(value || '').trim().slice(0, 4000);
    } else {
      out[field.name] = String(value || '').trim().slice(0, 600);
    }
  });
  if ('order' in body) out.order = Number(body.order) || 0;
  if ('status' in body) out.status = body.status === 'hidden' ? 'hidden' : 'published';
  if (body.filePaths && typeof body.filePaths === 'object') out.filePaths = body.filePaths;
  return out;
};

/** The first required field left blank, or undefined when the record is valid. */
export const missingRequired = (key, record) =>
  contentCollectionMap[key].fields
    .filter((f) => f.required)
    .find((f) => !String(record[f.name] || '').trim());
