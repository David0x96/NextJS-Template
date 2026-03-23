"use client";
import type { LatestNewsItem } from "@/services/newsService";

interface Props {
  items: LatestNewsItem[];
}

export default function BreakingTicker({ items }: Props) {
  const doubled = [...items, ...items]; // loop marquee

  return (
    <div className="bg-white border-b border-gray-200 overflow-hidden">
      <div className="max-w-[1200px] mx-auto px-3 flex items-center">
        <span className="flex-shrink-0 bg-[#e8372b] text-white text-[11px] font-bold px-2 py-1 mr-3 uppercase tracking-wide">
          Breaking
        </span>
        <div className="overflow-hidden flex-1 py-1.5">
          <div className="flex animate-marquee whitespace-nowrap">
            {doubled.map((item, i) => (
              <a
                key={`${item.id}-${i}`}
                href={item.href}
                className="text-[12px] text-gray-700 mr-8 hover:text-[#004370] cursor-pointer flex-shrink-0"
              >
                ▸ {item.title}
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
