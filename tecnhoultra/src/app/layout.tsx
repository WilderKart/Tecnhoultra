import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/providers/SmoothScroll";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | TECHNOULTRA",
    default: "TECHNOULTRA | Arquitectura Digital y Crecimiento Estratégico",
  },
  description: "Firma líder en arquitectura digital, growth hacking y estrategias de conversión. Transformamos negocios en activos digitales rentables.",
  keywords: [
    "Arquitectura Web",
    "Growth Hacking",
    "SEO Técnico",
    "Marketing Digital Colombia",
    "Desarrollo Web Premium",
    "Estrategia Digital"
  ],
  authors: [{ name: "TECHNOULTRA Team", url: "https://technoultra.com" }],
  creator: "TECHNOULTRA",
  metadataBase: new URL("https://technoultra.com"),
  openGraph: {
    type: "website",
    locale: "es_CO",
    url: "https://technoultra.com",
    siteName: "TECHNOULTRA - Arquitectura Digital",
    title: "TECHNOULTRA | El Crecimiento No Es Suerte",
    description: "Diseñamos sistemas digitales que convierten, escalan y generan ventaja competitiva real.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "TECHNOULTRA Hero Image",
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
  },
  icons: {
    icon: "/favicon.ico",
  },
};

import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import WhatsAppBtn from "@/components/layout/WhatsAppBtn";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className={inter.variable}>
      <body className={cn("min-h-screen bg-background text-foreground antialiased font-sans overflow-x-hidden")}>
        <SmoothScroll>
          <Navbar />
          <main className="flex-grow min-h-screen">
            {children}
          </main>
          <WhatsAppBtn />
          <Footer />
        </SmoothScroll>
      </body>
    </html>
  );
}
