"use client";
import { useState } from "react";
import { navMenu } from "@/data/mockData";

export default function Navbar() {
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <nav className="bg-[#004370] relative z-50">
      <div className="max-w-[1200px] mx-auto px-3">
        <div className="flex items-center">
          {/* Desktop menu */}
          <div className="hidden md:flex items-center">
            {navMenu.map((item) => (
              <div
                key={item.label}
                className="relative group"
                onMouseEnter={() => setActiveMenu(item.label)}
                onMouseLeave={() => setActiveMenu(null)}
              >
                <a
                  href={item.href}
                  className="flex items-center gap-1 text-white text-[13px] font-medium px-3 py-3 hover:bg-[#003058] transition-colors whitespace-nowrap"
                >
                  {item.label}
                  {item.sub && (
                    <svg className="w-3 h-3 opacity-70" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  )}
                </a>
                {/* Dropdown */}
                {item.sub && activeMenu === item.label && (
                  <div className="absolute top-full left-0 bg-white shadow-lg border border-gray-200 min-w-[180px] py-1 rounded-b">
                    {item.sub.map((sub) => (
                      <a
                        key={sub}
                        href="#"
                        className="block px-4 py-2 text-[13px] text-gray-700 hover:bg-[#e8f0fe] hover:text-[#004370] transition-colors"
                      >
                        {sub}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden text-white p-3"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                d={mobileOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"} />
            </svg>
          </button>

          {/* Live badge */}
          <div className="ml-auto flex items-center gap-2 pr-2">
            <span className="hidden lg:flex items-center gap-1 bg-red-600 text-white text-[11px] font-bold px-2 py-0.5 rounded animate-pulse">
              <span className="w-1.5 h-1.5 bg-white rounded-full"></span>
              LIVE
            </span>
            <span className="hidden lg:block text-white text-[11px]">23/03/2026 14:35</span>
          </div>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="md:hidden border-t border-[#003058] pb-2">
            {navMenu.map((item) => (
              <a
                key={item.label}
                href={item.href}
                className="block text-white text-[13px] font-medium px-3 py-2.5 hover:bg-[#003058] transition-colors border-b border-[#003058]/50"
              >
                {item.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
}
