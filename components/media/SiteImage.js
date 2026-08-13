import { useCallback, useEffect, useRef, useState } from 'react';

import { useMediaSlot } from '@/lib/useSiteMedia';

/**
 * An image position the school can change from the admin portal.
 *
 * Renders the uploaded image when one exists and the reference image shipped
 * in /public otherwise, so every slot always has something in it. The frame
 * holds its aspect ratio regardless of which image is showing, so swapping one
 * in never shifts the layout around it.
 *
 * A plain <img> is deliberate: uploads are served from the Firebase Storage
 * domain, which next/image would require an explicit remote-host allowlist for.
 *
 * @param {string}  slot     key from lib/mediaSlots.js
 * @param {boolean} fill     stretch to the parent box instead of holding the ratio
 * @param {string}  overlay  optional scrim class painted over the image
 * @param {boolean} priority skip lazy loading (use for above-the-fold images)
 */
export default function SiteImage({
  slot,
  className = '',
  imgClassName = '',
  ratio,
  fill = false,
  overlay = '',
  priority = false,
  alt,
  sizes,
  children
}) {
  const resolved = useMediaSlot(slot);
  const imgRef = useRef(null);
  const [loaded, setLoaded] = useState(false);

  // An image restored from cache can finish decoding before React attaches the
  // load handler, in which case onLoad never fires. Ask the element directly so
  // the fade-in can never strand a perfectly good image at zero opacity.
  const syncLoaded = useCallback(() => {
    const el = imgRef.current;
    if (el && el.complete && el.naturalWidth > 0) setLoaded(true);
  }, []);

  useEffect(() => {
    setLoaded(false);
    // Check on the next frame so the browser has swapped in the new src.
    const id = requestAnimationFrame(syncLoaded);
    return () => cancelAnimationFrame(id);
  }, [resolved.src, syncLoaded]);

  if (!resolved.src) return null;

  const frameStyle = fill ? undefined : { aspectRatio: ratio || resolved.ratio };

  // Only claim `relative` when the caller has not positioned the frame. Both
  // classes together let Tailwind's source order win, and `.relative` is
  // written after `.absolute` — which collapses the frame and hides the image.
  const positioned = /(^|\s)(absolute|fixed|sticky|relative)(\s|$)/.test(className);

  return (
    <div
      className={`${positioned ? '' : 'relative'} overflow-hidden bg-stone ${
        fill ? 'h-full w-full' : ''
      } ${className}`.trim()}
      style={frameStyle}
    >
      <img
        ref={imgRef}
        src={resolved.src}
        alt={alt ?? resolved.alt}
        sizes={sizes}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : undefined}
        onLoad={() => setLoaded(true)}
        onError={() => setLoaded(true)}
        style={{ objectPosition: `${resolved.focalX}% ${resolved.focalY}%` }}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-700 ease-elite ${
          loaded ? 'opacity-100' : 'opacity-0'
        } ${imgClassName}`}
      />
      {overlay && <div className={`absolute inset-0 ${overlay}`} aria-hidden="true" />}
      {children}
    </div>
  );
}
