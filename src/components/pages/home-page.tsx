"use client";

import Image from "next/image";
import Link from "next/link";
import { useSiteContent } from "@/components/content-provider";

export function HomePage() {
  const { content, dictionary, locale } = useSiteContent();

  return (
    <>
      <section className="hero-section">
        <div className="container hero-grid">
          <div className="hero-copy reveal-up">
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
          </div>

          <div className="hero-visual reveal-up reveal-delay">
            <div className="hero-card hero-card--main">
              <Image
                src="/hero-main.svg"
                alt="IKAT premium silk visual"
                fill
                className="art-image"
                priority
              />
            </div>
            <div className="hero-card hero-card--accent">
              <Image src="/hero-detail.svg" alt="IKAT fabric detail" fill className="art-image" />
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container split-card">
          <div>
            <p className="section-kicker">{dictionary.home.aboutTitle}</p>
            <h2>Tradition woven into a modern silhouette.</h2>
          </div>
          <p className="lead-text">{dictionary.home.aboutText}</p>
        </div>
      </section>

      <section className="section">
        <div className="container">
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
            {content.products.slice(0, 3).map((product) => (
              <article className="luxury-card reveal-up" key={product.id}>
                <div className="image-frame">
                  <Image src={product.image} alt={product.name[locale]} fill className="art-image" />
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
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-warm">
        <div className="container">
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
            {content.gallery.slice(0, 4).map((item) => (
              <div className="gallery-tile" key={item.id}>
                <Image src={item.image} alt={item.title[locale]} fill className="art-image" />
                <div className="gallery-overlay">
                  <h3>{item.title[locale]}</h3>
                  <p>{item.location[locale]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container stats-band">
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
        </div>
      </section>

      <section className="section">
        <div className="container">
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
            {content.news.slice(0, 3).map((post) => (
              <article className="news-card" key={post.id}>
                <div className="image-frame image-frame--wide">
                  <Image src={post.cover} alt={post.title[locale]} fill className="art-image" />
                </div>
                <span className="news-date">{post.date}</span>
                <h3>{post.title[locale]}</h3>
                <p>{post.excerpt[locale]}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
