import type { Metadata } from "next";
import { inter, sourceSerif } from "../lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: "Greddys Martinez – Portfolio",
  description: "Senior Product Designer crafting thoughtful digital experiences.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className={`${sourceSerif.variable} ${inter.variable} font-sans`}>
      <body className={`${sourceSerif.variable} ${inter.variable} font-inter`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
