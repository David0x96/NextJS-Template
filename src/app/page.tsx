import Header from "@/components/Header";
import Navbar from "@/components/Navbar";
import StockBoard from "@/components/StockBoard";
import BreakingTicker from "@/components/BreakingTicker";
import Footer from "@/components/Footer";
import HomeScreen from "@/screens/home/HomeScreen";
import { getMarketIndices } from "@/services/marketService";
import { getLatestNews } from "@/services/newsService";

export default async function Page() {
  const [indices, latestItems] = await Promise.all([
    getMarketIndices(),
    getLatestNews(),
  ]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header indices={indices} />
      <StockBoard />
      <Navbar />
      <BreakingTicker items={latestItems} />
      <HomeScreen />
      <Footer />
    </div>
  );
}
