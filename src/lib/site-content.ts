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
  colors: string[] | null;
  sizes: string[] | null;
  in_stock: boolean | null;
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

export async function getProductById(id: string): Promise<Product | null> {
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase.from("products").select("*").eq("id", id).maybeSingle();

  if (error || !data) {
    return null;
  }

  return mapProductRow(data as ProductRow);
}

export async function getGalleryItemById(id: string): Promise<GalleryItem | null> {
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from("gallery_items")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return mapGalleryRow(data as GalleryRow);
}

export async function getNewsItemById(id: string): Promise<NewsItem | null> {
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from("news_posts")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return mapNewsRow(data as NewsRow);
}

export async function getCollectionVideoById(id: string): Promise<CollectionVideo | null> {
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from("collection_videos")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error || !data) {
    return null;
  }

  return mapCollectionRow(data as CollectionRow);
}

export async function insertProduct(product: Product) {
  const supabase = createSupabaseServiceClient();

  const { error } = await supabase.from("products").insert(toProductRow(product));

  if (error) {
    throw error;
  }
}

export async function updateProductInSupabase(product: Product) {
  const supabase = createSupabaseServiceClient();

  const { data, error } = await supabase
    .from("products")
    .update(toProductRow(product))
    .eq("id", product.id)
    .select("id");

  if (error) {
    throw error;
  }

  if (!data.length) {
    throw new Error("Product was not found in Supabase.");
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

export async function updateGalleryItemInSupabase(item: GalleryItem) {
  const supabase = createSupabaseServiceClient();

  const { data, error } = await supabase
    .from("gallery_items")
    .update(toGalleryRow(item))
    .eq("id", item.id)
    .select("id");

  if (error) {
    throw error;
  }

  if (!data.length) {
    throw new Error("Gallery item was not found in Supabase.");
  }
}

export async function insertNewsItem(item: NewsItem) {
  const supabase = createSupabaseServiceClient();

  const { error } = await supabase.from("news_posts").insert(toNewsRow(item));

  if (error) {
    throw error;
  }
}

export async function updateNewsItemInSupabase(item: NewsItem) {
  const supabase = createSupabaseServiceClient();

  const { data, error } = await supabase
    .from("news_posts")
    .update(toNewsRow(item))
    .eq("id", item.id)
    .select("id");

  if (error) {
    throw error;
  }

  if (!data.length) {
    throw new Error("News post was not found in Supabase.");
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

export async function updateCollectionVideoInSupabase(item: CollectionVideo) {
  const supabase = createSupabaseServiceClient();

  const { data, error } = await supabase
    .from("collection_videos")
    .update(toCollectionRow(item))
    .eq("id", item.id)
    .select("id");

  if (error) {
    throw error;
  }

  if (!data.length) {
    throw new Error("Collection video was not found in Supabase.");
  }
}

export async function deleteProduct(id: string) {
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase.from("products").delete().eq("id", id).select("id");

  if (error) {
    throw error;
  }

  if (!data.length) {
    throw new Error("Product was not found in Supabase.");
  }
}

export async function deleteGalleryItem(id: string) {
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from("gallery_items")
    .delete()
    .eq("id", id)
    .select("id");

  if (error) {
    throw error;
  }

  if (!data.length) {
    throw new Error("Gallery item was not found in Supabase.");
  }
}

export async function deleteNewsItem(id: string) {
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from("news_posts")
    .delete()
    .eq("id", id)
    .select("id");

  if (error) {
    throw error;
  }

  if (!data.length) {
    throw new Error("News post was not found in Supabase.");
  }
}

export async function deleteCollectionVideo(id: string) {
  const supabase = createSupabaseServiceClient();
  const { data, error } = await supabase
    .from("collection_videos")
    .delete()
    .eq("id", id)
    .select("id");

  if (error) {
    throw error;
  }

  if (!data.length) {
    throw new Error("Collection video was not found in Supabase.");
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
    colors: row.colors ?? [],
    sizes: row.sizes ?? [],
    inStock: row.in_stock ?? true,
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
    colors: product.colors,
    sizes: product.sizes,
    in_stock: product.inStock,
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
