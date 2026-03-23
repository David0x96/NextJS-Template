import FeaturedNews from "@/components/FeaturedNews";
import LatestNews from "@/components/LatestNews";
import Sidebar from "@/components/Sidebar";
import AnalysisReportBox from "@/components/AnalysisReportBox";
import EventsBox from "@/components/EventsBox";
import { getLatestNews, getAnalysisReports, getEventsHistory } from "@/services/newsService";
import { getCommodityPrices } from "@/services/commodityService";
import { getMarketLeaders } from "@/services/marketService";

// Featured news dùng mock data (endpoint tin featured của cafef đã 404)
import { featuredNews as MOCK_FEATURED } from "@/data/mockData";

export default async function HomeScreen() {
  const [latestItems, reports, events, commodities, leaders] = await Promise.all([
    getLatestNews(),
    getAnalysisReports(10),
    getEventsHistory(),
    getCommodityPrices(),
    getMarketLeaders(1, 5),
  ]);

  return (
    <main className="flex-1 max-w-[1200px] mx-auto w-full px-3 py-4">
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-5">

        {/* Left: main content */}
        <div className="space-y-4">

          {/* Featured news — mock (endpoint cafef featured đã 404) */}
          <div className="bg-white rounded shadow-sm p-3">
            <FeaturedNews items={MOCK_FEATURED} />
          </div>

          {/* Tin mới nhất — REAL từ /ajax/tinmoi.chn */}
          <div className="bg-white rounded shadow-sm p-4">
            <LatestNews latestItems={latestItems} />
          </div>

          {/* Báo cáo phân tích — REAL từ /du-lieu/Ajax/CafeFData/AnalysisReport.ashx */}
          <div className="bg-white rounded shadow-sm p-4">
            <AnalysisReportBox reports={reports} />
          </div>

          {/* Lịch sự kiện ĐHCĐ — REAL từ /get-events-history.chn */}
          <div className="bg-white rounded shadow-sm p-4">
            <EventsBox events={events.slice(0, 8)} />
          </div>

        </div>

        {/* Right: sidebar */}
        <Sidebar
          commodities={commodities}
          leaders={leaders}
        />
      </div>
    </main>
  );
}
