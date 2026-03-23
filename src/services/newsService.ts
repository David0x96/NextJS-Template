/**
 * News Service — cafef.vn
 * ✅ GET /ajax/tinmoi.chn          → HTML → parse
 * ✅ GET /get-events-history.chn   → JSON
 * ✅ GET /du-lieu/Ajax/CafeFData/AnalysisReport.ashx → JSON
 * ✅ GET /ajax/top-event.chn       → HTML
 * ✅ GET /ajax/top-event-menu.chn  → HTML
 */
import { get, getText } from "./httpClient";

const BASE = "https://cafef.vn";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface LatestNewsItem {
  id: string;
  title: string;
  href: string;
  time: string;
}

export interface EventHistoryItem {
  Symbol: string;
  Name: string;
  Link: string;
  Title: string;
  Url: string;
  Date: string;    // "30/03/2026"
  DateStr: string; // "20260330"
}

export interface AnalysisReport {
  title: string;
  link: string;
  symbols: string;
  symbol: string;
  linkStock: string | null;
  date: string;      // "23/03"
  fullDate: string;  // "23/03/2026"
  price: number;
  changePrice: number;
  ImageThumb: string;
}

// ─── HTML parser ──────────────────────────────────────────────────────────────

function parseLatestNews(html: string): LatestNewsItem[] {
  const items: LatestNewsItem[] = [];
  const liRe = /<li[^>]*data-id="([^"]+)"[^>]*>([\s\S]*?)<\/li>/g;
  let m: RegExpExecArray | null;
  while ((m = liRe.exec(html)) !== null) {
    const block = m[2];
    const timeMatch = block.match(/>(\d{1,2}:\d{2})<\/span>/);
    const hrefMatch = block.match(/href="(\/[^"]+)"/);
    const titleMatch = block.match(/<span[^>]*class="inner"[^>]*>([\s\S]*?)<\/span>/);
    if (hrefMatch && titleMatch) {
      items.push({
        id: m[1],
        title: titleMatch[1].trim().replace(/&quot;/g, '"').replace(/&amp;/g, '&').replace(/&#39;/g, "'"),
        href: `https://cafef.vn${hrefMatch[1]}`,
        time: timeMatch ? timeMatch[1] : "",
      });
    }
  }
  return items;
}

// ─── API ──────────────────────────────────────────────────────────────────────

/**
 * ✅ Tin mới nhất real-time
 * GET /ajax/tinmoi.chn → parse HTML
 */
export async function getLatestNews(): Promise<LatestNewsItem[]> {
  const html = await getText(`${BASE}/ajax/tinmoi.chn`, undefined, 30);
  return parseLatestNews(html);
}

/**
 * ✅ Lịch sự kiện doanh nghiệp (ĐHCĐ, niêm yết bổ sung...)
 * GET /get-events-history.chn
 */
export async function getEventsHistory(): Promise<EventHistoryItem[]> {
  return get<EventHistoryItem[]>(`${BASE}/get-events-history.chn`, undefined, 300);
}

/**
 * ✅ Báo cáo phân tích từ CTCK
 * GET /du-lieu/Ajax/CafeFData/AnalysisReport.ashx
 */
export async function getAnalysisReports(take = 20): Promise<AnalysisReport[]> {
  const res = await get<{ Data: AnalysisReport[]; Success: boolean }>(
    `${BASE}/du-lieu/Ajax/CafeFData/AnalysisReport.ashx`,
    { take: String(take) },
    300
  );
  return res.Data;
}

/**
 * ✅ HTML sự kiện nổi bật (swiper)
 * GET /ajax/top-event.chn
 */
export async function getTopEventHtml(): Promise<string> {
  return getText(`${BASE}/ajax/top-event.chn`, undefined, 300);
}
