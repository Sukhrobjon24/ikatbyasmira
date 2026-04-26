"use client";

import { useSiteContent } from "./content-provider";

export function FloatingActions() {
  const { dictionary } = useSiteContent();

  const links = [
    {
      href: "https://wa.me/998901234567",
      label: dictionary.ui.whatsapp,
    },
    {
      href: "https://t.me/ikatbyasmira",
      label: dictionary.ui.telegram,
    },
    {
      href: "https://instagram.com/ikatbyasmira",
      label: dictionary.ui.instagram,
    },
    {
      href: "https://maps.google.com/?q=Samarkand%2C%20Uzbekistan",
      label: dictionary.ui.location,
    },
  ];

  return (
    <div className="floating-actions" aria-label="Quick actions">
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
