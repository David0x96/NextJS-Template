/**
 * Stock Service — cafef.vn
 * ✅ GET /du-lieu/Ajax/PageNew/DataHistory/PriceHistory.ashx
 * (s.cafef.vn/Ajax/... → 301 redirect to cafef.vn/du-lieu/Ajax/...)
 */
import { get } from "./httpClient";

const BASE = "https://cafef.vn";

export interface PriceHistoryItem {
  Ngay: string;
  GiaDieuChinh: number;
  GiaDongCua: number;
  ThayDoi: string;
  KhoiLuongKhopLenh: number;
  GiaTriKhopLenh: number;
  KLThoaThuan: number;
  GtThoaThuan: number;
  GiaMoCua: number;
  GiaCaoNhat: number;
  GiaThapNhat: number;
}

export interface PriceHistoryResponse {
  Data: { TotalCount: number; Data: PriceHistoryItem[] };
  Message: string | null;
  Success: boolean;
}

/**
 * Lấy lịch sử giá cổ phiếu
 * @param symbol    "VCB"
 * @param startDate "dd-MM-yyyy"
 * @param endDate   "dd-MM-yyyy"
 */
export async function getPriceHistory(
  symbol: string,
  startDate: string,
  endDate: string,
  pageIndex = 1,
  pageSize = 20
): Promise<PriceHistoryResponse> {
  return get<PriceHistoryResponse>(
    `${BASE}/du-lieu/Ajax/PageNew/DataHistory/PriceHistory.ashx`,
    { Symbol: symbol, StartDate: startDate, EndDate: endDate, PageIndex: String(pageIndex), PageSize: String(pageSize) },
    60
  );
}
