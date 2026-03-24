"use client";

import { useEffect, useRef, useState } from "react";
import {
  createChart,
  CandlestickSeries,
  HistogramSeries,
  LineSeries,
  ColorType,
  type IChartApi,
} from "lightweight-charts";
import type { PriceHistoryItem } from "@/services/stockService";

interface Props {
  data: PriceHistoryItem[];
  symbol: string;
}

type Range = "1M" | "3M" | "6M" | "1Y" | "ALL";

function parseDate(ngay: string): number {
  const [dd, mm, yyyy] = ngay.split("/");
  return Date.UTC(Number(yyyy), Number(mm) - 1, Number(dd)) / 1000;
}

function calcMA(data: { time: number; value: number }[], period: number) {
  return data
    .map((_, i) => {
      if (i < period - 1) return null;
      const slice = data.slice(i - period + 1, i + 1);
      const avg = slice.reduce((s, d) => s + d.value, 0) / period;
      return { time: data[i].time, value: Math.round(avg) };
    })
    .filter(Boolean) as { time: number; value: number }[];
}

const RANGE_DAYS: Record<Range, number> = {
  "1M": 30, "3M": 90, "6M": 180, "1Y": 365, ALL: 99999,
};

export default function CandlestickChart({ data, symbol }: Props) {
  const chartRef = useRef<HTMLDivElement>(null);
  const volRef = useRef<HTMLDivElement>(null);
  const chartApi = useRef<IChartApi | null>(null);
  const volApi = useRef<IChartApi | null>(null);
  const [range, setRange] = useState<Range>("3M");
  const [crosshairPrice, setCrosshairPrice] = useState<number | null>(null);
  const [crosshairDate, setCrosshairDate] = useState<string>("");

  const sorted = [...data].sort((a, b) => parseDate(a.Ngay) - parseDate(b.Ngay));
  const now = Date.now() / 1000;
  const filtered = sorted.filter((d) => now - parseDate(d.Ngay) <= RANGE_DAYS[range] * 86400);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ohlcv = filtered.map((d) => ({ time: parseDate(d.Ngay) as any, open: d.GiaMoCua, high: d.GiaCaoNhat, low: d.GiaThapNhat, close: d.GiaDongCua }));
  const closeData = filtered.map((d) => ({ time: parseDate(d.Ngay), value: d.GiaDongCua }));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const volumeData = filtered.map((d) => ({ time: parseDate(d.Ngay) as any, value: d.KhoiLuongKhopLenh, color: d.GiaDongCua >= d.GiaMoCua ? "rgba(34,197,94,0.6)" : "rgba(239,68,68,0.6)" }));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ma20 = calcMA(closeData, 20).map((d) => ({ ...d, time: d.time as any }));
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ma50 = calcMA(closeData, 50).map((d) => ({ ...d, time: d.time as any }));

  useEffect(() => {
    if (!chartRef.current || !volRef.current) return;
    chartApi.current?.remove();
    volApi.current?.remove();

    const chart = createChart(chartRef.current, {
      width: chartRef.current.clientWidth, height: 360,
      layout: { background: { type: ColorType.Solid, color: "#ffffff" }, textColor: "#374151", fontSize: 11 },
      grid: { vertLines: { color: "#f3f4f6" }, horzLines: { color: "#f3f4f6" } },
      rightPriceScale: { borderColor: "#e5e7eb" },
      timeScale: { borderColor: "#e5e7eb", timeVisible: false },
      crosshair: { mode: 1 },
    });
    chartApi.current = chart;

    const candleSeries = chart.addSeries(CandlestickSeries, {
      upColor: "#22c55e", downColor: "#ef4444",
      borderUpColor: "#22c55e", borderDownColor: "#ef4444",
      wickUpColor: "#22c55e", wickDownColor: "#ef4444",
    });
    candleSeries.setData(ohlcv);

    const ma20Series = chart.addSeries(LineSeries, { color: "#f59e0b", lineWidth: 1, priceLineVisible: false, lastValueVisible: false });
    ma20Series.setData(ma20);
    const ma50Series = chart.addSeries(LineSeries, { color: "#8b5cf6", lineWidth: 1, priceLineVisible: false, lastValueVisible: false });
    ma50Series.setData(ma50);

    chart.timeScale().fitContent();

    chart.subscribeCrosshairMove((param) => {
      if (param.seriesData.has(candleSeries)) {
        const d = param.seriesData.get(candleSeries) as { close: number };
        setCrosshairPrice(d.close);
        setCrosshairDate(new Date(Number(param.time) * 1000).toLocaleDateString("vi-VN"));
      }
    });

    const volChart = createChart(volRef.current, {
      width: volRef.current.clientWidth, height: 100,
      layout: { background: { type: ColorType.Solid, color: "#ffffff" }, textColor: "#9ca3af", fontSize: 10 },
      grid: { vertLines: { visible: false }, horzLines: { color: "#f9fafb" } },
      rightPriceScale: { borderColor: "#e5e7eb" },
      timeScale: { borderColor: "#e5e7eb", timeVisible: false },
    });
    volApi.current = volChart;

    const volSeries = volChart.addSeries(HistogramSeries, { priceFormat: { type: "volume" }, priceScaleId: "" });
    volSeries.setData(volumeData);
    volSeries.priceScale().applyOptions({ scaleMargins: { top: 0.1, bottom: 0 } });
    volChart.timeScale().fitContent();

    chart.timeScale().subscribeVisibleTimeRangeChange(() => {
      const tr = chart.timeScale().getVisibleRange();
      if (tr) volChart.timeScale().setVisibleRange(tr);
    });

    const ro = new ResizeObserver(() => {
      if (chartRef.current) chart.applyOptions({ width: chartRef.current.clientWidth });
      if (volRef.current) volChart.applyOptions({ width: volRef.current.clientWidth });
    });
    ro.observe(chartRef.current);

    return () => { ro.disconnect(); chart.remove(); volChart.remove(); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [range, data]);

  const lastClose = filtered[filtered.length - 1]?.GiaDongCua ?? 0;
  const prevClose = filtered[filtered.length - 2]?.GiaDongCua ?? lastClose;
  const changeAbs = lastClose - prevClose;
  const changePct = prevClose ? (changeAbs / prevClose) * 100 : 0;
  const isUp = changeAbs >= 0;

  return (
    <div className="bg-white rounded shadow-sm overflow-hidden">
      <div className="px-4 pt-3 pb-2 border-b border-gray-100">
        <div className="flex items-start justify-between flex-wrap gap-2">
          <div>
            <span className="text-[18px] font-black text-[#004370]">{symbol}</span>
            <span className={`ml-3 text-[22px] font-bold ${isUp ? "text-green-600" : "text-red-500"}`}>
              {lastClose.toLocaleString("en-US")}
            </span>
            <span className={`ml-2 text-[14px] font-semibold ${isUp ? "text-green-600" : "text-red-500"}`}>
              {isUp ? "+" : ""}{changeAbs.toLocaleString("en-US")} ({isUp ? "+" : ""}{changePct.toFixed(2)}%)
            </span>
          </div>
          {crosshairPrice && (
            <div className="text-[12px] text-gray-500">
              {crosshairDate} — <span className="font-semibold text-gray-700">{crosshairPrice.toLocaleString("en-US")}</span>
            </div>
          )}
        </div>
        <div className="flex items-center gap-4 mt-1">
          <span className="flex items-center gap-1 text-[11px] text-gray-500">
            <span className="inline-block w-4 h-[2px] bg-amber-400 rounded" /> MA20
          </span>
          <span className="flex items-center gap-1 text-[11px] text-gray-500">
            <span className="inline-block w-4 h-[2px] bg-purple-500 rounded" /> MA50
          </span>
        </div>
      </div>

      <div className="flex items-center gap-1 px-4 py-2 border-b border-gray-50">
        {(["1M", "3M", "6M", "1Y", "ALL"] as Range[]).map((r) => (
          <button key={r} onClick={() => setRange(r)}
            className={`px-2.5 py-0.5 text-[12px] rounded font-medium transition-colors cursor-pointer ${range === r ? "bg-[#004370] text-white" : "text-gray-500 hover:bg-gray-100"}`}>
            {r}
          </button>
        ))}
      </div>

      <div ref={chartRef} className="w-full" />
      <div className="px-4 pt-1">
        <span className="text-[10px] text-gray-400 font-medium uppercase tracking-wide">Volume</span>
      </div>
      <div ref={volRef} className="w-full" />
    </div>
  );
}
