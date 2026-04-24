import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://ikatbyasmira.uz"),
  title: {
    default: "IKAT",
    template: "%s | IKAT",
  },
  description:
    "Premium multilingual website for IKAT, celebrating authentic Uzbek silk heritage with modern luxury storytelling.",
  keywords: [
    "IKAT",
    "Uzbekistan",
    "ikat fabric",
    "handmade silk",
    "luxury textile",
    "Samarqand",
  ],
  openGraph: {
    title: "IKAT",
    description:
      "Authentic IKAT from Uzbekistan. Heritage craftsmanship, luxurious textiles, and cultural storytelling.",
    url: "https://ikatbyasmira.uz",
    siteName: "IKAT",
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
