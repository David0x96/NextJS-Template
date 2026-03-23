/**
 * Market Service — msh-appdata.cafef.vn
 * ✅ GET /rest-api/api/v1/MarketLeaderGroup
 */
import { get } from "./httpClient";

const MSH_BASE = "https://msh-appdata.cafef.vn/rest-api/api/v1";

export interface MarketLeader {
  symbol: string;
  score: number;        // positive = pushing up, negative = dragging down
  scorePercent: number;
  companyName: string;
}

/** Used for Header/StockBoard — no live endpoint found for indices, using mock */
export interface MarketIndex {
  IndexId: number;
  Name: string;
  IndexValue: number;
  Change: number;
  PercentChange: number;
  TotalVolume: number;
  TotalValue: number;
  Advances: number;
  Declines: number;
  NoChange: number;
  Time: string;
  Up: boolean;
}

const MOCK_INDICES: MarketIndex[] = [
  { IndexId: 1,  Name: "VN-Index",  IndexValue: 1248.75, Change: 5.32,  PercentChange: 0.43,  TotalVolume: 620000000, TotalValue: 18200000000000, Advances: 210, Declines: 95, NoChange: 45, Time: "14:35", Up: true  },
  { IndexId: 2,  Name: "HNX-Index", IndexValue: 225.18,  Change: 1.12,  PercentChange: 0.50,  TotalVolume: 95000000,  TotalValue: 1800000000000,  Advances: 88,  Declines: 42, NoChange: 28, Time: "14:35", Up: true  },
  { IndexId: 9,  Name: "UPCOM",     IndexValue: 93.45,   Change: -0.21, PercentChange: -0.22, TotalVolume: 45000000,  TotalValue: 620000000000,   Advances: 110, Declines: 78, NoChange: 55, Time: "14:35", Up: false },
  { IndexId: 11, Name: "VN30",      IndexValue: 1312.40, Change: 6.80,  PercentChange: 0.52,  TotalVolume: 280000000, TotalValue: 9800000000000,  Advances: 22,  Declines: 6,  NoChange: 2,  Time: "14:35", Up: true  },
  { IndexId: 12, Name: "HNX30",     IndexValue: 461.22,  Change: -2.10, PercentChange: -0.45, TotalVolume: 38000000,  TotalValue: 890000000000,   Advances: 10,  Declines: 18, NoChange: 2,  Time: "14:35", Up: false },
];

export async function getMarketIndices(): Promise<MarketIndex[]> {
  return MOCK_INDICES;
}

/**
 * ✅ Top stocks influencing VN-Index
 * @param centerId 1 = HOSE, 2 = HNX
 */
export async function getMarketLeaders(
  centerId = 1,
  take = 10
): Promise<MarketLeader[]> {
  const data = await get<{ data: MarketLeader[] }>(
    `${MSH_BASE}/MarketLeaderGroup`,
    { centerId: String(centerId), take: String(take) },
    30
  );
  return data.data;
}
