import type { Metadata } from "next";
import { inter, playfairDisplay } from "../lib/fonts";
import { LanguageProvider } from "../lib/i18n/language-context";
import { defaultDescription, defaultTitle, getPersonSchema, getWebsiteSchema, siteUrl } from "../lib/seo";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: defaultTitle,
  description: defaultDescription,
  icons: {
    icon: "/images/logo-gj.svg",
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    siteName: "Greddys Martinez",
    images: [
      {
        url: "/images/og-home.png",
        width: 1440,
        height: 1100,
        alt: "Greddys Martinez homepage hero preview",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/images/og-home.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${playfairDisplay.variable} ${inter.variable} font-sans`}>
      <body className={`${playfairDisplay.variable} ${inter.variable} font-inter`} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getWebsiteSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getPersonSchema()) }}
        />
        <LanguageProvider>{children}</LanguageProvider>
      </body>
    </html>
  );
}
