import type { Metadata } from "next";
import { headers } from "next/headers";
import { locales } from "@/lib/i18n";
import "./globals.css";

const defaultLocale = "uz";

async function resolveLocale() {
  const pathname = (await headers()).get("x-pathname") ?? "";
  const segment = pathname.split("/")[1];

  return (locales as readonly string[]).includes(segment) ? segment : defaultLocale;
}

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ikatbyasmira.uz").replace(
  /\/$/,
  "",
);

export const revalidate = 60;

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "IKAT by Asmira | Handmade Uzbek Silk | Samarkand",
  description:
    "Handwoven ikat silk fabrics from Samarkand. Premium Uzbek textile art for modern fashion and interior design.",
  keywords: [
    "IKAT by Asmira",
    "ikatbyasmira",
    "Uzbekistan",
    "ikat fabric",
    "handmade silk",
    "luxury textile",
    "Samarqand",
  ],
  openGraph: {
    title: "IKAT by Asmira | Handmade Uzbek Silk | Samarkand",
    description:
      "Handwoven ikat silk fabrics from Samarkand. Premium Uzbek textile art for modern fashion and interior design.",
    url: siteUrl,
    siteName: "IKAT by Asmira",
    locale: "en_US",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await resolveLocale();

  return (
    <html lang={locale} className="h-full scroll-smooth">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
