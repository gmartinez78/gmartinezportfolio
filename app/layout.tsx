import type { Metadata } from "next";
import { inter, playfairDisplay } from "../lib/fonts";
import { LanguageProvider } from "../lib/i18n/language-context";
import { defaultDescription, defaultTitle, getPersonSchema, getWebsiteSchema, siteUrl } from "../lib/seo";
import { SiteRail } from "../components/site-rail";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: defaultTitle,
  description: defaultDescription,
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "any" },
      { url: "/images/icon-32.png", sizes: "32x32", type: "image/png" },
      { url: "/images/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/images/logo-gj.svg", type: "image/svg+xml" },
    ],
    shortcut: ["/favicon.ico"],
    apple: [{ url: "/images/icon-180.png", sizes: "180x180" }],
  },
  openGraph: {
    title: defaultTitle,
    description: defaultDescription,
    siteName: "Greddys Martinez",
    images: [
      {
        url: "/images/og-logo.png",
        width: 1200,
        height: 1200,
        alt: "Greddys Martinez logo",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: defaultTitle,
    description: defaultDescription,
    images: ["/images/og-logo.png"],
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
    <html lang="en" suppressHydrationWarning className={`${inter.variable} ${playfairDisplay.variable} font-sans`}>
      <body className={`${inter.variable} font-inter`} suppressHydrationWarning>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getWebsiteSchema()) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(getPersonSchema()) }}
        />
        <LanguageProvider>
          <SiteRail />
          <div className="min-h-dvh lg:pl-20">{children}</div>
        </LanguageProvider>
      </body>
    </html>
  );
}
