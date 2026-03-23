import type { PriceHistoryItem } from "@/services/stockService";

interface Props {
  symbol: string;
  data: PriceHistoryItem[];
  total: number;
}

export default function StockHistoryTable({ symbol, data, total }: Props) {
  return (
    <div className="bg-white rounded shadow-sm overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-gray-100">
        <h2 className="text-[14px] font-bold text-[#004370] uppercase">
          Price History — <span className="text-[#e8372b]">{symbol}</span>
          <span className="ml-2 text-[12px] text-gray-400 font-normal">({total.toLocaleString("en-US")} sessions)</span>
        </h2>
        <span className="text-[11px] text-gray-400 bg-green-50 text-green-700 px-2 py-0.5 rounded font-medium">Live API</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[13px]">
          <thead className="bg-gray-50 border-b border-gray-100">
            <tr>
              <th className="text-left px-4 py-2 text-gray-500 font-semibold whitespace-nowrap">Date</th>
              <th className="text-right px-4 py-2 text-gray-500 font-semibold">Open</th>
              <th className="text-right px-4 py-2 text-gray-500 font-semibold">High</th>
              <th className="text-right px-4 py-2 text-gray-500 font-semibold">Low</th>
              <th className="text-right px-4 py-2 text-gray-500 font-semibold">Close</th>
              <th className="text-right px-4 py-2 text-gray-500 font-semibold">Change</th>
              <th className="text-right px-4 py-2 text-gray-500 font-semibold hidden sm:table-cell">Volume</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {data.map((row, i) => {
              const isUp = row.ThayDoi.startsWith("-") === false && row.ThayDoi !== "0(0,00 %)";
              return (
                <tr key={i} className="hover:bg-gray-50">
                  <td className="px-4 py-2.5 text-gray-600 whitespace-nowrap">{row.Ngay}</td>
                  <td className="px-4 py-2.5 text-right text-gray-700">{row.GiaMoCua.toLocaleString("en-US")}</td>
                  <td className="px-4 py-2.5 text-right text-gray-700">{row.GiaCaoNhat.toLocaleString("en-US")}</td>
                  <td className="px-4 py-2.5 text-right text-gray-700">{row.GiaThapNhat.toLocaleString("en-US")}</td>
                  <td className="px-4 py-2.5 text-right font-semibold text-gray-800">{row.GiaDongCua.toLocaleString("en-US")}</td>
                  <td className={`px-4 py-2.5 text-right font-semibold text-[12px] ${isUp ? "text-green-600" : "text-red-600"}`}>
                    {row.ThayDoi}
                  </td>
                  <td className="px-4 py-2.5 text-right text-gray-500 hidden sm:table-cell">
                    {row.KhoiLuongKhopLenh.toLocaleString("en-US")}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
