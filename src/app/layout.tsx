import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";

const roboto = Roboto({
  weight: ["400", "500", "700", "900"],
  subsets: ["latin", "vietnamese"],
  variable: "--font-roboto",
});

export const metadata: Metadata = {
  title: "CafeF - Kênh thông tin kinh tế tài chính",
  description: "CafeF - Kênh thông tin kinh tế tài chính hàng đầu Việt Nam. Cập nhật tin tức chứng khoán, tài chính, bất động sản, hàng hóa 24/7.",
  keywords: "chứng khoán, tài chính, bất động sản, kinh tế, VN-Index, cafef",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className={`${roboto.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#f2f4f8]">{children}</body>
    </html>
  );
}
