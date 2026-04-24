"use client";

import Link from "next/link";
import { useSiteContent } from "./content-provider";

export function SiteFooter() {
  const { dictionary, locale } = useSiteContent();

  return (
    <footer className="site-footer">
      <div className="container footer-grid">
        <div>
          <p className="section-kicker">IKAT</p>
          <p className="footer-copy">{dictionary.footer.text}</p>
        </div>
        <div className="footer-links">
          <Link href={`/${locale}/catalog`}>{dictionary.nav.catalog}</Link>
          <Link href={`/${locale}/gallery`}>{dictionary.nav.gallery}</Link>
          <Link href={`/${locale}/contact`}>{dictionary.nav.contact}</Link>
        </div>
      </div>
    </footer>
  );
}
