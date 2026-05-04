import { initialContent } from "@/data/site";
import { isSupabaseConfigured, isSupabaseWriteConfigured } from "@/lib/env";
import { createSupabasePublicClient, createSupabaseServiceClient } from "@/lib/supabase";
import type {
  CollectionVideo,
  ContentState,
  GalleryItem,
  Locale,
  NewsItem,
  Product,
} from "@/types/content";

type SiteMode = "demo" | "supabase-readonly" | "supabase";

type LocalizedRecord = Record<Locale, string>;

type ProductRow = {
  id: string;
  slug: string;
  image: string;
  name: LocalizedRecord;
  category: LocalizedRecord;
  short_description: LocalizedRecord;
  description: LocalizedRecord;
  price: string;
  tags: string[] | null;
};

type GalleryRow = {
  id: string;
  image: string;
  title: LocalizedRecord;
  location: LocalizedRecord;
  description: LocalizedRecord;
};

type NewsRow = {
  id: string;
  slug: string;
  cover: string;
  date: string;
  title: LocalizedRecord;
  excerpt: LocalizedRecord;
  body: LocalizedRecord;
};

type CollectionRow = {
  id: string;
  slug: string;
  cover: string;
  video_url: string;
  date: string;
  title: LocalizedRecord;
  description: LocalizedRecord;
};

export async function getSiteContent(): Promise<{
  content: ContentState;
  mode: SiteMode;
}> {
  if (!isSupabaseConfigured) {
    return {
      content: initialContent,
      mode: "demo",
    };
  }

  try {
    const supabase = createSupabasePublicClient();
    const [productsResult, galleryResult, newsResult] = await Promise.all([
      supabase.from("products").select("*").order("created_at", { ascending: false }),
      supabase
        .from("gallery_items")
        .select("*")
        .order("created_at", { ascending: false }),
      supabase.from("news_posts").select("*").order("date", { ascending: false }),
    ]);

    const collectionsResult = await supabase
      .from("collection_videos")
      .select("*")
      .order("date", { ascending: false });

    if (productsResult.error || galleryResult.error || newsResult.error) {
      throw new Error("Supabase content fetch failed.");
    }

    return {
      content: {
        products: (productsResult.data ?? []).map(mapProductRow),
        gallery: (galleryResult.data ?? []).map(mapGalleryRow),
        news: (newsResult.data ?? []).map(mapNewsRow),
        collections: collectionsResult.error
          ? initialContent.collections
          : (collectionsResult.data ?? []).map(mapCollectionRow),
      },
      mode: isSupabaseWriteConfigured ? "supabase" : "supabase-readonly",
    };
  } catch {
    return {
      content: initialContent,
      mode: "demo",
    };
  }
}

export async function insertProduct(product: Product) {
  const supabase = createSupabaseServiceClient();

  const { error } = await supabase.from("products").insert(toProductRow(product));

  if (error) {
    throw error;
  }
}

export async function insertGalleryItem(item: GalleryItem) {
  const supabase = createSupabaseServiceClient();

  const { error } = await supabase
    .from("gallery_items")
    .insert(toGalleryRow(item));

  if (error) {
    throw error;
  }
}

export async function insertNewsItem(item: NewsItem) {
  const supabase = createSupabaseServiceClient();

  const { error } = await supabase.from("news_posts").insert(toNewsRow(item));

  if (error) {
    throw error;
  }
}

export async function insertCollectionVideo(item: CollectionVideo) {
  const supabase = createSupabaseServiceClient();

  const { error } = await supabase
    .from("collection_videos")
    .insert(toCollectionRow(item));

  if (error) {
    throw error;
  }
}

function mapProductRow(row: ProductRow): Product {
  return {
    id: row.id,
    slug: row.slug,
    image: row.image,
    name: row.name,
    category: row.category,
    shortDescription: row.short_description,
    description: row.description,
    price: row.price,
    tags: row.tags ?? [],
  };
}

function mapGalleryRow(row: GalleryRow): GalleryItem {
  return {
    id: row.id,
    image: row.image,
    title: row.title,
    location: row.location,
    description: row.description,
  };
}

function mapNewsRow(row: NewsRow): NewsItem {
  return {
    id: row.id,
    slug: row.slug,
    cover: row.cover,
    date: row.date,
    title: row.title,
    excerpt: row.excerpt,
    body: row.body,
  };
}

function mapCollectionRow(row: CollectionRow): CollectionVideo {
  return {
    id: row.id,
    slug: row.slug,
    cover: row.cover,
    videoUrl: row.video_url,
    date: row.date,
    title: row.title,
    description: row.description,
  };
}

function toProductRow(product: Product) {
  return {
    id: product.id,
    slug: product.slug,
    image: product.image,
    name: product.name,
    category: product.category,
    short_description: product.shortDescription,
    description: product.description,
    price: product.price,
    tags: product.tags,
  };
}

function toGalleryRow(item: GalleryItem) {
  return {
    id: item.id,
    image: item.image,
    title: item.title,
    location: item.location,
    description: item.description,
  };
}

function toNewsRow(item: NewsItem) {
  return {
    id: item.id,
    slug: item.slug,
    cover: item.cover,
    date: item.date,
    title: item.title,
    excerpt: item.excerpt,
    body: item.body,
  };
}

function toCollectionRow(item: CollectionVideo) {
  return {
    id: item.id,
    slug: item.slug,
    cover: item.cover,
    video_url: item.videoUrl,
    date: item.date,
    title: item.title,
    description: item.description,
  };
}
