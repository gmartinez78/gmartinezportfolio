import type { Metadata } from "next";
import { inter, playfairDisplay } from "../lib/fonts";
import "./globals.css";

const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ??
  (process.env.VERCEL_PROJECT_PRODUCTION_URL ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}` : undefined) ??
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : "http://localhost:3000");

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Greddys Martinez – Portfolio",
  description: "Senior Product Designer crafting thoughtful digital experiences.",
  icons: {
    icon: "/images/logo-gj.svg",
  },
  openGraph: {
    title: "Greddys Martinez – Portfolio",
    description: "Senior Product Designer crafting thoughtful digital experiences.",
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
    title: "Greddys Martinez – Portfolio",
    description: "Senior Product Designer crafting thoughtful digital experiences.",
    images: ["/images/og-home.png"],
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
        {children}
      </body>
    </html>
  );
}
