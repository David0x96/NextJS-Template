import type { Metadata } from "next";
import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import StockBoard from "@/components/StockBoard";
import Footer from "@/components/Footer";
import StockDetailScreen from "@/screens/stock/StockDetailScreen";
import { getMarketIndices } from "@/services/marketService";

interface Props {
  params: Promise<{ symbol: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { symbol } = await params;
  return {
    title: `${symbol.toUpperCase()} — Stock Detail`,
    description: `Price history and candlestick chart for ${symbol.toUpperCase()}`,
  };
}

export default async function StockDetailPage({ params }: Props) {
  const { symbol } = await params;
  const indices = await getMarketIndices();

  return (
    <div className="min-h-screen flex flex-col">
      <Header indices={indices} />
      <StockBoard />
      <Navbar />
      <StockDetailScreen symbol={symbol} />
      <Footer />
    </div>
  );
}
