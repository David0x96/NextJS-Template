"use client";
import { useState } from "react";
import type { MarketLeader } from "@/services/marketService";
import type { CommodityItem } from "@/services/commodityService";

interface Props {
  leaders: MarketLeader[];
  commodities: CommodityItem[];
}

export default function SidebarClient({ leaders, commodities }: Props) {
  const [searchVal, setSearchVal] = useState("");

  const gainers = leaders.filter((l) => l.score > 0).sort((a, b) => b.score - a.score);
  const losers  = leaders.filter((l) => l.score < 0).sort((a, b) => a.score - b.score);

  return (
    <>
      {/* Search box */}
      <div className="bg-[#f2f4f8] rounded p-3">
        <div className="flex items-center gap-2 bg-white border border-gray-300 rounded px-3 py-2">
          <svg className="w-4 h-4 text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
          </svg>
          <input
            type="text"
            value={searchVal}
            onChange={(e) => setSearchVal(e.target.value)}
            placeholder="Tìm kiếm tin tức, cổ phiếu..."
            className="flex-1 text-[13px] outline-none bg-transparent"
          />
        </div>
      </div>

      {/* Banner Ad */}
      <div className="bg-gradient-to-br from-[#004370] to-[#0066aa] rounded overflow-hidden">
        <div className="p-4 text-center">
          <p className="text-white text-[11px] font-bold uppercase tracking-wide mb-1">Quảng cáo</p>
          <div className="bg-white/10 rounded p-3 text-white">
            <p className="text-lg font-black">iBoard</p>
            <p className="text-[12px] opacity-80 mt-1">Bảng giá chứng khoán trực tuyến</p>
            <button className="mt-2 bg-white text-[#004370] text-[12px] font-bold px-4 py-1.5 rounded hover:bg-gray-100 transition-colors">
              Xem ngay
            </button>
          </div>
        </div>
      </div>

      {/* Market leaders — REAL từ /MarketLeaderGroup */}
      <div className="border border-gray-200 rounded overflow-hidden">
        <div className="bg-[#004370] px-3 py-2 flex items-center justify-between">
          <h3 className="text-white text-[13px] font-bold uppercase">Cổ phiếu ảnh hưởng TT</h3>
          <a href="/chung-khoan" className="text-blue-200 text-[11px] hover:text-white">Chi tiết »</a>
        </div>

        {gainers.length > 0 && (
          <>
            <div className="px-3 py-1 bg-green-50 border-b border-gray-100">
              <span className="text-[11px] font-bold text-green-700">Kéo tăng chỉ số</span>
            </div>
            {gainers.map((l) => (
              <div key={l.symbol} className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-0 cursor-pointer">
                <div>
                  <span className="text-[13px] font-bold text-[#004370]">{l.symbol}</span>
                  <p className="text-[10px] text-gray-400 max-w-[150px] truncate">{l.companyName}</p>
                </div>
                <div className="text-right">
                  <span className="text-[12px] font-bold text-green-600">+{l.score.toFixed(2)}</span>
                  <p className="text-[10px] text-gray-400">{(l.scorePercent * 100).toFixed(2)}%</p>
                </div>
              </div>
            ))}
          </>
        )}

        {losers.length > 0 && (
          <>
            <div className="px-3 py-1 bg-red-50 border-b border-gray-100">
              <span className="text-[11px] font-bold text-red-700">Kéo giảm chỉ số</span>
            </div>
            {losers.map((l) => (
              <div key={l.symbol} className="flex items-center justify-between px-3 py-2 hover:bg-gray-50 border-b border-gray-100 last:border-0 cursor-pointer">
                <div>
                  <span className="text-[13px] font-bold text-[#004370]">{l.symbol}</span>
                  <p className="text-[10px] text-gray-400 max-w-[150px] truncate">{l.companyName}</p>
                </div>
                <div className="text-right">
                  <span className="text-[12px] font-bold text-red-600">{l.score.toFixed(2)}</span>
                  <p className="text-[10px] text-gray-400">{(l.scorePercent * 100).toFixed(2)}%</p>
                </div>
              </div>
            ))}
          </>
        )}
      </div>

      {/* Commodity prices — mock (endpoint không có) */}
      <div className="border border-gray-200 rounded overflow-hidden">
        <div className="bg-[#004370] px-3 py-2 flex items-center justify-between">
          <h3 className="text-white text-[13px] font-bold uppercase">Giá hàng hóa</h3>
          <a href="/hang-hoa" className="text-blue-200 text-[11px] hover:text-white">Chi tiết »</a>
        </div>
        <div className="divide-y divide-gray-100">
          {commodities.map((item) => (
            <div key={item.Name} className="px-3 py-2 hover:bg-gray-50 cursor-pointer">
              <div className="flex items-center justify-between">
                <span className="text-[12px] text-gray-700 font-medium">{item.Name}</span>
                <span className={`text-[12px] font-bold ${item.Up ? "text-green-600" : "text-red-600"}`}>
                  {item.Up ? "▲" : "▼"} {item.Change}
                </span>
              </div>
              <div className="flex items-center justify-between mt-0.5">
                <span className="text-[11px] text-gray-400">Mua: <span className="text-gray-700 font-medium">{item.Buy}</span></span>
                <span className="text-[11px] text-gray-400">Bán: <span className="text-gray-700 font-medium">{item.Sell}</span></span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Newsletter */}
      <div className="bg-[#e8f0fe] rounded p-4 border border-blue-200">
        <h3 className="text-[13px] font-bold text-[#004370] mb-1">Nhận bản tin CafeF</h3>
        <p className="text-[12px] text-gray-600 mb-3">Cập nhật tin tức tài chính - chứng khoán mỗi ngày</p>
        <input
          type="email"
          placeholder="Nhập email của bạn"
          className="w-full border border-gray-300 rounded px-3 py-1.5 text-[12px] outline-none focus:border-[#004370] mb-2"
        />
        <button className="w-full bg-[#004370] text-white text-[12px] font-bold py-1.5 rounded hover:bg-[#003058] transition-colors">
          Đăng ký ngay
        </button>
      </div>
    </>
  );
}
