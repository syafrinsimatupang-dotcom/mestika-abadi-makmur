import type { Metadata } from "next";
import { Geist, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import "./brand.css";
import "./refinements.css";
import { MotionPreferences } from "@/components/MotionPreferences";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { StickyWhatsApp } from "@/components/StickyWhatsApp";
import { siteConfig } from "@/lib/site";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist",
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: "Mestika Abadi Makmur | Aluminium & Kaca Jabodetabek",
    template: "%s | Mestika Abadi Makmur",
  },
  description: siteConfig.description,
  applicationName: siteConfig.name,
  category: "Construction",
  keywords: [
    "pintu aluminium Jabodetabek",
    "jendela aluminium Jabodetabek",
    "kusen aluminium Jabodetabek",
    "partisi kaca Jabodetabek",
    "shower box Jabodetabek",
  ],
  icons: {
    icon: [
      {
        url: "/brand/Logo%20Mestika%20Abadi%20Makmur%20-%20Pakai%20-%20Petak.png",
        type: "image/png",
        sizes: "1254x1254",
      },
    ],
    shortcut:
      "/brand/Logo%20Mestika%20Abadi%20Makmur%20-%20Pakai%20-%20Petak.png",
    apple: [
      {
        url: "/brand/Logo%20Mestika%20Abadi%20Makmur%20-%20Pakai%20-%20Petak.png",
        type: "image/png",
        sizes: "1254x1254",
      },
    ],
  },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    locale: "id_ID",
    siteName: siteConfig.name,
    title: "Mestika Abadi Makmur | Aluminium & Kaca Jabodetabek",
    description: siteConfig.description,
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${geist.variable} ${jakarta.variable}`}>
      <body>
        <a className="skip-link" href="#main">
          Lewati ke konten utama
        </a>
        <MotionPreferences>
          <Header />
          <main id="main">{children}</main>
          <StickyWhatsApp />
          <Footer />
        </MotionPreferences>
      </body>
    </html>
  );
}
