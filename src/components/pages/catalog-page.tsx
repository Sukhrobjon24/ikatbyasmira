"use client";

import Image from "next/image";
import Link from "next/link";
import { useSiteContent } from "@/components/content-provider";

export function CatalogPage() {
  const { content, dictionary, locale } = useSiteContent();

  return (
    <section className="section page-intro">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="section-kicker">{dictionary.catalog.filterLabel}</p>
            <h1>{dictionary.catalog.title}</h1>
          </div>
          <p className="lead-text catalog-lead">{dictionary.catalog.subtitle}</p>
        </div>

        <div className="product-grid">
          {content.products.map((product) => (
            <article className="luxury-card" key={product.id}>
              <div className="image-frame">
                <Image src={product.image} alt={product.name[locale]} fill className="art-image" />
              </div>
              <p className="card-category">{product.category[locale]}</p>
              <h3>{product.name[locale]}</h3>
              <p>{product.shortDescription[locale]}</p>
              <div className="product-tags">
                {product.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
              <div className="card-meta">
                <span>
                  {dictionary.catalog.priceLabel}: {product.price}
                </span>
                <Link href={`/${locale}/catalog/${product.slug}`} className="inline-link">
                  {dictionary.cta.viewCollection}
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
