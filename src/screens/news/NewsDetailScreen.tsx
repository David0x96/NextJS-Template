import type { NewsDetail } from "@/services/newsService";
import type { LatestNewsItem } from "@/services/newsService";

interface Props {
  detail: NewsDetail;
  relatedNews: LatestNewsItem[];
}

function formatDate(iso: string) {
  if (!iso) return "";
  const d = new Date(iso);
  return d.toLocaleDateString("vi-VN", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export default function NewsDetailScreen({ detail, relatedNews }: Props) {
  return (
    <div className="max-w-[1200px] mx-auto px-3 py-4 flex gap-6">
      {/* Main content */}
      <div className="flex-1 min-w-0">
        {/* Breadcrumb */}
        <nav className="text-[12px] text-gray-500 mb-3 flex items-center gap-1">
          <a href="/" className="hover:text-[#004370]">Trang chủ</a>
          {detail.category && (
            <>
              <span>›</span>
              <a href={detail.categoryUrl} className="hover:text-[#004370]">{detail.category}</a>
            </>
          )}
        </nav>

        {/* Title */}
        <h1 className="text-[22px] font-bold text-gray-900 leading-snug mb-3">
          {detail.title}
        </h1>

        {/* Meta */}
        <div className="flex items-center gap-3 text-[12px] text-gray-500 mb-4 pb-3 border-b border-gray-200">
          {detail.author && (
            <span className="font-medium text-[#004370]">{detail.author}</span>
          )}
          {detail.publishedTime && (
            <span>{formatDate(detail.publishedTime)}</span>
          )}
        </div>

        {/* Sapo */}
        {detail.sapo && (
          <p className="text-[15px] font-semibold text-gray-800 leading-relaxed mb-4 italic border-l-4 border-[#e8372b] pl-3">
            {detail.sapo}
          </p>
        )}

        {/* Cover image */}
        {detail.ogImage && (
          <div className="mb-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={detail.ogImage}
              alt={detail.title}
              className="w-full rounded object-cover max-h-[450px]"
            />
          </div>
        )}

        {/* Article body */}
        <div
          className="prose prose-sm max-w-none text-[14px] text-gray-800 leading-relaxed article-content"
          dangerouslySetInnerHTML={{ __html: detail.contentHtml }}
        />

        {/* Tags */}
        {detail.tags.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200">
            <span className="text-[12px] text-gray-500 font-medium mr-2">Tags:</span>
            {detail.tags.map((tag) => (
              <span
                key={tag}
                className="inline-block bg-gray-100 hover:bg-[#004370] hover:text-white text-gray-700 text-[12px] px-2 py-0.5 rounded mr-1 mb-1 cursor-pointer transition-colors"
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* Sidebar */}
      <aside className="w-[300px] flex-shrink-0 hidden lg:block">
        <div className="bg-white border border-gray-200 rounded p-4">
          <h3 className="text-[13px] font-bold text-[#004370] uppercase border-l-4 border-[#e8372b] pl-2 mb-3">
            Tin mới nhất
          </h3>
          <div className="divide-y divide-gray-100">
            {relatedNews.slice(0, 10).map((item) => {
              const slug = item.href.replace("https://cafef.vn/", "").replace(".chn", "");
              return (
                <a
                  key={item.id}
                  href={`/tin-tuc/${slug}`}
                  className="flex gap-2 py-2.5 group hover:bg-gray-50 -mx-1 px-1 rounded transition-colors"
                >
                  <div className="flex-1 min-w-0">
                    <p className="text-[13px] text-gray-700 leading-snug line-clamp-2 group-hover:text-[#004370]">
                      {item.title}
                    </p>
                    {item.time && (
                      <span className="text-[11px] text-gray-400 mt-0.5 block">{item.time}</span>
                    )}
                  </div>
                </a>
              );
            })}
          </div>
        </div>
      </aside>
    </div>
  );
}
