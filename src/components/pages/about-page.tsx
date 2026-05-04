"use client";

import { useSiteContent } from "@/components/content-provider";
import { ViewportReveal } from "@/components/viewport-reveal";

export function AboutPage() {
  const { dictionary } = useSiteContent();

  return (
    <section className="section page-intro">
      <ViewportReveal className="container narrow-stack">
        <p className="section-kicker">{dictionary.nav.about}</p>
        <h1>{dictionary.about.title}</h1>
        <p className="lead-text">{dictionary.about.intro}</p>

        <div className="story-grid">
          <div className="story-block">
            {dictionary.about.paragraphs.map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
          <div className="value-card">
            <p className="section-kicker">IKAT</p>
            <h2>{dictionary.about.valueHeadline}</h2>
            <ul className="value-list">
              {dictionary.about.values.map((value) => (
                <li key={value}>{value}</li>
              ))}
            </ul>
          </div>
        </div>
      </ViewportReveal>
    </section>
  );
}