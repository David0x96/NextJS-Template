import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "CafeF - Financial & Economic News",
  description: "CafeF - Vietnam's leading financial news channel. Stock market, finance, real estate, and commodities updates 24/7.",
  keywords: "stocks, finance, real estate, economy, VN-Index, cafef",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${roboto.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#f2f4f8]">{children}</body>
    </html>
  );
}
