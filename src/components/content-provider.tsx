"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
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

type ContentContextValue = {
  locale: Locale;
  dictionary: Dictionary;
  content: ContentState;
  addProduct: (input: Parameters<typeof createProduct>[0]) => void;
  addGalleryItem: (input: Parameters<typeof createGalleryItem>[0]) => void;
  addNewsItem: (input: Parameters<typeof createNewsItem>[0]) => void;
};

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({
  children,
  locale,
  dictionary,
  initialContent,
}: {
  children: ReactNode;
  locale: Locale;
  dictionary: Dictionary;
  initialContent: ContentState;
}) {
  const [storedContent, setStoredContent] = useState<Partial<ContentState>>({});

  useEffect(() => {
    setStoredContent(readStoredContent());
  }, []);

  const content = useMemo(
    () => mergeContent(initialContent, storedContent),
    [initialContent, storedContent],
  );

  const value = useMemo<ContentContextValue>(
    () => ({
      locale,
      dictionary,
      content,
      addProduct(input) {
        setStoredContent((current) => {
          const next = {
            ...current,
            products: [createProduct(input), ...(current.products ?? [])],
          };

          writeStoredContent(next);
          return next;
        });
      },
      addGalleryItem(input) {
        setStoredContent((current) => {
          const next = {
            ...current,
            gallery: [createGalleryItem(input), ...(current.gallery ?? [])],
          };

          writeStoredContent(next);
          return next;
        });
      },
      addNewsItem(input) {
        setStoredContent((current) => {
          const next = {
            ...current,
            news: [createNewsItem(input), ...(current.news ?? [])],
          };

          writeStoredContent(next);
          return next;
        });
      },
    }),
    [content, dictionary, locale],
  );

  return <ContentContext.Provider value={value}>{children}</ContentContext.Provider>;
}

export function useSiteContent() {
  const context = useContext(ContentContext);

  if (!context) {
    throw new Error("useSiteContent must be used inside ContentProvider");
  }

  return context;
}
