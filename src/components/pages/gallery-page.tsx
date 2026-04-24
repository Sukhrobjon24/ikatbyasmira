"use client";

import Image from "next/image";
import { useSiteContent } from "@/components/content-provider";

export function GalleryPage() {
  const { content, dictionary, locale } = useSiteContent();

  return (
    <section className="section page-intro">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="section-kicker">{dictionary.nav.gallery}</p>
            <h1>{dictionary.gallery.title}</h1>
          </div>
          <p className="lead-text catalog-lead">{dictionary.gallery.subtitle}</p>
        </div>

        <div className="masonry-grid">
          {content.gallery.map((item) => (
            <article className="masonry-card" key={item.id}>
              <div className="image-frame image-frame--masonry">
                <Image src={item.image} alt={item.title[locale]} fill className="art-image" />
              </div>
              <div className="masonry-copy">
                <h3>{item.title[locale]}</h3>
                <p className="card-category">{item.location[locale]}</p>
                <p>{item.description[locale]}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
