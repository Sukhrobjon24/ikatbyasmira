import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ikatbyasmira.uz").replace(
    /\/$/,
    "",
  );

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/uz/admin", "/ru/admin", "/en/admin"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
