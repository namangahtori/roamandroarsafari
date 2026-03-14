import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans, Oswald } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const oswald = Oswald({
  variable: "--font-oswald",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#0a0a0a",
};

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "https://roarandroam.com"),
  title: {
    default: "Roam & Roar - Jim Corbett Safari Booking",
    template: "%s | Roam & Roar",
  },
  description:
    "Book your Jim Corbett National Park safari adventure. Explore tiger zones like Dhikala, Bijrani, Jhirna & more. Trusted safari booking with instant WhatsApp confirmation.",
  keywords: [
    "Jim Corbett Safari",
    "Corbett National Park",
    "Tiger Safari India",
    "Wildlife Safari Booking",
    "Dhikala Safari",
    "Bijrani Safari",
    "Corbett Safari Booking",
    "Jim Corbett Tour",
  ],
  authors: [{ name: "Roam & Roar" }],
  creator: "Roam & Roar",
  publisher: "Roam & Roar",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_IN",
    siteName: "Roam & Roar",
    title: "Roam & Roar - Jim Corbett Safari Booking",
    description:
      "Book your Jim Corbett National Park safari adventure. Explore tiger zones and witness majestic wildlife.",
    images: [
      {
        url: "/images/dhikala.jpg",
        width: 1200,
        height: 630,
        alt: "Jim Corbett Safari - Roam & Roar",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Roam & Roar - Jim Corbett Safari Booking",
    description:
      "Book your Jim Corbett National Park safari adventure. Explore tiger zones and witness majestic wildlife.",
    images: ["/images/dhikala.jpg"],
  },
  icons: {
    icon: "/favicon.ico",
    apple: "/images/logo.jpeg",
  },
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body
        className={`${plusJakarta.variable} ${oswald.variable} antialiased bg-[#0a0a0a] text-white`}
      >
        {children}
      </body>
    </html>
  );
}
