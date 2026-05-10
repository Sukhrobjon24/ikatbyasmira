"use client";

import { useState } from "react";
import { useSiteContent } from "@/components/content-provider";
import { ViewportReveal } from "@/components/viewport-reveal";
import { getWhatsAppUrl, socialLinks } from "@/lib/social";

export function ContactPage() {
  const { dictionary } = useSiteContent();
  const [sent, setSent] = useState(false);

  return (
    <section className="section page-intro">
      <div className="container contact-grid">
        <ViewportReveal className="contact-copy">
          <p className="section-kicker">{dictionary.nav.contact}</p>
          <h1>{dictionary.contact.title}</h1>
          <p className="lead-text">{dictionary.contact.subtitle}</p>

          <div className="contact-card">
            <p>
              {dictionary.contact.phone}: +998 90 123 45 67
            </p>
            <p>{dictionary.contact.email}: hello@ikatbyasmira.uz</p>
            <p>{dictionary.ui.location}: {dictionary.contact.location}</p>
            <div className="detail-actions">
              <a
                href={getWhatsAppUrl()}
                target="_blank"
                rel="noreferrer"
                className="button-primary"
              >
                {dictionary.ui.whatsapp}
              </a>
              <a
                href={socialLinks.instagram}
                target="_blank"
                rel="noreferrer"
                className="button-secondary"
              >
                {dictionary.ui.instagram}
              </a>
              <a
                href={socialLinks.telegram}
                target="_blank"
                rel="noreferrer"
                className="button-secondary"
              >
                {dictionary.ui.telegram}
              </a>
              <a
                href={socialLinks.maps}
                target="_blank"
                rel="noreferrer"
                className="button-secondary"
              >
                {dictionary.ui.location}
              </a>
            </div>
          </div>

          <div className="map-frame">
            <iframe
              title="IKAT map"
              src={`https://www.google.com/maps?q=39.6543668,67.0615460&z=16&output=embed`}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </ViewportReveal>

        <ViewportReveal className="contact-form" delay={140}>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setSent(true);
            }}
          >
            <label>
              {dictionary.contact.form.name}
              <input type="text" placeholder={dictionary.contact.form.name} required />
            </label>
            <label>
              {dictionary.contact.form.phone}
              <input type="tel" placeholder="+998" required />
            </label>
            <label>
              {dictionary.contact.form.message}
              <textarea placeholder={dictionary.contact.form.message} rows={6} required />
            </label>
            <button className="button-primary" type="submit">
              {dictionary.contact.form.submit}
            </button>
            {sent ? <p className="success-note">{dictionary.contact.success}</p> : null}
          </form>
        </ViewportReveal>
      </div>
    </section>
  );
}
