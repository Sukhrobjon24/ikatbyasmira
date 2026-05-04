export type Locale = "uz" | "ru" | "en";

export type Product = {
  id: string;
  slug: string;
  image: string;
  name: Record<Locale, string>;
  category: Record<Locale, string>;
  shortDescription: Record<Locale, string>;
  description: Record<Locale, string>;
  price: string;
  tags: string[];
};

export type GalleryItem = {
  id: string;
  image: string;
  title: Record<Locale, string>;
  location: Record<Locale, string>;
  description: Record<Locale, string>;
};

export type NewsItem = {
  id: string;
  slug: string;
  cover: string;
  date: string;
  title: Record<Locale, string>;
  excerpt: Record<Locale, string>;
  body: Record<Locale, string>;
};

export type CollectionVideo = {
  id: string;
  slug: string;
  cover: string;
  videoUrl: string;
  date: string;
  title: Record<Locale, string>;
  description: Record<Locale, string>;
};

export type ContentState = {
  products: Product[];
  gallery: GalleryItem[];
  news: NewsItem[];
  collections: CollectionVideo[];
};
