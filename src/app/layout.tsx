import type { Metadata } from "next";
import "./globals.css";

const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.ikatbyasmira.uz").replace(
  /\/$/,
  "",
);

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "IKAT by Asmira",
    template: "%s | IKAT by Asmira",
  },
  description:
    "IKAT by Asmira is a multilingual premium catalog for authentic Uzbek ikat fabrics, handmade silk, fashion collections, gallery stories, and client orders.",
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
    title: "IKAT by Asmira",
    description:
      "Authentic Uzbek ikat fabrics, handmade silk, premium collections, and cultural storytelling from IKAT by Asmira.",
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
