import Link from 'next/link';
import { useRouter } from 'next/router';

/**
 * Section sub-navigation: the section name, a slash, then the pages inside it.
 * Sits directly under the masthead on interior pages.
 */
export default function SubNav({ section, links = [] }) {
  const router = useRouter();
  const currentPath = router.asPath;

  return (
    <nav className="subnav" aria-label={`${section} section navigation`}>
      <div className="shell">
        <div className="subnav__inner">
          <span className="subnav__section">{section}</span>
          <span className="subnav__sep" aria-hidden="true">
            /
          </span>
          {links.map((link) => {
            const isCurrent = link.href === currentPath;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="subnav__link"
                aria-current={isCurrent ? 'page' : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
