"use client";
import { useState } from "react";
import type { MarketIndex } from "@/services/marketService";

interface Props {
  indices: MarketIndex[];
}

export default function Header({ indices }: Props) {
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");

  return (
    <div className="bg-white border-b border-gray-200">
      {/* Top bar */}
      <div className="max-w-[1200px] mx-auto px-3 flex items-center justify-between py-2">
        {/* Logo */}
        <a href="/" className="flex-shrink-0">
          <div className="flex items-center gap-1">
            <span className="text-[#004370] font-black text-3xl tracking-tight leading-none">cafe</span>
            <span className="bg-[#004370] text-white font-black text-3xl px-1 leading-none">F</span>
          </div>
          <p className="text-[10px] text-gray-500 mt-0.5">Financial &amp; Economic News Channel</p>
        </a>

        {/* Stock indices ticker */}
        <div className="hidden lg:flex items-center gap-4 flex-1 mx-8 overflow-hidden">
          {indices.map((idx) => (
            <div key={idx.IndexId} className="flex flex-col items-center min-w-[90px]">
              <span className="text-[11px] text-gray-500 font-medium">{idx.Name}</span>
              <span className="text-sm font-bold text-gray-800">
                {idx.IndexValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
              <span className={`text-[11px] font-semibold ${idx.Up ? "text-green-600" : "text-red-600"}`}>
                {idx.Up ? "+" : ""}{idx.Change.toFixed(2)} ({idx.Up ? "+" : ""}{idx.PercentChange.toFixed(2)}%)
              </span>
            </div>
          ))}
        </div>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          <div className="relative flex items-center">
            {searchOpen ? (
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onBlur={() => setSearchOpen(false)}
                placeholder="Search..."
                className="border border-gray-300 rounded px-3 py-1 text-sm w-48 outline-none focus:border-[#004370]"
              />
            ) : (
              <button onClick={() => setSearchOpen(true)} className="p-1.5 hover:bg-gray-100 rounded">
                <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </button>
            )}
          </div>
          <button className="hidden sm:block text-sm text-[#004370] font-semibold border border-[#004370] px-3 py-1 rounded hover:bg-[#004370] hover:text-white transition-colors">
            Sign In
          </button>
          <button className="hidden sm:block text-sm text-white font-semibold bg-[#e8372b] px-3 py-1 rounded hover:bg-red-700 transition-colors">
            Sign Up
          </button>
        </div>
      </div>

      {/* Mobile stock ticker */}
      <div className="lg:hidden bg-gray-50 border-t border-gray-100 px-3 py-1.5 overflow-x-auto">
        <div className="flex gap-5 min-w-max">
          {indices.map((idx) => (
            <div key={idx.IndexId} className="flex items-center gap-1.5">
              <span className="text-[11px] font-semibold text-gray-600">{idx.Name}</span>
              <span className="text-[11px] font-bold text-gray-800">
                {idx.IndexValue.toLocaleString("en-US", { minimumFractionDigits: 2 })}
              </span>
              <span className={`text-[11px] font-semibold ${idx.Up ? "text-green-600" : "text-red-600"}`}>
                {idx.Up ? "+" : ""}{idx.PercentChange.toFixed(2)}%
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
