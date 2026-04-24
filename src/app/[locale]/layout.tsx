import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentProvider } from "@/components/content-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { dictionaries, locales, type Locale } from "@/lib/i18n";
import { initialContent } from "@/data/site";

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

  const dictionary = dictionaries[locale as Locale];

  return {
    title: dictionary.meta.title,
    description: dictionary.meta.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        uz: "/uz",
        ru: "/ru",
        en: "/en",
        tg: "/tg",
      },
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

  return (
    <ContentProvider locale={typedLocale} dictionary={dictionary} initialContent={initialContent}>
      <div className="page-shell">
        <SiteHeader />
        <main>{children}</main>
        <SiteFooter />
      </div>
    </ContentProvider>
  );
}
