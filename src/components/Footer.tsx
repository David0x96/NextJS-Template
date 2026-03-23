export default function Footer() {
  const links = {
    "Chứng khoán": ["Thị trường", "Cổ phiếu", "Phái sinh", "ETF", "IPO"],
    "Tài chính": ["Ngân hàng", "Bảo hiểm", "Lãi suất", "Tín dụng"],
    "Hàng hóa": ["Vàng & Bạc", "Ngoại hối", "Dầu khí", "Nông sản"],
    "Bất động sản": ["Tin BĐS", "Dự án", "Pháp lý BĐS"],
    "Kinh tế": ["Vĩ mô", "Thế giới", "Chính sách", "Công nghệ"],
  };

  return (
    <footer className="bg-[#1a2533] text-gray-300 mt-8">
      {/* Main footer */}
      <div className="max-w-[1200px] mx-auto px-3 py-8">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {/* Brand */}
          <div className="col-span-2 md:col-span-3 lg:col-span-1">
            <div className="flex items-center gap-1 mb-3">
              <span className="text-white font-black text-2xl tracking-tight leading-none">cafe</span>
              <span className="bg-white text-[#004370] font-black text-2xl px-1 leading-none">F</span>
            </div>
            <p className="text-[12px] text-gray-400 leading-relaxed mb-4">
              Kênh thông tin kinh tế - tài chính hàng đầu Việt Nam. Cung cấp thông tin chứng khoán, tài chính, bất động sản và kinh tế vĩ mô.
            </p>
            <div className="flex gap-2">
              {["f", "t", "in", "yt"].map((s) => (
                <a key={s} href="#" className="w-8 h-8 bg-white/10 rounded-full flex items-center justify-center text-[11px] font-bold hover:bg-[#004370] transition-colors uppercase">
                  {s}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(links).map(([title, items]) => (
            <div key={title}>
              <h4 className="text-white text-[13px] font-bold uppercase mb-3 border-b border-white/10 pb-2">{title}</h4>
              <ul className="space-y-1.5">
                {items.map((item) => (
                  <li key={item}>
                    <a href="#" className="text-[12px] text-gray-400 hover:text-white transition-colors">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Divider */}
      <div className="border-t border-white/10">
        <div className="max-w-[1200px] mx-auto px-3 py-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="text-[11px] text-gray-500">
            <span className="font-semibold text-gray-400">Công ty CP CafeF</span>
            {" "}| GPDKKD số: 0108670043 | Cấp ngày: 20/12/2019
          </div>
          <div className="flex flex-wrap gap-4 text-[11px] text-gray-500">
            <a href="#" className="hover:text-gray-300">Giới thiệu</a>
            <a href="#" className="hover:text-gray-300">Liên hệ quảng cáo</a>
            <a href="#" className="hover:text-gray-300">Chính sách bảo mật</a>
            <a href="#" className="hover:text-gray-300">Điều khoản sử dụng</a>
            <a href="#" className="hover:text-gray-300">Sơ đồ trang</a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="bg-[#111820]">
        <div className="max-w-[1200px] mx-auto px-3 py-2 text-center">
          <p className="text-[11px] text-gray-600">
            © 2026 CafeF. Giấy phép Mạng xã hội số 336/GP-BTTTT do Bộ Thông tin và Truyền thông cấp ngày 09/10/2014. Chịu trách nhiệm nội dung: Tổng biên tập.
          </p>
        </div>
      </div>
    </footer>
  );
}
