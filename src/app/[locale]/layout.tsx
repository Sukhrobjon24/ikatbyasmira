import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentProvider } from "@/components/content-provider";
import { FloatingActions } from "@/components/floating-actions";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { dictionaries, locales } from "@/lib/i18n";
import { getSiteContent } from "@/lib/site-content";
import type { Locale } from "@/types/content";

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
