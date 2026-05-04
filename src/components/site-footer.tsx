"use client";

import Link from "next/link";
import { getWhatsAppUrl, socialLinks } from "@/lib/social";
import { useSiteContent } from "./content-provider";

export function SiteFooter() {
  const { dictionary, locale } = useSiteContent();

  const socialItems = [
    { href: getWhatsAppUrl(), label: dictionary.ui.whatsapp },
    { href: socialLinks.telegram, label: dictionary.ui.telegram },
    { href: socialLinks.instagram, label: dictionary.ui.instagram },
  ];

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="section-kicker">IKAT</p>
          <p className="footer-copy">{dictionary.footer.text}</p>
        </div>
        <div className="footer-links">
          <Link href={`/${locale}/catalog`}>{dictionary.nav.catalog}</Link>
          <Link href={`/${locale}/collections`}>{dictionary.nav.collections}</Link>
          <Link href={`/${locale}/gallery`}>{dictionary.nav.gallery}</Link>
          <Link href={`/${locale}/contact`}>{dictionary.nav.contact}</Link>
          {socialItems.map((item) => (
            <a key={item.label} href={item.href} target="_blank" rel="noreferrer">
              {item.label}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
