"use client";

import Image from "next/image";
import { useSiteContent } from "@/components/content-provider";

type ProductDetailPageProps = {
  slug: string;
};

export function ProductDetailPage({ slug }: ProductDetailPageProps) {
  const { content, dictionary, locale } = useSiteContent();
  const product = content.products.find((item) => item.slug === slug);

  if (!product) {
    return (
      <section className="section page-intro">
        <div className="container narrow-stack">
          <p className="section-kicker">{dictionary.nav.catalog}</p>
          <h1>Product not found</h1>
          <p className="lead-text">
            This product is not available in the current catalog view.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section className="section page-intro">
      <div className="container product-detail-grid">
        <div className="product-gallery-stack">
          <div className="image-frame image-frame--detail">
            <Image src={product.image} alt={product.name[locale]} fill className="art-image" />
          </div>
          <div className="detail-thumbs">
            {[product.image, "/hero-main.svg", "/hero-detail.svg"].map((image, index) => (
              <div className="image-frame image-frame--thumb" key={`${image}-${index}`}>
                <Image src={image} alt={`${product.name[locale]} ${index + 1}`} fill className="art-image" />
              </div>
            ))}
          </div>
        </div>

        <div className="detail-copy">
          <p className="section-kicker">{product.category[locale]}</p>
          <h1>{product.name[locale]}</h1>
          <p className="detail-price">
            {dictionary.catalog.priceLabel}: {product.price}
          </p>
          <p className="lead-text">{product.description[locale]}</p>
          <div className="product-tags">
            {product.tags.map((tag) => (
              <span key={tag}>{tag}</span>
            ))}
          </div>
          <div className="detail-actions">
            <a
              className="button-primary"
              href="https://wa.me/998901234567"
              target="_blank"
              rel="noreferrer"
            >
              WhatsApp
            </a>
            <a
              className="button-secondary"
              href="https://t.me/ikatbyasmira"
              target="_blank"
              rel="noreferrer"
            >
              Telegram
            </a>
          </div>
          <p className="detail-note">{dictionary.cta.contactOrder}</p>
        </div>
      </div>
    </section>
  );
}
