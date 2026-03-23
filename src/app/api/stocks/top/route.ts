import { NextRequest, NextResponse } from "next/server";
import { getPriceHistory } from "@/services/stockService";
import { toApiDate } from "@/services/foreignService";

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const symbol = searchParams.get("symbol") ?? "VCB";
  const today = toApiDate(new Date());
  const start = searchParams.get("startDate") ?? "01-01-2026";

  const data = await getPriceHistory(symbol, start, today, 1, 20);
  return NextResponse.json(data);
}
