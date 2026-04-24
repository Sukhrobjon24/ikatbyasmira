import type { ContentState, GalleryItem, NewsItem, Product } from "@/types/content";

const STORAGE_KEY = "ikat-content-store";

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function readStoredContent(): Partial<ContentState> {
  if (typeof window === "undefined") {
    return {};
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);

    if (!raw) {
      return {};
    }

    return JSON.parse(raw) as Partial<ContentState>;
  } catch {
    return {};
  }
}

export function writeStoredContent(content: Partial<ContentState>) {
  if (typeof window === "undefined") {
    return;
  }

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
}

export function mergeContent(
  defaults: ContentState,
  stored: Partial<ContentState>,
): ContentState {
  return {
    products: [...(stored.products ?? []), ...defaults.products],
    gallery: [...(stored.gallery ?? []), ...defaults.gallery],
    news: [...(stored.news ?? []), ...defaults.news],
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
  return {
    id: crypto.randomUUID(),
    slug: slugify(input.name),
    image: input.image || "/products/product-1.svg",
    name: {
      uz: input.name,
      ru: input.name,
      en: input.name,
      tg: input.name,
    },
    category: {
      uz: input.category,
      ru: input.category,
      en: input.category,
      tg: input.category,
    },
    shortDescription: {
      uz: input.shortDescription,
      ru: input.shortDescription,
      en: input.shortDescription,
      tg: input.shortDescription,
    },
    description: {
      uz: input.description,
      ru: input.description,
      en: input.description,
      tg: input.description,
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
      tg: input.title,
    },
    location: {
      uz: input.location,
      ru: input.location,
      en: input.location,
      tg: input.location,
    },
    description: {
      uz: input.description,
      ru: input.description,
      en: input.description,
      tg: input.description,
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
  return {
    id: crypto.randomUUID(),
    slug: slugify(input.title),
    cover: input.image || "/news/news-1.svg",
    date: input.date,
    title: {
      uz: input.title,
      ru: input.title,
      en: input.title,
      tg: input.title,
    },
    excerpt: {
      uz: input.excerpt,
      ru: input.excerpt,
      en: input.excerpt,
      tg: input.excerpt,
    },
    body: {
      uz: input.body,
      ru: input.body,
      en: input.body,
      tg: input.body,
    },
  };
}
