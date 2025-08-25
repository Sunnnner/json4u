import "@/app/globals.css";
import { Toaster } from "@/components/ui/sonner";
import { GoogleAnalytics } from "@next/third-parties/google";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages, getTranslations } from "next-intl/server";
import { ThemeProvider } from "next-themes";

export async function generateMetadata() {
  const locale = await getLocale();
  const t = await getTranslations({ locale, namespace: "Metadata" });

  return {
    applicationName: t("name"),
    title: {
      default: t("title"),
      template: `%s | ${t("title")}`,
    },
    keywords: t("keywords"),
    description: t("description"),
    appleWebApp: {
      capable: true,
      statusBarStyle: "default",
      title: t("title"),
    },
    formatDetection: {
      telephone: false,
    },
  };
}

export default async function MainLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6579013241267492"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body>
        {/* TODO: support dark theme */}
        <ThemeProvider defaultTheme="light" disableTransitionOnChange>
          <NextIntlClientProvider messages={messages}>{children}</NextIntlClientProvider>
        </ThemeProvider>
        <Toaster richColors position="bottom-right" />
      </body>
      <GoogleAnalytics gaId="G-TLYE3CBLPW" />
    </html>
  );
}
