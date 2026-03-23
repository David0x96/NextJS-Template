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
 * ✅ Latest news real-time
 * GET /ajax/tinmoi.chn → parse HTML
 */
export async function getLatestNews(): Promise<LatestNewsItem[]> {
  const html = await getText(`${BASE}/ajax/tinmoi.chn`, undefined, 30);
  return parseLatestNews(html);
}

/**
 * ✅ Corporate events calendar (AGM, additional listing...)
 * GET /get-events-history.chn
 */
export async function getEventsHistory(): Promise<EventHistoryItem[]> {
  return get<EventHistoryItem[]>(`${BASE}/get-events-history.chn`, undefined, 300);
}

/**
 * ✅ Securities firm analysis reports
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

// ─── News Detail ──────────────────────────────────────────────────────────────

export interface NewsDetail {
  slug: string;
  title: string;
  sapo: string;
  author: string;
  publishedTime: string;
  ogImage: string;
  category: string;
  categoryUrl: string;
  contentHtml: string;
  tags: string[];
}

function parseNewsDetail(html: string, slug: string): NewsDetail {
  const titleMatch = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const title = titleMatch ? titleMatch[1].replace(/<[^>]+>/g, "").trim() : "";

  const sapoMatch = html.match(/class="sapo"[^>]*>([\s\S]*?)<\/h2>/);
  const sapo = sapoMatch ? sapoMatch[1].replace(/<[^>]+>/g, "").trim() : "";

  const authorMatch = html.match(/<p class="author">([\s\S]*?)<\/p>/);
  const author = authorMatch ? authorMatch[1].replace(/<[^>]+>/g, "").trim() : "";

  const timeMatch = html.match(/"datePublished"\s*:\s*"([^"]+)"/);
  const publishedTime = timeMatch ? timeMatch[1] : "";

  const imgMatch = html.match(/property="og:image"\s+content="([^"]+)"/);
  const ogImage = imgMatch ? imgMatch[1] : "";

  // breadcrumb second item
  const breadcrumbs = [...html.matchAll(/"@id"\s*:\s*"(https:\/\/cafef[^"]+)"[\s\S]*?"name"\s*:\s*"([^"]+)"/g)];
  const category = breadcrumbs[1] ? breadcrumbs[1][2] : "";
  const categoryUrl = breadcrumbs[1] ? breadcrumbs[1][1] : "";

  // article body
  const contentStart = html.indexOf('data-role="content">');
  let contentHtml = "";
  if (contentStart > -1) {
    const chunk = html.slice(contentStart + 'data-role="content">'.length, contentStart + 40000);
    contentHtml = chunk
      .replace(/<script[\s\S]*?<\/script>/gi, "")
      .replace(/<style[\s\S]*?<\/style>/gi, "")
      .replace(/<div[^>]*class="tindnd[^"]*"[\s\S]*?<\/div>\s*<\/div>/gi, "")
      .replace(/<div[^>]*data-marked-zoneid[\s\S]*?<\/div>\s*<\/div>/gi, "")
      .split("</div>")[0] // take up to first major closing div
      || chunk.slice(0, 8000);
  }

  // tags
  const tagBlockMatch = html.match(/pnShowTag[\s\S]*?([\s\S]*?)(?=class="relate|id="comment|<\/div>\s*<\/div>)/);
  const tags: string[] = [];
  if (tagBlockMatch) {
    const tagRe = /<a[^>]*>([^<]+)<\/a>/g;
    let m: RegExpExecArray | null;
    while ((m = tagRe.exec(tagBlockMatch[1])) !== null) {
      const tag = m[1].trim();
      if (tag && tag.length < 60) tags.push(tag);
    }
  }

  return { slug, title, sapo, author, publishedTime, ogImage, category, categoryUrl, contentHtml, tags };
}

/**
 * ✅ Chi tiết bài viết — parse HTML từ cafef.vn/{slug}.chn
 */
export async function getNewsDetail(slug: string): Promise<NewsDetail> {
  const html = await getText(`${BASE}/${slug}.chn`, undefined, 300);
  return parseNewsDetail(html, slug);
}
