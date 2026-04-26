"use client";

import Image from "next/image";
import { useSiteContent } from "@/components/content-provider";
import { ViewportReveal } from "@/components/viewport-reveal";

export function NewsPage() {
  const { content, dictionary, locale } = useSiteContent();

  return (
    <section className="section page-intro">
      <ViewportReveal className="container">
        <div className="section-heading">
          <div>
            <p className="section-kicker">{dictionary.nav.news}</p>
            <h1>{dictionary.news.title}</h1>
          </div>
          <p className="lead-text catalog-lead">{dictionary.news.subtitle}</p>
        </div>

        <div className="journal-stack">
          {content.news.map((post, index) => (
            <ViewportReveal className="journal-card" key={post.id} delay={index * 90}>
              <div className="image-frame image-frame--journal">
                <Image
                  src={post.cover}
                  alt={post.title[locale]}
                  fill
                  className="art-image"
                  sizes="(max-width: 1100px) 100vw, 40vw"
                />
              </div>
              <div className="journal-copy">
                <span className="news-date">{post.date}</span>
                <h2>{post.title[locale]}</h2>
                <p>{post.excerpt[locale]}</p>
                <p>{post.body[locale]}</p>
              </div>
            </ViewportReveal>
          ))}
        </div>
      </ViewportReveal>
    </section>
  );
}
