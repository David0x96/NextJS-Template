import { getPriceHistory } from "@/services/stockService";
import { toApiDate } from "@/services/foreignService";
import CandlestickChart from "@/components/CandlestickChart";
import StockHistoryTable from "./StockHistoryTable";

interface Props {
  symbol: string;
}

export default async function StockDetailScreen({ symbol }: Props) {
  const today = toApiDate(new Date());
  const startDate = "01-01-2025";

  const data = await getPriceHistory(symbol.toUpperCase(), startDate, today, 1, 200);
  const items = data.Data?.Data ?? [];

  return (
    <main className="flex-1 max-w-[1200px] mx-auto w-full px-3 py-4 space-y-4">
      <div className="flex items-center gap-2">
        <a href="/stocks" className="text-[13px] text-gray-400 hover:text-[#004370] transition-colors">← Stocks</a>
        <span className="text-gray-300">/</span>
        <span className="text-[13px] font-bold text-[#004370]">{symbol.toUpperCase()}</span>
      </div>

      <CandlestickChart data={items} symbol={symbol.toUpperCase()} />

      <h2 className="text-[15px] font-bold text-[#004370] border-l-4 border-[#e8372b] pl-3">
        Price History
      </h2>
      <StockHistoryTable symbol={symbol.toUpperCase()} data={items.slice(0, 20)} total={data.Data?.TotalCount ?? 0} />
    </main>
  );
}
