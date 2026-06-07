"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Image, Info, Layers, Newspaper, Phone, ShoppingBag } from "lucide-react";
import { localeLabels, locales } from "@/lib/i18n";
import { getWhatsAppUrl, socialLinks } from "@/lib/social";
import { InstagramIcon, LocationIcon, TelegramIcon, WhatsAppIcon } from "./social-icons";
import type { Locale } from "@/types/content";
import { useSiteContent } from "./content-provider";

export function SiteHeader() {
  const pathname = usePathname();
  const { dictionary, locale } = useSiteContent();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = [
    { href: `/${locale}`, label: dictionary.nav.home, icon: <Home size={20} /> },
    { href: `/${locale}/about`, label: dictionary.nav.about, icon: <Info size={20} /> },
    { href: `/${locale}/catalog`, label: dictionary.nav.catalog, icon: <ShoppingBag size={20} /> },
    {
      href: `/${locale}/collections`,
      label: dictionary.nav.collections,
      icon: <Layers size={20} />,
    },
    { href: `/${locale}/gallery`, label: dictionary.nav.gallery, icon: <Image size={20} /> },
    { href: `/${locale}/news`, label: dictionary.nav.news, icon: <Newspaper size={20} /> },
    { href: `/${locale}/contact`, label: dictionary.nav.contact, icon: <Phone size={20} /> },
  ];

  const quickLinks = [
    {
      id: "whatsapp",
      href: getWhatsAppUrl(),
      label: dictionary.ui.whatsapp,
      icon: <WhatsAppIcon />,
    },
    {
      id: "telegram",
      href: socialLinks.telegram,
      label: dictionary.ui.telegram,
      icon: <TelegramIcon />,
    },
    {
      id: "instagram",
      href: socialLinks.instagram,
      label: dictionary.ui.instagram,
      icon: <InstagramIcon />,
    },
    {
      id: "location",
      href: socialLinks.maps,
      label: dictionary.ui.location,
      icon: <LocationIcon />,
    },
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
                  <span className="mobile-nav__icon">{item.icon}</span>
                  <span className="mobile-nav__label">{item.label}</span>
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
              {quickLinks.map((link) => (
                <a
                  key={link.id}
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className={`mobile-quick-links__link mobile-quick-links__link--${link.id}`}
                >
                  <span className="mobile-quick-links__icon">{link.icon}</span>
                  <span className="mobile-quick-links__text">{link.label}</span>
                </a>
              ))}
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
