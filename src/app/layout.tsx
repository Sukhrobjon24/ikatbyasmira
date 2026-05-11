import type { Metadata } from "next";
import "./globals.css";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ikatbyasmira.uz").replace(
  /\/$/,
  "",
);

export const dynamic = "force-dynamic";
export const revalidate = 0;

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full scroll-smooth">
      <body className="min-h-full">{children}</body>
    </html>
  );
}
