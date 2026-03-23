import { getLatestNews } from "@/services/newsService";

interface Props {
  category?: string;
}

export default async function NewsScreen({ category = "Tin tức" }: Props) {
  const items = await getLatestNews();

  return (
    <main className="flex-1 max-w-[1200px] mx-auto w-full px-3 py-4">
      <h1 className="text-xl font-bold text-[#004370] border-l-4 border-[#e8372b] pl-3 mb-4">
        {category}
      </h1>
      <div className="space-y-2">
        {items.map((news) => (
          <a
            key={news.id}
            href={news.href}
            className="bg-white rounded shadow-sm flex items-start gap-3 p-3 hover:shadow-md transition-shadow group"
          >
            <span className="flex-shrink-0 text-[11px] text-gray-400 mt-0.5 w-10">{news.time}</span>
            <p className="text-[13px] font-medium text-gray-800 leading-snug group-hover:text-[#004370] transition-colors">
              {news.title}
            </p>
          </a>
        ))}
      </div>
    </main>
  );
}
