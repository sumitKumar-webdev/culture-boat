import type { Metadata, Viewport } from "next";
import { Bebas_Neue, Cormorant_Garamond, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Header from "./component/Header/Header";
import { CustomCursor } from "./component/Custom Cursor/custom-cursor";
import PageLoader from "./component/PageLoader/page-loader";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const bebasNeue = Bebas_Neue({
  variable: "--font-bebas",
  subsets: ["latin"],
  weight: ["400"],
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-luxury",
  subsets: ["latin"],
  weight: ["300", "400", "600"],
});

export const metadata: Metadata = {
  title: "Astra Studio",
  description:
    "Animated creative studio homepage with infinitely scrolling type and image rails.",
  manifest: "/site.webmanifest",
  icons: {
    icon: [
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#0a0a0a",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      <html
        lang="en"
        className={`${geistSans.variable} ${geistMono.variable} ${bebasNeue.variable} ${cormorantGaramond.variable} h-full antialiased`}
      >
      <body className="min-h-full grid-bg">
        <PageLoader />
        <CustomCursor />
        <Header />
        {children}
      </body>
    </html>
  );
}
