import type { EventHistoryItem } from "@/services/newsService";

interface Props {
  events: EventHistoryItem[];
}

export default function EventsBox({ events }: Props) {
  return (
    <div>
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-[15px] font-bold text-[#004370] uppercase border-l-4 border-[#e8372b] pl-2">
          Lịch sự kiện doanh nghiệp
        </h2>
        <a href="/du-lieu" className="text-[12px] text-[#004370] hover:underline">Xem tất cả »</a>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-[12px]">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-200">
              <th className="text-left px-3 py-2 font-semibold text-gray-500 w-[70px]">Ngày</th>
              <th className="text-left px-3 py-2 font-semibold text-gray-500 w-[60px]">Mã CK</th>
              <th className="text-left px-3 py-2 font-semibold text-gray-500">Nội dung</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {events.map((ev, i) => (
              <tr key={i} className="hover:bg-gray-50 cursor-pointer group">
                <td className="px-3 py-2 text-gray-500 whitespace-nowrap">{ev.Date}</td>
                <td className="px-3 py-2">
                  <a
                    href={`https://cafef.vn${ev.Link}`}
                    className="font-bold text-[#004370] hover:underline"
                  >
                    {ev.Symbol}
                  </a>
                </td>
                <td className="px-3 py-2">
                  <a
                    href={`https://cafef.vn${ev.Url}`}
                    className="text-gray-700 line-clamp-1 group-hover:text-[#004370] transition-colors"
                  >
                    {ev.Title}
                  </a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
