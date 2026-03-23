/**
 * Foreign Trading Service — msh-appdata.cafef.vn
 * ✅ GET /rest-api/api/v1/OverviewOrgnizaztion/0/{date}/{take}
 */
import { get } from "./httpClient";

const MSH_BASE = "https://msh-appdata.cafef.vn/rest-api/api/v1";

export interface ForeignTradingItem {
  buyVol: number;
  buyVal: number;
  sellVol: number;
  sellVal: number;
  netVol: number;
  netVal: number;
  date: string; // "2026-03-23T10:58:03.033+07:00"
}

/**
 * ✅ Foreign investor trading by ticker
 * @param symbol "VCB"
 * @param date   "dd-MM-yyyy"
 * @param take   number of sessions (default 15)
 */
export async function getForeignTrading(
  symbol: string,
  date: string,
  take = 15
): Promise<ForeignTradingItem[]> {
  return get<ForeignTradingItem[]>(
    `${MSH_BASE}/OverviewOrgnizaztion/0/${date}/${take}`,
    { symbol },
    60
  );
}

export function toApiDate(d: Date): string {
  const dd = String(d.getDate()).padStart(2, "0");
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  return `${dd}-${mm}-${d.getFullYear()}`;
}
