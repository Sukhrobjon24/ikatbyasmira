"use client";

import { useState } from "react";
import { useSiteContent } from "@/components/content-provider";
import { ViewportReveal } from "@/components/viewport-reveal";
import type { ContentKind } from "@/lib/content-store";

type AdminPageProps = {
  adminEmail: string;
};

export function AdminPage({ adminEmail }: AdminPageProps) {
  const {
    addCollectionVideo,
    addGalleryItem,
    addNewsItem,
    addProduct,
    content,
    deleteContentItem,
    dictionary,
    locale,
    mode,
  } = useSiteContent();
  const [productMessage, setProductMessage] = useState("");
  const [galleryMessage, setGalleryMessage] = useState("");
  const [newsMessage, setNewsMessage] = useState("");
  const [collectionMessage, setCollectionMessage] = useState("");
  const [deleteMessage, setDeleteMessage] = useState("");
  const [deletingId, setDeletingId] = useState("");
  const [productImage, setProductImage] = useState("");
  const [galleryImage, setGalleryImage] = useState("");
  const [newsImage, setNewsImage] = useState("");
  const [collectionCover, setCollectionCover] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  return (
    <section className="section page-intro">
      <ViewportReveal className="container narrow-stack">
        <div className="admin-heading">
          <div>
            <p className="section-kicker">{dictionary.nav.admin}</p>
            <h1>{dictionary.admin.title}</h1>
            <p className="lead-text">{dictionary.admin.subtitle}</p>
          </div>
          <button
            className="button-secondary"
            type="button"
            disabled={loggingOut}
            onClick={async () => {
              setLoggingOut(true);
              await fetch("/api/admin/logout", { method: "POST" });
              window.location.href = `/${locale}/admin/login`;
            }}
          >
            {loggingOut ? dictionary.ui.logout : dictionary.admin.logout}
          </button>
        </div>

        <p className="admin-note">
          {mode === "supabase"
            ? `${dictionary.admin.liveMode}: ${adminEmail}`
            : mode === "supabase-readonly"
              ? dictionary.admin.readOnly
              : dictionary.admin.note}
        </p>

        <div className="admin-grid">
          <form
            className="admin-card"
            onSubmit={async (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              try {
                const message = await addProduct({
                  image: String(formData.get("image") || ""),
                  name: String(formData.get("name") || ""),
                  category: String(formData.get("category") || ""),
                  shortDescription: String(formData.get("shortDescription") || ""),
                  description: String(formData.get("description") || ""),
                  price: String(formData.get("price") || ""),
                });
                event.currentTarget.reset();
                setProductImage("");
                setProductMessage(message);
              } catch (error) {
                setProductMessage(
                  error instanceof Error ? error.message : "Unable to save product.",
                );
              }
            }}
          >
            <h2>{dictionary.admin.addProduct}</h2>
            <input name="name" placeholder={dictionary.admin.productName} required />
            <input name="category" placeholder={dictionary.admin.category} required />
            <input name="price" placeholder={dictionary.admin.price} required />
            <UploadField
              accept="image/*"
              chooseFileLabel={dictionary.admin.chooseFile}
              kind="image"
              label={dictionary.admin.productImage}
              name="image"
              placeholder="/products/product-1.svg"
              uploadCompleteLabel={dictionary.admin.uploadComplete}
              uploadingLabel={dictionary.admin.uploading}
              value={productImage}
              onChange={setProductImage}
            />
            <textarea
              name="shortDescription"
              placeholder={dictionary.admin.shortDesc}
              rows={3}
              required
            />
            <textarea
              name="description"
              placeholder={dictionary.admin.description}
              rows={5}
              required
            />
            <button className="button-primary" type="submit">
              {dictionary.admin.addProduct}
            </button>
            {productMessage ? <p className="success-note">{productMessage}</p> : null}
          </form>

          <form
            className="admin-card"
            onSubmit={async (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              try {
                const message = await addGalleryItem({
                  image: String(formData.get("image") || ""),
                  title: String(formData.get("title") || ""),
                  location: String(formData.get("location") || ""),
                  description: String(formData.get("description") || ""),
                });
                event.currentTarget.reset();
                setGalleryImage("");
                setGalleryMessage(message);
              } catch (error) {
                setGalleryMessage(
                  error instanceof Error
                    ? error.message
                    : "Unable to save gallery item.",
                );
              }
            }}
          >
            <h2>{dictionary.admin.addGallery}</h2>
            <input name="title" placeholder={dictionary.admin.galleryTitle} required />
            <input name="location" placeholder={dictionary.admin.galleryLocation} required />
            <UploadField
              accept="image/*"
              chooseFileLabel={dictionary.admin.chooseFile}
              kind="image"
              label={dictionary.admin.galleryImage}
              name="image"
              placeholder="/gallery/gallery-1.svg"
              uploadCompleteLabel={dictionary.admin.uploadComplete}
              uploadingLabel={dictionary.admin.uploading}
              value={galleryImage}
              onChange={setGalleryImage}
            />
            <textarea
              name="description"
              placeholder={dictionary.admin.description}
              rows={5}
              required
            />
            <button className="button-primary" type="submit">
              {dictionary.admin.addGallery}
            </button>
            {galleryMessage ? <p className="success-note">{galleryMessage}</p> : null}
          </form>

          <form
            className="admin-card"
            onSubmit={async (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              try {
                const message = await addNewsItem({
                  image: String(formData.get("image") || ""),
                  title: String(formData.get("title") || ""),
                  excerpt: String(formData.get("excerpt") || ""),
                  body: String(formData.get("body") || ""),
                  date: String(
                    formData.get("date") || new Date().toISOString().slice(0, 10),
                  ),
                });
                event.currentTarget.reset();
                setNewsImage("");
                setNewsMessage(message);
              } catch (error) {
                setNewsMessage(
                  error instanceof Error ? error.message : "Unable to save news post.",
                );
              }
            }}
          >
            <h2>{dictionary.admin.addNews}</h2>
            <input name="title" placeholder={dictionary.admin.newsTitle} required />
            <input aria-label={dictionary.admin.date} name="date" type="date" required />
            <UploadField
              accept="image/*"
              chooseFileLabel={dictionary.admin.chooseFile}
              kind="image"
              label={dictionary.admin.newsCover}
              name="image"
              placeholder="/news/news-1.svg"
              uploadCompleteLabel={dictionary.admin.uploadComplete}
              uploadingLabel={dictionary.admin.uploading}
              value={newsImage}
              onChange={setNewsImage}
            />
            <textarea name="excerpt" placeholder={dictionary.admin.excerpt} rows={3} required />
            <textarea name="body" placeholder={dictionary.admin.articleText} rows={5} required />
            <button className="button-primary" type="submit">
              {dictionary.admin.addNews}
            </button>
            {newsMessage ? <p className="success-note">{newsMessage}</p> : null}
          </form>

          <form
            className="admin-card"
            onSubmit={async (event) => {
              event.preventDefault();
              const formData = new FormData(event.currentTarget);
              try {
                const message = await addCollectionVideo({
                  cover: String(formData.get("cover") || ""),
                  videoUrl: String(formData.get("videoUrl") || ""),
                  title: String(formData.get("title") || ""),
                  description: String(formData.get("description") || ""),
                  date: String(
                    formData.get("date") || new Date().toISOString().slice(0, 10),
                  ),
                });
                event.currentTarget.reset();
                setCollectionCover("");
                setCollectionMessage(message);
              } catch (error) {
                setCollectionMessage(
                  error instanceof Error
                    ? error.message
                    : "Unable to save collection video.",
                );
              }
            }}
          >
            <h2>{dictionary.admin.addCollection}</h2>
            <input name="title" placeholder={dictionary.admin.collectionTitle} required />
            <input aria-label={dictionary.admin.date} name="date" type="date" required />
            <input
              name="videoUrl"
              placeholder={dictionary.admin.videoUrl}
              required
            />
            <UploadField
              accept="image/*"
              chooseFileLabel={dictionary.admin.chooseFile}
              kind="image"
              label={dictionary.admin.videoCover}
              name="cover"
              placeholder="/uploads/ikat/look-09.jpg"
              uploadCompleteLabel={dictionary.admin.uploadComplete}
              uploadingLabel={dictionary.admin.uploading}
              value={collectionCover}
              onChange={setCollectionCover}
            />
            <textarea
              name="description"
              placeholder={dictionary.admin.collectionDescription}
              rows={5}
              required
            />
            <button className="button-primary" type="submit">
              {dictionary.admin.addCollection}
            </button>
            {collectionMessage ? <p className="success-note">{collectionMessage}</p> : null}
          </form>
        </div>

        <div className="admin-manage">
          <div>
            <p className="section-kicker">{dictionary.admin.manageTitle}</p>
            <h2>{dictionary.admin.manageTitle}</h2>
            <p>{dictionary.admin.manageSubtitle}</p>
          </div>

          {deleteMessage ? <p className="success-note">{deleteMessage}</p> : null}

          <div className="admin-manage-grid">
            <AdminDeleteList
              deleteLabel={dictionary.admin.delete}
              deletingId={deletingId}
              deletingLabel={dictionary.admin.deleting}
              items={content.gallery.map((item) => ({
                id: item.id,
                label: item.title[locale],
                meta: item.location[locale],
              }))}
              kind="gallery"
              noItemsLabel={dictionary.admin.noItems}
              title={dictionary.nav.gallery}
              onDelete={handleDelete}
            />
            <AdminDeleteList
              deleteLabel={dictionary.admin.delete}
              deletingId={deletingId}
              deletingLabel={dictionary.admin.deleting}
              items={content.collections.map((item) => ({
                id: item.id,
                label: item.title[locale],
                meta: item.date,
              }))}
              kind="collections"
              noItemsLabel={dictionary.admin.noItems}
              title={dictionary.nav.collections}
              onDelete={handleDelete}
            />
            <AdminDeleteList
              deleteLabel={dictionary.admin.delete}
              deletingId={deletingId}
              deletingLabel={dictionary.admin.deleting}
              items={content.products.map((item) => ({
                id: item.id,
                label: item.name[locale],
                meta: item.price,
              }))}
              kind="products"
              noItemsLabel={dictionary.admin.noItems}
              title={dictionary.nav.catalog}
              onDelete={handleDelete}
            />
            <AdminDeleteList
              deleteLabel={dictionary.admin.delete}
              deletingId={deletingId}
              deletingLabel={dictionary.admin.deleting}
              items={content.news.map((item) => ({
                id: item.id,
                label: item.title[locale],
                meta: item.date,
              }))}
              kind="news"
              noItemsLabel={dictionary.admin.noItems}
              title={dictionary.nav.news}
              onDelete={handleDelete}
            />
          </div>
        </div>
      </ViewportReveal>
    </section>
  );

  async function handleDelete(kind: ContentKind, id: string, label: string) {
    const confirmed = window.confirm(`Delete "${label}" from the site?`);

    if (!confirmed) {
      return;
    }

    setDeleteMessage("");
    setDeletingId(id);

    try {
      const message = await deleteContentItem(kind, id);
      setDeleteMessage(message);
    } catch (error) {
      setDeleteMessage(error instanceof Error ? error.message : "Unable to delete item.");
    } finally {
      setDeletingId("");
    }
  }
}

type AdminDeleteListProps = {
  deleteLabel: string;
  deletingId: string;
  deletingLabel: string;
  items: Array<{
    id: string;
    label: string;
    meta: string;
  }>;
  kind: ContentKind;
  noItemsLabel: string;
  title: string;
  onDelete: (kind: ContentKind, id: string, label: string) => void;
};

function AdminDeleteList({
  deleteLabel,
  deletingId,
  deletingLabel,
  items,
  kind,
  noItemsLabel,
  onDelete,
  title,
}: AdminDeleteListProps) {
  return (
    <section className="admin-delete-card">
      <h3>{title}</h3>
      <div className="admin-delete-list">
        {items.map((item) => (
          <div className="admin-delete-row" key={item.id}>
            <div>
              <strong>{item.label}</strong>
              <span>{item.meta}</span>
            </div>
            <button
              className="button-danger"
              disabled={deletingId === item.id}
              type="button"
              onClick={() => onDelete(kind, item.id, item.label)}
            >
              {deletingId === item.id ? deletingLabel : deleteLabel}
            </button>
          </div>
        ))}
        {items.length === 0 ? <p>{noItemsLabel}</p> : null}
      </div>
    </section>
  );
}

type UploadFieldProps = {
  accept: string;
  chooseFileLabel: string;
  kind: "image" | "video";
  label: string;
  name: string;
  placeholder: string;
  uploadCompleteLabel: string;
  uploadingLabel: string;
  value: string;
  required?: boolean;
  onChange: (value: string) => void;
};

function UploadField({
  accept,
  chooseFileLabel,
  kind,
  label,
  name,
  onChange,
  placeholder,
  required,
  uploadCompleteLabel,
  uploadingLabel,
  value,
}: UploadFieldProps) {
  const [message, setMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  return (
    <label className="upload-field">
      {label}
      <input
        name={name}
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={(event) => onChange(event.target.value)}
      />
      <span className="upload-control">
        <input
          accept={accept}
          type="file"
          onChange={async (event) => {
            const file = event.target.files?.[0];

            if (!file) {
              return;
            }

            setMessage("");
            setUploading(true);

            try {
              const publicUrl = await uploadAdminMedia(file, kind);
              onChange(publicUrl);
              setMessage(uploadCompleteLabel);
            } catch (error) {
              setMessage(error instanceof Error ? error.message : "Upload failed.");
            } finally {
              setUploading(false);
              event.target.value = "";
            }
          }}
        />
        <span>{uploading ? uploadingLabel : chooseFileLabel}</span>
      </span>
      {message ? <span className="upload-message">{message}</span> : null}
    </label>
  );
}

async function uploadAdminMedia(file: File, kind: "image" | "video") {
  const response = await fetch("/api/admin/upload", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      fileName: file.name,
      mimeType: file.type,
      size: file.size,
      kind,
    }),
  });

  const payload = (await response.json().catch(() => ({}))) as {
    bucket?: string;
    mode?: "local-demo";
    path?: string;
    token?: string;
    publicUrl?: string;
    message?: string;
  };

  if (response.status === 503) {
    return uploadLocalDemoMedia(file, kind);
  }

  if (response.ok && payload.mode === "local-demo" && payload.publicUrl) {
    return payload.publicUrl;
  }

  if (!response.ok || !payload.bucket || !payload.path || !payload.token || !payload.publicUrl) {
    throw new Error(payload.message ?? "Unable to prepare upload.");
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    throw new Error("Supabase public environment variables are missing.");
  }

  const { createClient } = await import("@supabase/supabase-js");
  const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  });

  const { error } = await supabase.storage
    .from(payload.bucket)
    .uploadToSignedUrl(payload.path, payload.token, file);

  if (error) {
    throw new Error(error.message);
  }

  return payload.publicUrl;
}

async function uploadLocalDemoMedia(file: File, kind: "image" | "video") {
  const formData = new FormData();
  formData.set("file", file);
  formData.set("kind", kind);

  const response = await fetch("/api/admin/upload", {
    method: "POST",
    body: formData,
  });

  const payload = (await response.json().catch(() => ({}))) as {
    publicUrl?: string;
    message?: string;
  };

  if (!response.ok || !payload.publicUrl) {
    throw new Error(payload.message ?? "Unable to upload file.");
  }

  return payload.publicUrl;
}
