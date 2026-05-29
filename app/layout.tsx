import type { Metadata, Viewport } from "next";
import { GeistMono } from "geist/font/mono";
import { Bodoni_Moda, Inter, Cormorant_SC } from "next/font/google";
import "./globals.css";
import { LenisProvider } from "@/components/providers/LenisProvider";
import { Header } from "@/components/shell/Header";
import { Dock } from "@/components/dock/Dock";
import { SITE } from "@/lib/site-config";
import {
  jsonLdScriptProps,
  personSchema,
  websiteSchema,
} from "@/lib/schema";

const bodoni = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
  weight: ["400", "500", "700"],
  style: ["normal", "italic"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
  weight: ["300", "400", "500", "600"],
});

const cormorant = Cormorant_SC({
  subsets: ["latin"],
  variable: "--font-label",
  display: "swap",
  weight: ["500", "600"],
});

export const viewport: Viewport = {
  themeColor: SITE.themeColor,
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} | ${SITE.brand}`,
    template: `%s | ${SITE.name}`,
  },
  description: SITE.description,
  applicationName: SITE.brand,
  generator: "Next.js",
  referrer: "strict-origin-when-cross-origin",
  formatDetection: { email: false, address: false, telephone: false },
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${bodoni.variable} ${cormorant.variable} ${GeistMono.variable}`}
      suppressHydrationWarning
    >
      <head>
        <script {...jsonLdScriptProps(personSchema)} />
        <script {...jsonLdScriptProps(websiteSchema)} />
      </head>
      <body className="antialiased">
        <LenisProvider>
          <Header />
          {children}
          <Dock />
        </LenisProvider>
      </body>
    </html>
  );
}
