export interface FeaturedNewsItem {
  id: number | string;
  title: string;
  category: string;
  time: string;
  image: string;
  hot?: boolean;
}

interface Props {
  items: FeaturedNewsItem[];
}

export default function FeaturedNews({ items }: Props) {
  const [main, ...rest] = items;
  if (!main) return null;

  return (
    <div className="mb-2">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Main story */}
        <div className="md:col-span-2 lg:col-span-1 relative group cursor-pointer">
          <div className="relative overflow-hidden rounded">
            <img
              src={main.image}
              alt={main.title}
              className="w-full h-[260px] object-cover group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />
            <div className="absolute bottom-0 left-0 right-0 p-3">
              <span className="inline-block bg-[#e8372b] text-white text-[10px] font-bold px-2 py-0.5 rounded mb-1.5">
                {main.hot ? "NỔI BẬT" : main.category.toUpperCase()}
              </span>
              <h2 className="text-white font-bold text-base leading-snug line-clamp-3 hover:text-yellow-200 transition-colors">
                {main.title}
              </h2>
              <span className="text-gray-300 text-[11px] mt-1 block">{main.time}</span>
            </div>
          </div>
        </div>

        {/* Secondary stories */}
        <div className="grid grid-cols-1 gap-3">
          {rest.slice(0, 3).map((news) => (
            <div key={news.id} className="flex gap-3 group cursor-pointer">
              <div className="relative flex-shrink-0 w-[130px] h-[80px] overflow-hidden rounded">
                <img
                  src={news.image}
                  alt={news.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="flex-1 min-w-0">
                <span className="text-[10px] text-[#004370] font-semibold uppercase">{news.category}</span>
                <h3 className="text-[13px] font-semibold text-gray-800 leading-snug line-clamp-3 group-hover:text-[#004370] transition-colors mt-0.5">
                  {news.title}
                </h3>
                <span className="text-[11px] text-gray-400 mt-1 block">{news.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
