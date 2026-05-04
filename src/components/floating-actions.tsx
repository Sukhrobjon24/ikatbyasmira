"use client";

import { getWhatsAppUrl, socialLinks } from "@/lib/social";
import { useSiteContent } from "./content-provider";

export function FloatingActions() {
  const { dictionary } = useSiteContent();

  const links = [
    {
      href: getWhatsAppUrl(),
      label: dictionary.ui.whatsapp,
    },
    {
      href: socialLinks.telegram,
      label: dictionary.ui.telegram,
    },
    {
      href: socialLinks.instagram,
      label: dictionary.ui.instagram,
    },
  ];

  return (
    <div className="floating-actions" aria-label="Quick contact actions">
      {links.map((link) => (
        <a
          key={link.label}
          href={link.href}
          className="floating-actions__link"
          target="_blank"
          rel="noreferrer"
        >
          {link.label}
        </a>
      ))}
    </div>
  );
}