import type { Metadata } from "next";
import { inter, sourceSerif } from "../lib/fonts";
import "./globals.css";
import { Geist } from "next/font/google";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

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
    <html lang="en" suppressHydrationWarning className={cn("font-sans", geist.variable)}>
      <body className={`${sourceSerif.variable} ${inter.variable} font-inter`} suppressHydrationWarning>
        {children}
      </body>
    </html>
  );
}
