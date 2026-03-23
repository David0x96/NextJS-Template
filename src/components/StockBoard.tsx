import { getMarketIndices } from "@/services/marketService";

export default async function StockBoard() {
  const indices = await getMarketIndices();

  return (
    <div className="bg-[#004370] py-2 mb-0">
      <div className="max-w-[1200px] mx-auto px-3">
        <div className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
          {indices.map((idx, i) => (
            <div
              key={idx.IndexId}
              className={`flex items-center gap-4 px-4 py-1.5 rounded cursor-pointer hover:bg-white/10 transition-colors flex-shrink-0 ${
                i < indices.length - 1 ? "border-r border-white/20" : ""
              }`}
            >
              <div>
                <span className="text-blue-200 text-[11px] font-medium block">{idx.Name}</span>
                <span className="text-white text-[14px] font-black">
                  {idx.IndexValue.toLocaleString("vi-VN", { minimumFractionDigits: 2 })}
                </span>
              </div>
              <div className={`text-right ${idx.Up ? "text-green-400" : "text-red-400"}`}>
                <span className="text-[12px] font-bold block">
                  {idx.Up ? "+" : ""}{idx.Change.toFixed(2)}
                </span>
                <span className="text-[11px]">
                  {idx.Up ? "+" : ""}{idx.PercentChange.toFixed(2)}%
                </span>
              </div>
              {/* Mini sparkline */}
              <div className="hidden sm:block">
                <svg width="40" height="24" viewBox="0 0 40 24">
                  {idx.Up ? (
                    <polyline points="0,20 10,16 20,18 30,10 40,4" fill="none" stroke="#4ade80" strokeWidth="1.5" />
                  ) : (
                    <polyline points="0,4 10,8 20,6 30,14 40,20" fill="none" stroke="#f87171" strokeWidth="1.5" />
                  )}
                </svg>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
