import type {
  CollectionVideo,
  ContentState,
  GalleryItem,
  NewsItem,
  Product,
} from "@/types/content";

const STORAGE_KEY = "ikat-content-store";

export type ContentKind = "products" | "gallery" | "news" | "collections";

type DeletedContentIds = Partial<Record<ContentKind, string[]>>;
export type StoredContent = Partial<ContentState> & {
  deleted?: DeletedContentIds;
};

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function readStoredContent(): StoredContent {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return {};
    }

    return JSON.parse(raw) as StoredContent;
  } catch {
    return {};
  }
}

export function writeStoredContent(content: StoredContent) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
}

export function mergeContent(
  defaults: ContentState,
  stored: StoredContent,
): ContentState {
  const deleted = stored.deleted ?? {};

  return {
    products: [
      ...normalizeProducts(stored.products ?? []),
      ...defaults.products.filter((item) => !deleted.products?.includes(item.id)),
    ],
    gallery: [
      ...normalizeGallery(stored.gallery ?? []),
      ...defaults.gallery.filter((item) => !deleted.gallery?.includes(item.id)),
    ],
    news: [
      ...normalizeNews(stored.news ?? []),
      ...defaults.news.filter((item) => !deleted.news?.includes(item.id)),
    ],
    collections: [
      ...normalizeCollections(stored.collections ?? []),
      ...defaults.collections.filter((item) => !deleted.collections?.includes(item.id)),
    ],
  };
}

export function deleteStoredContentItem(stored: StoredContent, kind: ContentKind, id: string) {
  const currentItems = stored[kind] ?? [];
  const nextDeleted = {
    ...(stored.deleted ?? {}),
    [kind]: Array.from(new Set([...(stored.deleted?.[kind] ?? []), id])),
  };

  return {
    ...stored,
    [kind]: currentItems.filter((item) => item.id !== id),
    deleted: nextDeleted,
  };
}

export function createProduct(input: {
  image: string;
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  price: string;
}): Product {
  const name = input.name || "New IKAT Product";

  return {
    id: crypto.randomUUID(),
    slug: slugify(name) || crypto.randomUUID(),
    image: input.image || "/products/product-1.svg",
    name: {
      uz: name,
      ru: name,
      en: name,
    },
    category: {
      uz: input.category,
      ru: input.category,
      en: input.category,
    },
    shortDescription: {
      uz: input.shortDescription,
      ru: input.shortDescription,
      en: input.shortDescription,
    },
    description: {
      uz: input.description,
      ru: input.description,
      en: input.description,
    },
    price: input.price,
    tags: ["New", "Admin"],
  };
}

export function createGalleryItem(input: {
  image: string;
  title: string;
  location: string;
  description: string;
}): GalleryItem {
  return {
    id: crypto.randomUUID(),
    image: input.image || "/gallery/gallery-1.svg",
    title: {
      uz: input.title,
      ru: input.title,
      en: input.title,
    },
    location: {
      uz: input.location,
      ru: input.location,
      en: input.location,
    },
    description: {
      uz: input.description,
      ru: input.description,
      en: input.description,
    },
  };
}

export function createNewsItem(input: {
  image: string;
  title: string;
  excerpt: string;
  body: string;
  date: string;
}): NewsItem {
  const title = input.title || "IKAT update";

  return {
    id: crypto.randomUUID(),
    slug: slugify(title) || crypto.randomUUID(),
    cover: input.image || "/news/news-1.svg",
    date: input.date,
    title: {
      uz: title,
      ru: title,
      en: title,
    },
    excerpt: {
      uz: input.excerpt,
      ru: input.excerpt,
      en: input.excerpt,
    },
    body: {
      uz: input.body,
      ru: input.body,
      en: input.body,
    },
  };
}

export function createCollectionVideo(input: {
  cover: string;
  videoUrl: string;
  title: string;
  description: string;
  date: string;
}): CollectionVideo {
  const title = input.title || "New IKAT Collection";

  return {
    id: crypto.randomUUID(),
    slug: slugify(title) || crypto.randomUUID(),
    cover: input.cover || "/uploads/ikat/look-09.jpg",
    videoUrl: input.videoUrl,
    date: input.date,
    title: {
      uz: title,
      ru: title,
      en: title,
    },
    description: {
      uz: input.description,
      ru: input.description,
      en: input.description,
    },
  };
}

function normalizeProducts(products: Product[]): Product[] {
  return products.map((product) => ({
    ...product,
    name: pickLocales(product.name),
    category: pickLocales(product.category),
    shortDescription: pickLocales(product.shortDescription),
    description: pickLocales(product.description),
  }));
}

function normalizeGallery(items: GalleryItem[]): GalleryItem[] {
  return items.map((item) => ({
    ...item,
    title: pickLocales(item.title),
    location: pickLocales(item.location),
    description: pickLocales(item.description),
  }));
}

function normalizeNews(items: NewsItem[]): NewsItem[] {
  return items.map((item) => ({
    ...item,
    title: pickLocales(item.title),
    excerpt: pickLocales(item.excerpt),
    body: pickLocales(item.body),
  }));
}

function normalizeCollections(items: CollectionVideo[]): CollectionVideo[] {
  return items.map((item) => ({
    ...item,
    title: pickLocales(item.title),
    description: pickLocales(item.description),
  }));
}

function pickLocales(record: Record<string, string>) {
  const fallback = record.uz ?? record.en ?? record.ru ?? "";

  return {
    uz: record.uz ?? fallback,
    ru: record.ru ?? fallback,
    en: record.en ?? fallback,
  };
}
