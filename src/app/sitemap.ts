import { MetadataRoute } from "next";

const BASE_URL = "https://www.ikatbyasmira.uz";
const locales = ["uz", "ru", "en"];

const staticPages = [
  "",
  "/about",
  "/catalog",
  "/collections",
  "/gallery",
  "/news",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const locale of locales) {
    for (const page of staticPages) {
      entries.push({
        url: `${BASE_URL}/${locale}${page}`,
        lastModified: new Date(),
        changeFrequency: page === "" ? "weekly" : "monthly",
        priority: page === "" ? 1.0 : 0.8,
      });
    }
  }

  return entries;
}