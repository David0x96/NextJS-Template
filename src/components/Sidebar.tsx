import type { MarketLeader } from "@/services/marketService";
import type { CommodityItem } from "@/services/commodityService";
import SidebarClient from "./SidebarClient";

interface Props {
  leaders: MarketLeader[];
  commodities: CommodityItem[];
}

export default function Sidebar({ leaders, commodities }: Props) {
  return (
    <aside className="space-y-5">
      <SidebarClient leaders={leaders} commodities={commodities} />
    </aside>
  );
}
