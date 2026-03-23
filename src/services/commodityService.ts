/**
 * Commodity Service
 * ❌ CafeF không có endpoint JSON công khai cho giá vàng/ngoại hối
 * → Dùng mock đến khi tìm được endpoint thực
 */
export interface CommodityItem {
  Name: string;
  Buy: string;
  Sell: string;
  Change: string;
  Up: boolean;
}

export async function getCommodityPrices(): Promise<CommodityItem[]> {
  return [
    { Name: "Vàng SJC (tr.đ/lượng)",  Buy: "86.800", Sell: "87.000", Change: "+300",  Up: true  },
    { Name: "Vàng nhẫn 9999",          Buy: "83.500", Sell: "84.000", Change: "+200",  Up: true  },
    { Name: "USD (VCB)",               Buy: "25.150", Sell: "25.480", Change: "+30",   Up: true  },
    { Name: "EUR (VCB)",               Buy: "27.200", Sell: "28.400", Change: "-50",   Up: false },
    { Name: "Dầu thô (USD/thùng)",     Buy: "71,45",  Sell: "71,45",  Change: "-0,32", Up: false },
  ];
}
