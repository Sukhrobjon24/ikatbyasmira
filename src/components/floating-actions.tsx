"use client";

import { getWhatsAppUrl, socialLinks } from "@/lib/social";
import { InstagramIcon, TelegramIcon, WhatsAppIcon } from "./social-icons";
import { useSiteContent } from "./content-provider";

export function FloatingActions() {
  const { dictionary } = useSiteContent();

  const links = [
    {
      href: getWhatsAppUrl(),
      label: dictionary.ui.whatsapp,
      icon: <WhatsAppIcon />,
    },
    {
      href: socialLinks.telegram,
      label: dictionary.ui.telegram,
      icon: <TelegramIcon />,
    },
    {
      href: socialLinks.instagram,
      label: dictionary.ui.instagram,
      icon: <InstagramIcon />,
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
          aria-label={link.label}
        >
          <span className="floating-actions__icon">{link.icon}</span>
          <span className="floating-actions__text">{link.label}</span>
        </a>
      ))}
    </div>
  );
}
