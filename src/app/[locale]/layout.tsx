import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentProvider } from "@/components/content-provider";
import { FloatingActions } from "@/components/floating-actions";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { dictionaries, locales } from "@/lib/i18n";
import { getSiteContent } from "@/lib/site-content";
import type { Locale } from "@/types/content";

const titles: Record<string, string> = {
  uz: "IKAT by Asmira | O'zbek qo'lda ishlangan ipak matosi | Samarqand",
  ru: "IKAT by Asmira | Узбекский шёлк ручной работы | Самарканд",
  en: "IKAT by Asmira | Handmade Uzbek Silk Fabric | Samarkand",
};

const descriptions: Record<string, string> = {
  uz: "Samarqand ustalaridan qo'lda ishlangan ikat ipak matosi. Premium o'zbek to'qimachilik san'ati — zamonaviy moda va interyer uchun.",
  ru: "Шёлковые ikat-ткани ручной работы от мастеров Самарканда. Премиум узбекское ткачество для современной моды и интерьера.",
  en: "Handwoven ikat silk fabrics from Samarkand masters. Premium Uzbek textile art for modern fashion and interior design.",
};

const keywords: Record<string, string> = {
  uz: "ikat, o'zbek matosi, ipak, Samarqand, qo'lda ishlangan, IKAT by Asmira, ikatbyasmira, o'zbek moda",
  ru: "икат, узбекская ткань, шёлк, Самарканд, ручная работа, IKAT by Asmira, узбекская мода",
  en: "ikat, uzbek fabric, silk, Samarkand, handmade, IKAT by Asmira, uzbek fashion, central asia textile",
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    return {};
  }

  const canonicalPath = `/${locale}`;
  const title = titles[locale] ?? titles["uz"];
  const description = descriptions[locale] ?? descriptions["uz"];

  return {
    title,
    description,
    keywords: keywords[locale] ?? keywords["uz"],
    alternates: {
      canonical: canonicalPath,
      languages: {
        uz: "/uz",
        ru: "/ru",
        en: "/en",
      },
    },
    openGraph: {
      title,
      description,
      url: canonicalPath,
      siteName: "IKAT by Asmira",
      locale: locale === "ru" ? "ru_RU" : locale === "uz" ? "uz_UZ" : "en_US",
      type: "website",
      images: [
        {
          url: "/uploads/ikat/look-09.jpg",
          width: 1200,
          height: 1600,
          alt: "IKAT premium silk collection",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/uploads/ikat/look-09.jpg"],
    },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: Readonly<{
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!locales.includes(locale as Locale)) {
    notFound();
  }

  const typedLocale = locale as Locale;
  const dictionary = dictionaries[typedLocale];
  const { content, mode } = await getSiteContent();

  return (
    <ContentProvider
      locale={typedLocale}
      dictionary={dictionary}
      initialContent={content}
      mode={mode}
    >
      <div className="page-shell">
        <SiteHeader />
        <main>{children}</main>
        <FloatingActions />
        <SiteFooter />
      </div>
    </ContentProvider>
  );
}
