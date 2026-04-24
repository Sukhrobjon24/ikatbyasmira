"use client";

import { useState } from "react";
import { useSiteContent } from "@/components/content-provider";

export function AdminPage() {
  const { addGalleryItem, addNewsItem, addProduct, dictionary } = useSiteContent();
  const [productMessage, setProductMessage] = useState("");
  const [galleryMessage, setGalleryMessage] = useState("");
  const [newsMessage, setNewsMessage] = useState("");

  return (
    <section className="section page-intro">
      <div className="container narrow-stack">
        <p className="section-kicker">{dictionary.nav.admin}</p>
        <h1>{dictionary.admin.title}</h1>
        <p className="lead-text">{dictionary.admin.subtitle}</p>
        <p className="admin-note">{dictionary.admin.note}</p>

        <div className="admin-grid">
          <form
            className="admin-card"
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              addProduct({
                image: String(formData.get("image") || ""),
                name: String(formData.get("name") || ""),
                category: String(formData.get("category") || ""),
                shortDescription: String(formData.get("shortDescription") || ""),
                description: String(formData.get("description") || ""),
                price: String(formData.get("price") || ""),
              });
              event.currentTarget.reset();
              setProductMessage("Product added to local demo content.");
            }}
          >
            <h2>{dictionary.admin.products}</h2>
            <input name="name" placeholder="Product name" required />
            <input name="category" placeholder="Category" required />
            <input name="price" placeholder="$250" required />
            <input name="image" placeholder="/products/product-1.svg" />
            <textarea name="shortDescription" placeholder="Short description" rows={3} required />
            <textarea name="description" placeholder="Full description" rows={5} required />
            <button className="button-primary" type="submit">
              Save product
            </button>
            {productMessage ? <p className="success-note">{productMessage}</p> : null}
          </form>

          <form
            className="admin-card"
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              addGalleryItem({
                image: String(formData.get("image") || ""),
                title: String(formData.get("title") || ""),
                location: String(formData.get("location") || ""),
                description: String(formData.get("description") || ""),
              });
              event.currentTarget.reset();
              setGalleryMessage("Gallery item added to local demo content.");
            }}
          >
            <h2>{dictionary.admin.gallery}</h2>
            <input name="title" placeholder="Gallery title" required />
            <input name="location" placeholder="Samarkand" required />
            <input name="image" placeholder="/gallery/gallery-1.svg" />
            <textarea name="description" placeholder="Description" rows={5} required />
            <button className="button-primary" type="submit">
              Save gallery item
            </button>
            {galleryMessage ? <p className="success-note">{galleryMessage}</p> : null}
          </form>

          <form
            className="admin-card"
            onSubmit={(event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              addNewsItem({
                image: String(formData.get("image") || ""),
                title: String(formData.get("title") || ""),
                excerpt: String(formData.get("excerpt") || ""),
                body: String(formData.get("body") || ""),
                date: String(formData.get("date") || new Date().toISOString().slice(0, 10)),
              });
              event.currentTarget.reset();
              setNewsMessage("News post added to local demo content.");
            }}
          >
            <h2>{dictionary.admin.news}</h2>
            <input name="title" placeholder="News title" required />
            <input name="date" type="date" required />
            <input name="image" placeholder="/news/news-1.svg" />
            <textarea name="excerpt" placeholder="Short excerpt" rows={3} required />
            <textarea name="body" placeholder="Article text" rows={5} required />
            <button className="button-primary" type="submit">
              Save news
            </button>
            {newsMessage ? <p className="success-note">{newsMessage}</p> : null}
          </form>
        </div>
      </div>
    </section>
  );
}
