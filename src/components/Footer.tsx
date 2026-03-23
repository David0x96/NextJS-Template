export default function Footer() {
  const links = {
    "Stocks": ["Market", "Equities", "Derivatives", "ETF", "IPO"],
    "Finance": ["Banking", "Insurance", "Interest Rates", "Credit"],
    "Commodities": ["Gold & Silver", "Forex", "Oil & Gas", "Agriculture"],
    "Real Estate": ["Property News", "Projects", "Legal"],
    "Economy": ["Macro", "Global", "Policy", "Technology"],
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
              Vietnam&apos;s leading financial news channel. Providing stock market, finance, real estate, and macroeconomic information.
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
            <span className="font-semibold text-gray-400">CafeF JSC</span>
            {" "}| Business Reg. No: 0108670043 | Issued: 20/12/2019
          </div>
          <div className="flex flex-wrap gap-4 text-[11px] text-gray-500">
            <a href="#" className="hover:text-gray-300">About Us</a>
            <a href="#" className="hover:text-gray-300">Advertise</a>
            <a href="#" className="hover:text-gray-300">Privacy Policy</a>
            <a href="#" className="hover:text-gray-300">Terms of Use</a>
            <a href="#" className="hover:text-gray-300">Sitemap</a>
          </div>
        </div>
      </div>

      {/* Bottom */}
      <div className="bg-[#111820]">
        <div className="max-w-[1200px] mx-auto px-3 py-2 text-center">
          <p className="text-[11px] text-gray-600">
            © 2026 CafeF. Social Media License No. 336/GP-BTTTT issued by the Ministry of Information and Communications on 09/10/2014.
          </p>
        </div>
      </div>
    </footer>
  );
}
