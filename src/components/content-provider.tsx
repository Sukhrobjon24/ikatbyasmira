"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import {
  createGalleryItem,
  createNewsItem,
  createProduct,
  mergeContent,
  readStoredContent,
  writeStoredContent,
} from "@/lib/content-store";
import type { Dictionary } from "@/lib/i18n";
import type { ContentState, Locale } from "@/types/content";

export type SiteMode = "demo" | "supabase-readonly" | "supabase";

type ContentContextValue = {
  locale: Locale;
  dictionary: Dictionary;
  mode: SiteMode;
  content: ContentState;
  addProduct: (input: Parameters<typeof createProduct>[0]) => Promise<string>;
  addGalleryItem: (input: Parameters<typeof createGalleryItem>[0]) => Promise<string>;
  addNewsItem: (input: Parameters<typeof createNewsItem>[0]) => Promise<string>;
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

      const item = createProduct(input);

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

      const item = createGalleryItem(input);

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

      const item = createNewsItem(input);

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
        });
      }

      return mode === "supabase"
        ? "News post saved to Supabase."
        : "News post added to local demo content.";
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
