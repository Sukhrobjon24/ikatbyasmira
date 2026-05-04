"use client";

import Image from "next/image";
import { useSiteContent } from "@/components/content-provider";
import { ViewportReveal } from "@/components/viewport-reveal";
import { getWhatsAppUrl, socialLinks } from "@/lib/social";

type ProductDetailPageProps = {
  slug: string;
};

export function ProductDetailPage({ slug }: ProductDetailPageProps) {
  const { content, dictionary, locale } = useSiteContent();
  const product = content.products.find((item) => item.slug === slug);
  const detailGallery = [product?.image, "/uploads/ikat/look-11.jpg", "/uploads/ikat/look-05.jpg"]
    .filter(Boolean) as string[];

  if (!product) {
    return (
      <section className="section page-intro">
        <div className="container narrow-stack">
          <p className="section-kicker">{dictionary.nav.catalog}</p>
          <h1>{dictionary.catalog.notFoundTitle}</h1>
          <p className="lead-text">{dictionary.catalog.notFoundText}</p>
        </div>
      </section>
    );
  }

  const orderMessage = `Hello, I would like to order ${product.name.en} (${product.slug}).`;

  return (
    <section className="section page-intro">
      <div className="container product-detail-grid">
        <ViewportReveal className="product-gallery-stack">
          <div className="image-frame image-frame--detail">
            <Image
              src={product.image}
              alt={product.name[locale]}
              fill
              className="art-image"
              sizes="(max-width: 1100px) 100vw, 50vw"
            />
          </div>
          <div className="detail-thumbs">
            {detailGallery.map((image, index) => (
              <div className="image-frame image-frame--thumb" key={`${image}-${index}`}>
                <Image
                  src={image}
                  alt={`${product.name[locale]} ${index + 1}`}
                  fill
                  className="art-image"
                  sizes="(max-width: 760px) 100vw, 16vw"
                />
              </div>
            ))}
          </div>
        </ViewportReveal>

        <ViewportReveal className="detail-copy" delay={120}>
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
              href={getWhatsAppUrl(orderMessage)}
              target="_blank"
              rel="noreferrer"
            >
              {dictionary.ui.whatsapp}
            </a>
            <a
              className="button-secondary"
              href={socialLinks.telegram}
              target="_blank"
              rel="noreferrer"
            >
              {dictionary.ui.telegram}
            </a>
          </div>
          <p className="detail-note">{dictionary.cta.contactOrder}</p>
        </ViewportReveal>
      </div>
    </section>
  );
}