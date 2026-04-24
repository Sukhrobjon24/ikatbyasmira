"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeLabels, locales } from "@/lib/i18n";
import type { Locale } from "@/types/content";
import { useSiteContent } from "./content-provider";

export function SiteHeader() {
  const pathname = usePathname();
  const { dictionary, locale } = useSiteContent();

  const navItems = [
    { href: `/${locale}`, label: dictionary.nav.home },
    { href: `/${locale}/about`, label: dictionary.nav.about },
    { href: `/${locale}/catalog`, label: dictionary.nav.catalog },
    { href: `/${locale}/gallery`, label: dictionary.nav.gallery },
    { href: `/${locale}/news`, label: dictionary.nav.news },
    { href: `/${locale}/contact`, label: dictionary.nav.contact },
    { href: `/${locale}/admin`, label: dictionary.nav.admin },
  ];

  return (
    <header className="site-header">
      <div className="container nav-bar">
        <Link href={`/${locale}`} className="brand-mark">
          <span className="brand-mark__name">IKAT</span>
          <span className="brand-mark__line">{dictionary.brandLine}</span>
        </Link>

        <nav className="nav-links" aria-label="Primary">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link${active ? " is-active" : ""}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="language-switcher" aria-label="Language switcher">
          {locales.map((item) => {
            const nextPath = swapLocale(pathname, locale, item);

            return (
              <Link
                key={item}
                href={nextPath}
                className={`language-pill${item === locale ? " is-active" : ""}`}
              >
                {localeLabels[item]}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}

function swapLocale(pathname: string, current: Locale, next: Locale) {
  if (pathname === `/${current}`) {
    return `/${next}`;
  }

  return pathname.replace(`/${current}`, `/${next}`);
}
