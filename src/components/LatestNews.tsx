import type { LatestNewsItem } from "@/services/newsService";

interface Props {
  latestItems: LatestNewsItem[];
}

export default function LatestNews({ latestItems }: Props) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[15px] font-bold text-[#004370] uppercase border-l-4 border-[#e8372b] pl-2">
          Latest News
        </h2>
        <a href="/news" className="text-[12px] text-[#004370] hover:underline">View all »</a>
      </div>
      <div className="space-y-0 divide-y divide-gray-100">
        {latestItems.map((news, i) => {
          const slug = news.href.replace("https://cafef.vn/", "").replace(".chn", "");
          const href = `/news/${slug}`;
          return (
          <a
            key={news.id}
            href={href}
            className="flex items-start gap-3 py-2.5 group hover:bg-gray-50 px-1 -mx-1 rounded transition-colors"
          >
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-[#004370] text-white text-[10px] font-bold flex items-center justify-center mt-0.5">
              {i + 1}
            </span>
            <div className="flex-1 min-w-0">
              <p className="text-[13px] font-medium text-gray-800 leading-snug line-clamp-2 group-hover:text-[#004370] transition-colors">
                {news.title}
              </p>
              {news.time && (
                <span className="text-[11px] text-gray-400 mt-0.5 block">{news.time}</span>
              )}
            </div>
          </a>
          );
        })}
      </div>
    </div>
  );
}
