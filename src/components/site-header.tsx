"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { localeLabels, locales } from "@/lib/i18n";
import type { Locale } from "@/types/content";
import { useSiteContent } from "./content-provider";

export function SiteHeader() {
  const pathname = usePathname();
  const { dictionary, locale } = useSiteContent();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { href: `/${locale}`, label: dictionary.nav.home },
    { href: `/${locale}/about`, label: dictionary.nav.about },
    { href: `/${locale}/catalog`, label: dictionary.nav.catalog },
    { href: `/${locale}/gallery`, label: dictionary.nav.gallery },
    { href: `/${locale}/news`, label: dictionary.nav.news },
    { href: `/${locale}/contact`, label: dictionary.nav.contact },
    { href: `/${locale}/admin`, label: dictionary.nav.admin },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);

    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  return (
    <header className={`site-header${scrolled ? " is-scrolled" : ""}`}>
      <div className="container nav-bar">
        <Link href={`/${locale}`} className="brand-mark">
          <span className="brand-mark__name">IKAT</span>
          <span className="brand-mark__line">{dictionary.brandLine}</span>
        </Link>

        <nav className="nav-links nav-links--desktop" aria-label="Primary">
          {navItems.map((item) => {
            const active = pathname === item.href;

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`nav-link${active ? " is-active" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div
          className="language-switcher language-switcher--desktop"
          aria-label="Language switcher"
        >
          {locales.map((item) => {
            const nextPath = swapLocale(pathname, locale, item);

            return (
              <Link
                key={item}
                href={nextPath}
                className={`language-pill${item === locale ? " is-active" : ""}`}
                onClick={() => setMenuOpen(false)}
              >
                {localeLabels[item]}
              </Link>
            );
          })}
        </div>

        <button
          type="button"
          className={`menu-toggle${menuOpen ? " is-active" : ""}`}
          aria-expanded={menuOpen}
          aria-label={menuOpen ? dictionary.ui.close : dictionary.ui.menu}
          onClick={() => setMenuOpen((value) => !value)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      <div className={`mobile-overlay${menuOpen ? " is-open" : ""}`}>
        <div className="mobile-overlay__panel">
          <div className="mobile-overlay__top">
            <p className="section-kicker">{dictionary.brandLine}</p>
            <button
              type="button"
              className="mobile-overlay__close"
              onClick={() => setMenuOpen(false)}
            >
              {dictionary.ui.close}
            </button>
          </div>

          <nav className="mobile-nav" aria-label="Mobile primary">
            {navItems.map((item) => {
              const active = pathname === item.href;

              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`mobile-nav__link${active ? " is-active" : ""}`}
                  onClick={() => setMenuOpen(false)}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="mobile-overlay__footer">
            <div className="language-switcher language-switcher--mobile">
              {locales.map((item) => {
                const nextPath = swapLocale(pathname, locale, item);

                return (
                  <Link
                    key={item}
                    href={nextPath}
                    className={`language-pill${item === locale ? " is-active" : ""}`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {localeLabels[item]}
                  </Link>
                );
              })}
            </div>

            <div className="mobile-quick-links">
              <a href="https://wa.me/998901234567" target="_blank" rel="noreferrer">
                {dictionary.ui.whatsapp}
              </a>
              <a href="https://t.me/ikatbyasmira" target="_blank" rel="noreferrer">
                {dictionary.ui.telegram}
              </a>
              <a href="https://instagram.com/ikatbyasmira" target="_blank" rel="noreferrer">
                {dictionary.ui.instagram}
              </a>
              <a
                href="https://maps.google.com/?q=Samarkand%2C%20Uzbekistan"
                target="_blank"
                rel="noreferrer"
              >
                {dictionary.ui.location}
              </a>
            </div>
          </div>
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
