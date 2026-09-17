/**
 * The people directory, read on the server.
 *
 * The public pages used to ship the roster the site was built with and then
 * swap it for the Firestore one after hydration — which a visitor sees as the
 * old names flashing up first. Reading the directory here, at build and
 * revalidation time, puts the real roster in the HTML, so there is nothing to
 * swap and nothing to flash.
 *
 * Server-only: it uses the Admin SDK and must never be imported into a
 * component that reaches the browser bundle.
 */

import { adminDb } from '@/lib/firebaseAdmin';
import { PEOPLE_COLLECTION, isKnownGroup } from '@/lib/peopleGroups';

/** Matches the shape `/api/people` returns, so the client swap is a no-op. */
const serialize = (doc) => {
  const d = doc.data() || {};
  return {
    id: doc.id,
    group: d.group || '',
    name: d.name || '',
    designation: d.designation || '',
    department: d.department || '',
    photo: d.photo || '',
    photoPath: d.photoPath || '',
    bio: d.bio || '',
    order: typeof d.order === 'number' ? d.order : 0,
    status: d.status || 'published',
    updatedAt: d.updatedAt?.toDate?.()?.toISOString?.() || null
  };
};

const sortPeople = (a, b) => a.order - b.order || a.name.localeCompare(b.name);

/**
 * The published roster for one group, or `null` when the directory could not
 * be read or has no entries for it.
 *
 * `null` rather than `[]` is deliberate: the page needs to tell "the school has
 * not filled this in yet" — where the shipped roster is the right thing to show
 * — apart from "the school deliberately has nobody here", and a build that
 * happened without credentials must not bake an empty page.
 */
export const fetchGroupOnServer = async (groupKey) => {
  if (!isKnownGroup(groupKey)) return null;
  try {
    const snapshot = await adminDb.collection(PEOPLE_COLLECTION).get();
    const people = snapshot.docs
      .map(serialize)
      .filter((p) => p.group === groupKey && p.status === 'published')
      .sort(sortPeople);
    return people.length ? people : null;
  } catch (error) {
    // eslint-disable-next-line no-console
    console.warn(`People directory unavailable at build for "${groupKey}":`, error?.message);
    return null;
  }
};

/**
 * getStaticProps for a people page.
 *
 * Incremental regeneration rather than a per-request render: the roster changes
 * a few times a year, so a cached page that refreshes within a minute of an
 * edit is the right trade against rendering it for every visitor.
 */
export const peoplePageProps = (groupKey, revalidate = 60) => async () => ({
  props: { initialPeople: await fetchGroupOnServer(groupKey) },
  revalidate
});
