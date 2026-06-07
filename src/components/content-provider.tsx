"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import {
  createCollectionVideo,
  createGalleryItem,
  createNewsItem,
  createProduct,
  deleteStoredContentItem,
  mergeContent,
  readStoredContent,
  replaceStoredContentItem,
  updateCollectionVideo,
  updateGalleryItem,
  updateNewsItem,
  updateProduct,
  writeStoredContent,
  type ContentKind,
} from "@/lib/content-store";
import type { Dictionary } from "@/lib/i18n";
import type {
  CollectionVideo,
  ContentState,
  GalleryItem,
  Locale,
  NewsItem,
  Product,
} from "@/types/content";

export type SiteMode = "demo" | "supabase-readonly" | "supabase";

type ContentContextValue = {
  locale: Locale;
  dictionary: Dictionary;
  mode: SiteMode;
  content: ContentState;
  addProduct: (input: Parameters<typeof createProduct>[0]) => Promise<string>;
  addGalleryItem: (input: Parameters<typeof createGalleryItem>[0]) => Promise<string>;
  addNewsItem: (input: Parameters<typeof createNewsItem>[0]) => Promise<string>;
  addCollectionVideo: (
    input: Parameters<typeof createCollectionVideo>[0],
  ) => Promise<string>;
  updateProduct: (id: string, input: Parameters<typeof createProduct>[0]) => Promise<string>;
  updateGalleryItem: (
    id: string,
    input: Parameters<typeof createGalleryItem>[0],
  ) => Promise<string>;
  updateNewsItem: (id: string, input: Parameters<typeof createNewsItem>[0]) => Promise<string>;
  updateCollectionVideo: (
    id: string,
    input: Parameters<typeof createCollectionVideo>[0],
  ) => Promise<string>;
  deleteContentItem: (kind: ContentKind, id: string) => Promise<string>;
};

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({
  children,
  locale,
  dictionary,
  initialContent,
  mode,
}: {
  children: ReactNode;
  locale: Locale;
  dictionary: Dictionary;
  initialContent: ContentState;
  mode: SiteMode;
}) {
  const [content, setContent] = useState<ContentState>(() =>
    mode === "demo"
      ? mergeContent(initialContent, readStoredContent())
      : initialContent,
  );

  const value: ContentContextValue = {
    locale,
    dictionary,
    mode,
    content,
    async addProduct(input) {
      if (mode === "supabase-readonly") {
        throw new Error(
          "Supabase read mode is enabled, but write access is not configured yet.",
        );
      }

      let item = createProduct(input);

      if (mode === "supabase") {
        const response = await fetch("/api/admin/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        });

        if (!response.ok) {
          const payload = (await response.json()) as { message?: string };
          throw new Error(payload.message ?? "Unable to save product.");
        }

        const payload = (await response.json()) as { item?: Product };
        if (payload.item) {
          item = payload.item;
        }
      }

      setContent((current) => ({
        ...current,
        products: [item, ...current.products],
      }));

      if (mode === "demo") {
        const stored = readStoredContent();
        writeStoredContent({
          products: [item, ...(stored.products ?? [])],
          gallery: stored.gallery ?? [],
          news: stored.news ?? [],
          collections: stored.collections ?? [],
          deleted: stored.deleted ?? {},
        });
      }

      return mode === "supabase"
        ? "Product saved to Supabase."
        : "Product added to local demo content.";
    },
    async addGalleryItem(input) {
      if (mode === "supabase-readonly") {
        throw new Error(
          "Supabase read mode is enabled, but write access is not configured yet.",
        );
      }

      let item = createGalleryItem(input);

      if (mode === "supabase") {
        const response = await fetch("/api/admin/gallery", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        });

        if (!response.ok) {
          const payload = (await response.json()) as { message?: string };
          throw new Error(payload.message ?? "Unable to save gallery item.");
        }

        const payload = (await response.json()) as { item?: GalleryItem };
        if (payload.item) {
          item = payload.item;
        }
      }

      setContent((current) => ({
        ...current,
        gallery: [item, ...current.gallery],
      }));

      if (mode === "demo") {
        const stored = readStoredContent();
        writeStoredContent({
          products: stored.products ?? [],
          gallery: [item, ...(stored.gallery ?? [])],
          news: stored.news ?? [],
          collections: stored.collections ?? [],
          deleted: stored.deleted ?? {},
        });
      }

      return mode === "supabase"
        ? "Gallery item saved to Supabase."
        : "Gallery item added to local demo content.";
    },
    async addNewsItem(input) {
      if (mode === "supabase-readonly") {
        throw new Error(
          "Supabase read mode is enabled, but write access is not configured yet.",
        );
      }

      let item = createNewsItem(input);

      if (mode === "supabase") {
        const response = await fetch("/api/admin/news", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        });

        if (!response.ok) {
          const payload = (await response.json()) as { message?: string };
          throw new Error(payload.message ?? "Unable to save news post.");
        }

        const payload = (await response.json()) as { item?: NewsItem };
        if (payload.item) {
          item = payload.item;
        }
      }

      setContent((current) => ({
        ...current,
        news: [item, ...current.news],
      }));

      if (mode === "demo") {
        const stored = readStoredContent();
        writeStoredContent({
          products: stored.products ?? [],
          gallery: stored.gallery ?? [],
          news: [item, ...(stored.news ?? [])],
          collections: stored.collections ?? [],
          deleted: stored.deleted ?? {},
        });
      }

      return mode === "supabase"
        ? "News post saved to Supabase."
        : "News post added to local demo content.";
    },
    async addCollectionVideo(input) {
      if (mode === "supabase-readonly") {
        throw new Error(
          "Supabase read mode is enabled, but write access is not configured yet.",
        );
      }

      let item = createCollectionVideo(input);

      if (mode === "supabase") {
        const response = await fetch("/api/admin/collections", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(input),
        });

        if (!response.ok) {
          const payload = (await response.json()) as { message?: string };
          throw new Error(payload.message ?? "Unable to save collection video.");
        }

        const payload = (await response.json()) as { item?: CollectionVideo };
        if (payload.item) {
          item = payload.item;
        }
      }

      setContent((current) => ({
        ...current,
        collections: [item, ...current.collections],
      }));

      if (mode === "demo") {
        const stored = readStoredContent();
        writeStoredContent({
          products: stored.products ?? [],
          gallery: stored.gallery ?? [],
          news: stored.news ?? [],
          collections: [item, ...(stored.collections ?? [])],
          deleted: stored.deleted ?? {},
        });
      }

      return mode === "supabase"
        ? "Collection video saved to Supabase."
        : "Collection video added to local demo content.";
    },
    async updateProduct(id, input) {
      if (mode === "supabase-readonly") {
        throw new Error(
          "Supabase read mode is enabled, but write access is not configured yet.",
        );
      }

      const existing = content.products.find((product) => product.id === id);

      if (!existing) {
        throw new Error("Product was not found.");
      }

      let item = updateProduct(existing, input);

      if (mode === "supabase") {
        const response = await fetch("/api/admin/products", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, ...input }),
        });

        if (!response.ok) {
          const payload = (await response.json()) as { message?: string };
          throw new Error(payload.message ?? "Unable to update product.");
        }

        const payload = (await response.json()) as { item?: Product };
        if (payload.item) {
          item = payload.item;
        }
      }

      setContent((current) => ({
        ...current,
        products: current.products.map((product) => (product.id === id ? item : product)),
      }));

      if (mode === "demo") {
        writeStoredContent(replaceStoredContentItem(readStoredContent(), "products", item));
      }

      return mode === "supabase"
        ? "Product updated in Supabase."
        : "Product updated in local demo content.";
    },
    async updateGalleryItem(id, input) {
      if (mode === "supabase-readonly") {
        throw new Error(
          "Supabase read mode is enabled, but write access is not configured yet.",
        );
      }

      const existing = content.gallery.find((item) => item.id === id);

      if (!existing) {
        throw new Error("Gallery item was not found.");
      }

      let item = updateGalleryItem(existing, input);

      if (mode === "supabase") {
        const response = await fetch("/api/admin/gallery", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, ...input }),
        });

        if (!response.ok) {
          const payload = (await response.json()) as { message?: string };
          throw new Error(payload.message ?? "Unable to update gallery item.");
        }

        const payload = (await response.json()) as { item?: GalleryItem };
        if (payload.item) {
          item = payload.item;
        }
      }

      setContent((current) => ({
        ...current,
        gallery: current.gallery.map((galleryItem) =>
          galleryItem.id === id ? item : galleryItem,
        ),
      }));

      if (mode === "demo") {
        writeStoredContent(replaceStoredContentItem(readStoredContent(), "gallery", item));
      }

      return mode === "supabase"
        ? "Gallery item updated in Supabase."
        : "Gallery item updated in local demo content.";
    },
    async updateNewsItem(id, input) {
      if (mode === "supabase-readonly") {
        throw new Error(
          "Supabase read mode is enabled, but write access is not configured yet.",
        );
      }

      const existing = content.news.find((item) => item.id === id);

      if (!existing) {
        throw new Error("News post was not found.");
      }

      let item = updateNewsItem(existing, input);

      if (mode === "supabase") {
        const response = await fetch("/api/admin/news", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, ...input }),
        });

        if (!response.ok) {
          const payload = (await response.json()) as { message?: string };
          throw new Error(payload.message ?? "Unable to update news post.");
        }

        const payload = (await response.json()) as { item?: NewsItem };
        if (payload.item) {
          item = payload.item;
        }
      }

      setContent((current) => ({
        ...current,
        news: current.news.map((newsItem) => (newsItem.id === id ? item : newsItem)),
      }));

      if (mode === "demo") {
        writeStoredContent(replaceStoredContentItem(readStoredContent(), "news", item));
      }

      return mode === "supabase"
        ? "News post updated in Supabase."
        : "News post updated in local demo content.";
    },
    async updateCollectionVideo(id, input) {
      if (mode === "supabase-readonly") {
        throw new Error(
          "Supabase read mode is enabled, but write access is not configured yet.",
        );
      }

      const existing = content.collections.find((item) => item.id === id);

      if (!existing) {
        throw new Error("Collection video was not found.");
      }

      let item = updateCollectionVideo(existing, input);

      if (mode === "supabase") {
        const response = await fetch("/api/admin/collections", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id, ...input }),
        });

        if (!response.ok) {
          const payload = (await response.json()) as { message?: string };
          throw new Error(payload.message ?? "Unable to update collection video.");
        }

        const payload = (await response.json()) as { item?: CollectionVideo };
        if (payload.item) {
          item = payload.item;
        }
      }

      setContent((current) => ({
        ...current,
        collections: current.collections.map((collectionItem) =>
          collectionItem.id === id ? item : collectionItem,
        ),
      }));

      if (mode === "demo") {
        writeStoredContent(replaceStoredContentItem(readStoredContent(), "collections", item));
      }

      return mode === "supabase"
        ? "Collection video updated in Supabase."
        : "Collection video updated in local demo content.";
    },
    async deleteContentItem(kind, id) {
      if (mode === "supabase-readonly") {
        throw new Error(
          "Supabase read mode is enabled, but write access is not configured yet.",
        );
      }

      if (mode === "supabase") {
        const endpoint = {
          products: "/api/admin/products",
          gallery: "/api/admin/gallery",
          news: "/api/admin/news",
          collections: "/api/admin/collections",
        }[kind];

        const response = await fetch(endpoint, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ id }),
        });

        if (!response.ok) {
          const payload = (await response.json()) as { message?: string };
          throw new Error(payload.message ?? "Unable to delete item.");
        }
      }

      setContent((current) => ({
        ...current,
        [kind]: current[kind].filter((item) => item.id !== id),
      }));

      if (mode === "demo") {
        writeStoredContent(deleteStoredContentItem(readStoredContent(), kind, id));
      }

      return mode === "supabase"
        ? "Item deleted from Supabase."
        : "Item hidden from local demo content.";
    },
  };

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useSiteContent() {
  const context = useContext(ContentContext);

  if (!context) {
    throw new Error("useSiteContent must be used inside ContentProvider");
  }

  return context;
}
