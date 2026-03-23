import type { AnalysisReport } from "@/services/newsService";

interface Props {
  reports: AnalysisReport[];
}

export default function AnalysisReportBox({ reports }: Props) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[15px] font-bold text-[#004370] uppercase border-l-4 border-[#e8372b] pl-2">
          Analysis Reports
        </h2>
        <a href="/data" className="text-[12px] text-[#004370] hover:underline">View all »</a>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {reports.map((r, i) => (
          <a
            key={i}
            href={`https://cafef.vn${r.link}`}
            className="flex gap-3 group p-2 rounded hover:bg-gray-50 transition-colors border border-gray-100"
          >
            {/* Symbol badge */}
            <div className="flex-shrink-0 w-12 h-12 bg-[#004370] rounded flex items-center justify-center">
              <span className="text-white text-[11px] font-black text-center leading-tight px-1">
                {r.symbol.length > 6 ? r.symbol.slice(0, 6) : r.symbol}
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-[12px] font-medium text-gray-800 leading-snug line-clamp-2 group-hover:text-[#004370] transition-colors">
                {r.title}
              </p>
              <div className="flex items-center gap-2 mt-1">
                <span className="text-[10px] text-gray-400">{r.fullDate}</span>
                {r.price > 0 && (
                  <span className={`text-[11px] font-semibold ${r.changePrice >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {r.price.toLocaleString("en-US")}
                    {r.changePrice !== 0 && ` (${r.changePrice > 0 ? "+" : ""}${r.changePrice})`}
                  </span>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
