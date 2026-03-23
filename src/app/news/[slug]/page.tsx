import { notFound } from "next/navigation";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import StockBoard from "@/components/StockBoard";
import BreakingTicker from "@/components/BreakingTicker";
import Footer from "@/components/Footer";
import NewsDetailScreen from "@/screens/news/NewsDetailScreen";
import { getMarketIndices } from "@/services/marketService";
import { getLatestNews, getNewsDetail } from "@/services/newsService";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  try {
    const detail = await getNewsDetail(slug);
    return {
      title: `${detail.title} - CafeF`,
      description: detail.sapo,
      openGraph: { images: [detail.ogImage] },
    };
  } catch {
    return { title: "CafeF" };
  }
}

export default async function NewsDetailPage({ params }: Props) {
  const { slug } = await params;

  const [indices, latestItems, detail] = await Promise.all([
    getMarketIndices(),
    getLatestNews(),
    getNewsDetail(slug).catch(() => null),
  ]);

  if (!detail) notFound();

  return (
    <div className="min-h-screen flex flex-col">
      <Header indices={indices} />
      <StockBoard />
      <Navbar />
      <BreakingTicker items={latestItems} />
      <main className="flex-1 bg-[#f2f4f8] py-2">
        <NewsDetailScreen detail={detail} relatedNews={latestItems} />
      </main>
      <Footer />
    </div>
  );
}
