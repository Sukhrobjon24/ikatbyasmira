"use client";

import { useState, type ReactNode } from "react";
import { useSiteContent } from "@/components/content-provider";
import { ViewportReveal } from "@/components/viewport-reveal";
import type { ContentKind } from "@/lib/content-store";
import type { Dictionary } from "@/lib/i18n";
import type { CollectionVideo, GalleryItem, NewsItem, Product } from "@/types/content";

const PRODUCT_SIZES = ["S", "M", "L", "XL"];

type AdminPageProps = {
  adminEmail: string;
};

type SiteContent = ReturnType<typeof useSiteContent>;
type ProductInput = Parameters<SiteContent["updateProduct"]>[1];
type GalleryItemInput = Parameters<SiteContent["updateGalleryItem"]>[1];
type NewsItemInput = Parameters<SiteContent["updateNewsItem"]>[1];
type CollectionVideoInput = Parameters<SiteContent["updateCollectionVideo"]>[1];

type FormStatus = { text: string; isError: boolean } | null;

function FormNote({ status }: { status: FormStatus }) {
  if (!status) {
    return null;
  }

  return <p className={status.isError ? "error-note" : "success-note"}>{status.text}</p>;
}

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
    updateCollectionVideo,
    updateGalleryItem,
    updateNewsItem,
    updateProduct,
  } = useSiteContent();
  const [productMessage, setProductMessage] = useState<FormStatus>(null);
  const [galleryMessage, setGalleryMessage] = useState<FormStatus>(null);
  const [newsMessage, setNewsMessage] = useState<FormStatus>(null);
  const [collectionMessage, setCollectionMessage] = useState<FormStatus>(null);
  const [deleteMessage, setDeleteMessage] = useState<FormStatus>(null);
  const [deletingId, setDeletingId] = useState("");
  const [productImage, setProductImage] = useState("");
  const [galleryImage, setGalleryImage] = useState("");
  const [newsImage, setNewsImage] = useState("");
  const [collectionCover, setCollectionCover] = useState("");
  const [loggingOut, setLoggingOut] = useState(false);

  const [editingProductId, setEditingProductId] = useState<string | null>(null);
  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);
  const [editingNewsId, setEditingNewsId] = useState<string | null>(null);
  const [editingCollectionId, setEditingCollectionId] = useState<string | null>(null);

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
                  colors: parseColors(String(formData.get("colors") || "")),
                  sizes: formData.getAll("sizes").map(String),
                  inStock: formData.get("inStock") === "on",
                });
                event.currentTarget.reset();
                setProductImage("");
                setProductMessage({ text: message, isError: false });
              } catch (error) {
                setProductMessage({
                  text: error instanceof Error ? error.message : "Unable to save product.",
                  isError: true,
                });
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
            <label>
              {dictionary.admin.colors}
              <input name="colors" placeholder={dictionary.admin.colorsHint} />
            </label>
            <SizeCheckboxGroup label={dictionary.admin.sizes} name="sizes" />
            <label className="toggle-field">
              <input name="inStock" type="checkbox" defaultChecked />
              {dictionary.admin.availability}: {dictionary.admin.inStock}
            </label>
            <button className="button-primary" type="submit">
              {dictionary.admin.addProduct}
            </button>
            <FormNote status={productMessage} />
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
                setGalleryMessage({ text: message, isError: false });
              } catch (error) {
                setGalleryMessage({
                  text: error instanceof Error ? error.message : "Unable to save gallery item.",
                  isError: true,
                });
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
            <FormNote status={galleryMessage} />
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
                setNewsMessage({ text: message, isError: false });
              } catch (error) {
                setNewsMessage({
                  text: error instanceof Error ? error.message : "Unable to save news post.",
                  isError: true,
                });
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
            <FormNote status={newsMessage} />
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
                setCollectionMessage({ text: message, isError: false });
              } catch (error) {
                setCollectionMessage({
                  text:
                    error instanceof Error
                      ? error.message
                      : "Unable to save collection video.",
                  isError: true,
                });
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
            <FormNote status={collectionMessage} />
          </form>
        </div>

        <div className="admin-manage">
          <div>
            <p className="section-kicker">{dictionary.admin.manageTitle}</p>
            <h2>{dictionary.admin.manageTitle}</h2>
            <p>{dictionary.admin.manageSubtitle}</p>
          </div>

          <FormNote status={deleteMessage} />

          <div className="admin-manage-grid">
            <AdminItemList
              deletingId={deletingId}
              dictionary={dictionary}
              editingId={editingGalleryId}
              items={content.gallery}
              kind="gallery"
              renderEditForm={(item) => (
                <GalleryEditForm
                  dictionary={dictionary}
                  item={item}
                  onCancel={() => setEditingGalleryId(null)}
                  onSave={async (id, input) => {
                    const message = await updateGalleryItem(id, input);
                    return message;
                  }}
                />
              )}
              title={dictionary.nav.gallery}
              getId={(item) => item.id}
              getLabel={(item) => item.title[locale]}
              getMeta={(item) => item.location[locale]}
              onDelete={handleDelete}
              onEdit={setEditingGalleryId}
            />
            <AdminItemList
              deletingId={deletingId}
              dictionary={dictionary}
              editingId={editingCollectionId}
              items={content.collections}
              kind="collections"
              renderEditForm={(item) => (
                <CollectionEditForm
                  dictionary={dictionary}
                  item={item}
                  onCancel={() => setEditingCollectionId(null)}
                  onSave={async (id, input) => {
                    const message = await updateCollectionVideo(id, input);
                    return message;
                  }}
                />
              )}
              title={dictionary.nav.collections}
              getId={(item) => item.id}
              getLabel={(item) => item.title[locale]}
              getMeta={(item) => item.date}
              onDelete={handleDelete}
              onEdit={setEditingCollectionId}
            />
            <AdminItemList
              deletingId={deletingId}
              dictionary={dictionary}
              editingId={editingProductId}
              items={content.products}
              kind="products"
              renderEditForm={(item) => (
                <ProductEditForm
                  dictionary={dictionary}
                  item={item}
                  onCancel={() => setEditingProductId(null)}
                  onSave={async (id, input) => {
                    const message = await updateProduct(id, input);
                    return message;
                  }}
                />
              )}
              title={dictionary.nav.catalog}
              getId={(item) => item.id}
              getLabel={(item) => item.name[locale]}
              getMeta={(item) => item.price}
              onDelete={handleDelete}
              onEdit={setEditingProductId}
            />
            <AdminItemList
              deletingId={deletingId}
              dictionary={dictionary}
              editingId={editingNewsId}
              items={content.news}
              kind="news"
              renderEditForm={(item) => (
                <NewsEditForm
                  dictionary={dictionary}
                  item={item}
                  onCancel={() => setEditingNewsId(null)}
                  onSave={async (id, input) => {
                    const message = await updateNewsItem(id, input);
                    return message;
                  }}
                />
              )}
              title={dictionary.nav.news}
              getId={(item) => item.id}
              getLabel={(item) => item.title[locale]}
              getMeta={(item) => item.date}
              onDelete={handleDelete}
              onEdit={setEditingNewsId}
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

    setDeleteMessage(null);
    setDeletingId(id);

    try {
      const message = await deleteContentItem(kind, id);
      setDeleteMessage({ text: message, isError: false });
    } catch (error) {
      setDeleteMessage({
        text: error instanceof Error ? error.message : "Unable to delete item.",
        isError: true,
      });
    } finally {
      setDeletingId("");
    }
  }
}

function parseColors(value: string) {
  return value
    .split(",")
    .map((color) => color.trim())
    .filter(Boolean);
}

function SizeCheckboxGroup({
  label,
  name,
  defaultValue = [],
}: {
  label: string;
  name: string;
  defaultValue?: string[];
}) {
  return (
    <label>
      {label}
      <span className="checkbox-group">
        {PRODUCT_SIZES.map((size) => (
          <span className="checkbox-pill" key={size}>
            <input
              defaultChecked={defaultValue.includes(size)}
              name={name}
              type="checkbox"
              value={size}
            />
            {size}
          </span>
        ))}
      </span>
    </label>
  );
}

type AdminItemListProps<T> = {
  deletingId: string;
  dictionary: Dictionary;
  editingId: string | null;
  items: T[];
  kind: ContentKind;
  title: string;
  getId: (item: T) => string;
  getLabel: (item: T) => string;
  getMeta: (item: T) => string;
  onDelete: (kind: ContentKind, id: string, label: string) => void;
  onEdit: (id: string | null) => void;
  renderEditForm: (item: T) => ReactNode;
};

function AdminItemList<T>({
  deletingId,
  dictionary,
  editingId,
  items,
  kind,
  title,
  getId,
  getLabel,
  getMeta,
  onDelete,
  onEdit,
  renderEditForm,
}: AdminItemListProps<T>) {
  return (
    <section className="admin-delete-card">
      <h3>{title}</h3>
      <div className="admin-delete-list">
        {items.map((item) => {
          const id = getId(item);

          if (editingId === id) {
            return <div key={id}>{renderEditForm(item)}</div>;
          }

          const label = getLabel(item);

          return (
            <div className="admin-delete-row" key={id}>
              <div>
                <strong>{label}</strong>
                <span>{getMeta(item)}</span>
              </div>
              <div className="admin-row-actions">
                <button
                  className="button-edit"
                  disabled={deletingId === id}
                  type="button"
                  onClick={() => onEdit(id)}
                >
                  {dictionary.admin.edit}
                </button>
                <button
                  className="button-danger"
                  disabled={deletingId === id}
                  type="button"
                  onClick={() => onDelete(kind, id, label)}
                >
                  {deletingId === id ? dictionary.admin.deleting : dictionary.admin.delete}
                </button>
              </div>
            </div>
          );
        })}
        {items.length === 0 ? <p>{dictionary.admin.noItems}</p> : null}
      </div>
    </section>
  );
}

type EditFormProps<T, I> = {
  dictionary: Dictionary;
  item: T;
  onCancel: () => void;
  onSave: (id: string, input: I) => Promise<string>;
};

function ProductEditForm({
  dictionary,
  item,
  onCancel,
  onSave,
}: EditFormProps<Product, ProductInput>) {
  const [image, setImage] = useState(item.image);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<FormStatus>(null);

  return (
    <form
      className="admin-edit-card"
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setSaving(true);
        setStatus(null);

        try {
          const message = await onSave(item.id, {
            image,
            name: String(formData.get("name") || ""),
            category: String(formData.get("category") || ""),
            shortDescription: String(formData.get("shortDescription") || ""),
            description: String(formData.get("description") || ""),
            price: String(formData.get("price") || ""),
            colors: parseColors(String(formData.get("colors") || "")),
            sizes: formData.getAll("sizes").map(String),
            inStock: formData.get("inStock") === "on",
          });
          setStatus({ text: message, isError: false });
        } catch (error) {
          setStatus({
            text: error instanceof Error ? error.message : "Unable to update product.",
            isError: true,
          });
        } finally {
          setSaving(false);
        }
      }}
    >
      <input name="name" defaultValue={item.name.uz} placeholder={dictionary.admin.productName} required />
      <input name="category" defaultValue={item.category.uz} placeholder={dictionary.admin.category} required />
      <input name="price" defaultValue={item.price} placeholder={dictionary.admin.price} required />
      <UploadField
        accept="image/*"
        chooseFileLabel={dictionary.admin.chooseFile}
        kind="image"
        label={dictionary.admin.productImage}
        name="image"
        placeholder="/products/product-1.svg"
        uploadCompleteLabel={dictionary.admin.uploadComplete}
        uploadingLabel={dictionary.admin.uploading}
        value={image}
        onChange={setImage}
      />
      <textarea
        name="shortDescription"
        defaultValue={item.shortDescription.uz}
        placeholder={dictionary.admin.shortDesc}
        rows={3}
        required
      />
      <textarea
        name="description"
        defaultValue={item.description.uz}
        placeholder={dictionary.admin.description}
        rows={5}
        required
      />
      <label>
        {dictionary.admin.colors}
        <input name="colors" defaultValue={item.colors.join(", ")} placeholder={dictionary.admin.colorsHint} />
      </label>
      <SizeCheckboxGroup defaultValue={item.sizes} label={dictionary.admin.sizes} name="sizes" />
      <label className="toggle-field">
        <input name="inStock" type="checkbox" defaultChecked={item.inStock} />
        {dictionary.admin.availability}: {item.inStock ? dictionary.admin.inStock : dictionary.admin.outOfStock}
      </label>
      <div className="admin-edit-actions">
        <button className="button-primary" type="submit" disabled={saving}>
          {saving ? dictionary.admin.saving : dictionary.admin.save}
        </button>
        <button className="button-secondary" type="button" onClick={onCancel}>
          {dictionary.admin.cancel}
        </button>
      </div>
      <FormNote status={status} />
    </form>
  );
}

function GalleryEditForm({
  dictionary,
  item,
  onCancel,
  onSave,
}: EditFormProps<GalleryItem, GalleryItemInput>) {
  const [image, setImage] = useState(item.image);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<FormStatus>(null);

  return (
    <form
      className="admin-edit-card"
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setSaving(true);
        setStatus(null);

        try {
          const message = await onSave(item.id, {
            image,
            title: String(formData.get("title") || ""),
            location: String(formData.get("location") || ""),
            description: String(formData.get("description") || ""),
          });
          setStatus({ text: message, isError: false });
        } catch (error) {
          setStatus({
            text: error instanceof Error ? error.message : "Unable to update gallery item.",
            isError: true,
          });
        } finally {
          setSaving(false);
        }
      }}
    >
      <input name="title" defaultValue={item.title.uz} placeholder={dictionary.admin.galleryTitle} required />
      <input name="location" defaultValue={item.location.uz} placeholder={dictionary.admin.galleryLocation} required />
      <UploadField
        accept="image/*"
        chooseFileLabel={dictionary.admin.chooseFile}
        kind="image"
        label={dictionary.admin.galleryImage}
        name="image"
        placeholder="/gallery/gallery-1.svg"
        uploadCompleteLabel={dictionary.admin.uploadComplete}
        uploadingLabel={dictionary.admin.uploading}
        value={image}
        onChange={setImage}
      />
      <textarea
        name="description"
        defaultValue={item.description.uz}
        placeholder={dictionary.admin.description}
        rows={5}
        required
      />
      <div className="admin-edit-actions">
        <button className="button-primary" type="submit" disabled={saving}>
          {saving ? dictionary.admin.saving : dictionary.admin.save}
        </button>
        <button className="button-secondary" type="button" onClick={onCancel}>
          {dictionary.admin.cancel}
        </button>
      </div>
      <FormNote status={status} />
    </form>
  );
}

function NewsEditForm({
  dictionary,
  item,
  onCancel,
  onSave,
}: EditFormProps<NewsItem, NewsItemInput>) {
  const [image, setImage] = useState(item.cover);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<FormStatus>(null);

  return (
    <form
      className="admin-edit-card"
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setSaving(true);
        setStatus(null);

        try {
          const message = await onSave(item.id, {
            image,
            title: String(formData.get("title") || ""),
            excerpt: String(formData.get("excerpt") || ""),
            body: String(formData.get("body") || ""),
            date: String(formData.get("date") || item.date),
          });
          setStatus({ text: message, isError: false });
        } catch (error) {
          setStatus({
            text: error instanceof Error ? error.message : "Unable to update news post.",
            isError: true,
          });
        } finally {
          setSaving(false);
        }
      }}
    >
      <input name="title" defaultValue={item.title.uz} placeholder={dictionary.admin.newsTitle} required />
      <input aria-label={dictionary.admin.date} defaultValue={item.date} name="date" type="date" required />
      <UploadField
        accept="image/*"
        chooseFileLabel={dictionary.admin.chooseFile}
        kind="image"
        label={dictionary.admin.newsCover}
        name="image"
        placeholder="/news/news-1.svg"
        uploadCompleteLabel={dictionary.admin.uploadComplete}
        uploadingLabel={dictionary.admin.uploading}
        value={image}
        onChange={setImage}
      />
      <textarea name="excerpt" defaultValue={item.excerpt.uz} placeholder={dictionary.admin.excerpt} rows={3} required />
      <textarea name="body" defaultValue={item.body.uz} placeholder={dictionary.admin.articleText} rows={5} required />
      <div className="admin-edit-actions">
        <button className="button-primary" type="submit" disabled={saving}>
          {saving ? dictionary.admin.saving : dictionary.admin.save}
        </button>
        <button className="button-secondary" type="button" onClick={onCancel}>
          {dictionary.admin.cancel}
        </button>
      </div>
      <FormNote status={status} />
    </form>
  );
}

function CollectionEditForm({
  dictionary,
  item,
  onCancel,
  onSave,
}: EditFormProps<CollectionVideo, CollectionVideoInput>) {
  const [cover, setCover] = useState(item.cover);
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState<FormStatus>(null);

  return (
    <form
      className="admin-edit-card"
      onSubmit={async (event) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        setSaving(true);
        setStatus(null);

        try {
          const message = await onSave(item.id, {
            cover,
            videoUrl: String(formData.get("videoUrl") || ""),
            title: String(formData.get("title") || ""),
            description: String(formData.get("description") || ""),
            date: String(formData.get("date") || item.date),
          });
          setStatus({ text: message, isError: false });
        } catch (error) {
          setStatus({
            text:
              error instanceof Error
                ? error.message
                : "Unable to update collection video.",
            isError: true,
          });
        } finally {
          setSaving(false);
        }
      }}
    >
      <input name="title" defaultValue={item.title.uz} placeholder={dictionary.admin.collectionTitle} required />
      <input aria-label={dictionary.admin.date} defaultValue={item.date} name="date" type="date" required />
      <input name="videoUrl" defaultValue={item.videoUrl} placeholder={dictionary.admin.videoUrl} required />
      <UploadField
        accept="image/*"
        chooseFileLabel={dictionary.admin.chooseFile}
        kind="image"
        label={dictionary.admin.videoCover}
        name="cover"
        placeholder="/uploads/ikat/look-09.jpg"
        uploadCompleteLabel={dictionary.admin.uploadComplete}
        uploadingLabel={dictionary.admin.uploading}
        value={cover}
        onChange={setCover}
      />
      <textarea
        name="description"
        defaultValue={item.description.uz}
        placeholder={dictionary.admin.collectionDescription}
        rows={5}
        required
      />
      <div className="admin-edit-actions">
        <button className="button-primary" type="submit" disabled={saving}>
          {saving ? dictionary.admin.saving : dictionary.admin.save}
        </button>
        <button className="button-secondary" type="button" onClick={onCancel}>
          {dictionary.admin.cancel}
        </button>
      </div>
      <FormNote status={status} />
    </form>
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
