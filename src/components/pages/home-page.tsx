"use client";

import Image from "next/image";
import Link from "next/link";
import { useSiteContent } from "@/components/content-provider";
import { ViewportReveal } from "@/components/viewport-reveal";

export function HomePage() {
  const { content, dictionary, locale } = useSiteContent();

  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <ViewportReveal className="hero-copy">
            <div className="hero-badges">
              <span className="hero-badge">Handmade Silk</span>
              <span className="hero-badge">Luxury Heritage</span>
            </div>
            <p className="section-kicker">{dictionary.hero.eyebrow}</p>
            <h1>{dictionary.hero.title}</h1>
            <p className="hero-description">{dictionary.hero.description}</p>
            <div className="hero-actions">
              <Link href={`/${locale}/catalog`} className="button-primary">
                {dictionary.cta.viewCollection}
              </Link>
              <Link href={`/${locale}/about`} className="button-secondary">
                {dictionary.cta.discoverStory}
              </Link>
            </div>
          </ViewportReveal>

          <ViewportReveal className="hero-visual" delay={160}>
            <div className="hero-card hero-card--main">
              <Image
                src="/uploads/ikat/look-09.jpg"
                alt="IKAT premium silk visual"
                fill
                className="art-image"
                priority
                sizes="(max-width: 760px) 100vw, (max-width: 1100px) 80vw, 45vw"
              />
            </div>
            <div className="hero-card hero-card--accent">
              <Image
                src="/uploads/ikat/look-11.jpg"
                alt="IKAT fabric detail"
                fill
                className="art-image"
                sizes="(max-width: 760px) 55vw, 18rem"
              />
            </div>
          </ViewportReveal>
        </div>
      </section>

      <section className="section">
        <ViewportReveal className="container split-card">
          <div>
            <p className="section-kicker">{dictionary.home.aboutTitle}</p>
            <h2>Tradition woven into a modern silhouette.</h2>
          </div>
          <p className="lead-text">{dictionary.home.aboutText}</p>
        </ViewportReveal>
      </section>

      <section className="section">
        <ViewportReveal className="container">
          <div className="section-heading">
            <div>
              <p className="section-kicker">{dictionary.home.featuredTitle}</p>
              <h2>Signature pieces for fashion and interiors</h2>
            </div>
            <Link href={`/${locale}/catalog`} className="inline-link">
              {dictionary.cta.viewCollection}
            </Link>
          </div>

          <div className="product-grid">
            {content.products.slice(0, 4).map((product, index) => (
              <ViewportReveal className="luxury-card" key={product.id} delay={index * 90}>
                <div className="image-frame">
                  <Image
                    src={product.image}
                    alt={product.name[locale]}
                    fill
                    className="art-image"
                    sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 25vw"
                  />
                </div>
                <p className="card-category">{product.category[locale]}</p>
                <h3>{product.name[locale]}</h3>
                <p>{product.shortDescription[locale]}</p>
                <div className="card-meta">
                  <span>{product.price}</span>
                  <Link href={`/${locale}/catalog/${product.slug}`} className="inline-link">
                    {dictionary.cta.viewCollection}
                  </Link>
                </div>
              </ViewportReveal>
            ))}
          </div>
        </ViewportReveal>
      </section>

      <section className="section section-warm">
        <ViewportReveal className="container">
          <div className="section-heading">
            <div>
              <p className="section-kicker">{dictionary.home.galleryTitle}</p>
              <h2>Atmosphere, process, and cultural presence</h2>
            </div>
            <Link href={`/${locale}/gallery`} className="inline-link">
              {dictionary.cta.exploreGallery}
            </Link>
          </div>
          <div className="gallery-preview">
            {content.gallery.slice(0, 4).map((item, index) => (
              <ViewportReveal className="gallery-tile" key={item.id} delay={index * 80}>
                <Image
                  src={item.image}
                  alt={item.title[locale]}
                  fill
                  className="art-image"
                  sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 25vw"
                />
                <div className="gallery-overlay">
                  <h3>{item.title[locale]}</h3>
                  <p>{item.location[locale]}</p>
                </div>
              </ViewportReveal>
            ))}
          </div>
        </ViewportReveal>
      </section>

      <section className="section">
        <ViewportReveal className="container stats-band">
          <div>
            <p className="section-kicker">{dictionary.home.statsTitle}</p>
            <h2>Luxury storytelling shaped for a global audience.</h2>
          </div>
          <div className="stats-grid">
            {dictionary.home.stats.map((stat) => (
              <div className="stat-card" key={stat.label}>
                <strong>{stat.value}</strong>
                <span>{stat.label}</span>
              </div>
            ))}
          </div>
        </ViewportReveal>
      </section>

      <section className="section">
        <ViewportReveal className="container">
          <div className="section-heading">
            <div>
              <p className="section-kicker">{dictionary.home.newsTitle}</p>
              <h2>Latest stories from IKAT</h2>
            </div>
            <Link href={`/${locale}/news`} className="inline-link">
              {dictionary.cta.readNews}
            </Link>
          </div>
          <div className="news-grid">
            {content.news.slice(0, 3).map((post, index) => (
              <ViewportReveal className="news-card" key={post.id} delay={index * 90}>
                <div className="image-frame image-frame--wide">
                  <Image
                    src={post.cover}
                    alt={post.title[locale]}
                    fill
                    className="art-image"
                    sizes="(max-width: 760px) 100vw, (max-width: 1100px) 50vw, 33vw"
                  />
                </div>
                <span className="news-date">{post.date}</span>
                <h3>{post.title[locale]}</h3>
                <p>{post.excerpt[locale]}</p>
              </ViewportReveal>
            ))}
          </div>
        </ViewportReveal>
      </section>
    </>
  );
}
