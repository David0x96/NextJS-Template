import { getPriceHistory } from "@/services/stockService";
import StockHistoryTable from "./StockHistoryTable";

export default async function StockScreen() {
  const today = new Date();
  const endDate = `${String(today.getDate()).padStart(2,"0")}-${String(today.getMonth()+1).padStart(2,"0")}-${today.getFullYear()}`;
  const startDate = "01-01-2026";

  const data = await getPriceHistory("VCB", startDate, endDate, 1, 20);

  return (
    <main className="flex-1 max-w-[1200px] mx-auto w-full px-3 py-4">
      <h1 className="text-xl font-bold text-[#004370] border-l-4 border-[#e8372b] pl-3 mb-4">
        Thị trường chứng khoán
      </h1>
      <StockHistoryTable symbol="VCB" data={data.Data.Data} total={data.Data.TotalCount} />
    </main>
  );
}
