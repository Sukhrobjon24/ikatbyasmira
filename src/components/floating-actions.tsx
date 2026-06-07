"use client";

import { getWhatsAppUrl, socialLinks } from "@/lib/social";
import { useSiteContent } from "./content-provider";

function WhatsAppIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M12 2a10 10 0 0 0-8.94 14.51L2 22l5.66-1.48A10 10 0 1 0 12 2zm0 18a8 8 0 0 1-4.06-1.1l-.29-.17-3 .79.8-2.93-.19-.3A8 8 0 1 1 12 20zm4.41-5.51c-.24-.12-1.43-.7-1.65-.78-.22-.08-.38-.12-.54.12-.16.24-.62.78-.76.94-.14.16-.28.18-.52.06-.24-.12-1-.37-1.92-1.18-.71-.63-1.18-1.41-1.32-1.65-.14-.24-.01-.37.11-.49.11-.11.24-.28.36-.42.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.54-1.3-.74-1.78-.2-.47-.4-.4-.54-.41h-.46c-.16 0-.42.06-.64.3-.22.24-.84.82-.84 2s.86 2.32.98 2.48c.12.16 1.7 2.6 4.12 3.64.58.25 1.03.4 1.38.51.58.18 1.1.16 1.52.1.46-.07 1.43-.58 1.63-1.14.2-.56.2-1.04.14-1.14-.06-.1-.22-.16-.46-.28z" />
    </svg>
  );
}

function TelegramIcon() {
  return (
    <svg viewBox="0 0 24 24" width="20" height="20" fill="currentColor" aria-hidden="true">
      <path d="M21.94 4.2a1.5 1.5 0 0 0-1.6-.2L3.16 11.1c-1.07.42-1.06 1.94.02 2.34l4.1 1.5 1.6 5.1c.2.62 1 .78 1.44.28l2.4-2.7 4.3 3.16c.7.5 1.7.12 1.88-.72l3.16-14.7a1.5 1.5 0 0 0-.12-1.16zM9.6 14.4l-.1 3-1.27-4.04 9.9-6.13c.2-.12.4.14.22.3z" />
    </svg>
  );
}

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width="20"
      height="20"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.6"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" />
    </svg>
  );
}

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
