export const stockIndices = [
  { name: "VN-Index", value: "1.248,75", change: "+5,32", percent: "+0,43%", up: true },
  { name: "HNX-Index", value: "225,18", change: "+1,12", percent: "+0,50%", up: true },
  { name: "UPCOM", value: "93,45", change: "-0,21", percent: "-0,22%", up: false },
  { name: "VN30", value: "1.312,40", change: "+6,80", percent: "+0,52%", up: true },
  { name: "HNX30", value: "461,22", change: "-2,10", percent: "-0,45%", up: false },
];

export const topStocks = [
  { symbol: "VIC", price: "42.500", change: "+500", percent: "+1,19%", up: true },
  { symbol: "VHM", price: "38.200", change: "-300", percent: "-0,78%", up: false },
  { symbol: "VNM", price: "68.900", change: "+200", percent: "+0,29%", up: true },
  { symbol: "HPG", price: "27.350", change: "+450", percent: "+1,67%", up: true },
  { symbol: "MSN", price: "54.100", change: "-100", percent: "-0,18%", up: false },
  { symbol: "TCB", price: "23.800", change: "+350", percent: "+1,49%", up: true },
];

export const featuredNews = [
  {
    id: 1,
    title: "Stock market surges strongly, VN-Index breaks 1,250 points in afternoon session",
    category: "Stocks",
    time: "14 minutes ago",
    image: "https://placehold.co/710x400/e8f0fe/1a73e8?text=CafeF+News",
    hot: true,
  },
  {
    id: 2,
    title: "State Bank injects 50,000 billion VND through OMO channel to support liquidity",
    category: "Finance",
    time: "32 minutes ago",
    image: "https://placehold.co/350x200/fce4ec/c62828?text=Finance+News",
  },
  {
    id: 3,
    title: "SJC gold price surges to 87 million VND/tael, investors rush to buy",
    category: "Commodities",
    time: "1 hour ago",
    image: "https://placehold.co/350x200/fff9c4/f57f17?text=Gold+Price",
  },
  {
    id: 4,
    title: "VND weakens slightly against USD, central exchange rate rises 12 VND",
    category: "Forex",
    time: "2 hours ago",
    image: "https://placehold.co/350x200/e8f5e9/2e7d32?text=Forex",
  },
];

export const latestNews = [
  {
    id: 10,
    title: "Real estate stocks lead the rally, many tickers hit ceiling price in morning session",
    category: "Stocks",
    time: "5 minutes ago",
    image: "https://placehold.co/120x80/e3f2fd/1565c0?text=Stocks",
  },
  {
    id: 11,
    title: "Techcombank reports Q1 profit of 7,200 billion VND, up 22% year-on-year",
    category: "Banking",
    time: "18 minutes ago",
    image: "https://placehold.co/120x80/f3e5f5/6a1b9a?text=Bank",
  },
  {
    id: 12,
    title: "Vingroup injects 10,000 billion VND into VinFast to accelerate EV production",
    category: "Business",
    time: "45 minutes ago",
    image: "https://placehold.co/120x80/e8f5e9/1b5e20?text=Corp",
  },
  {
    id: 13,
    title: "March exports reach 33.5 billion USD, up 14.2% year-on-year",
    category: "Economy",
    time: "1 hour ago",
    image: "https://placehold.co/120x80/fff3e0/e65100?text=Economy",
  },
  {
    id: 14,
    title: "FPT signs AI contract worth 500 million USD with Japanese partner in manufacturing sector",
    category: "Technology",
    time: "2 hours ago",
    image: "https://placehold.co/120x80/fce4ec/880e4f?text=Tech",
  },
  {
    id: 15,
    title: "Prime Minister calls for lower lending rates to support small and medium enterprises",
    category: "Policy",
    time: "3 hours ago",
    image: "https://placehold.co/120x80/e0f7fa/006064?text=Policy",
  },
];

export const investorNews = [
  {
    id: 20,
    title: "Expert insight: Where are the most attractive investment opportunities in Q2/2026?",
    category: "Expert View",
    time: "30 minutes ago",
    image: "https://placehold.co/280x160/e8eaf6/283593?text=Expert",
  },
  {
    id: 21,
    title: "Top 10 stocks recommended BUY for the week of March 23-27, 2026",
    category: "Analysis",
    time: "1 hour ago",
    image: "https://placehold.co/280x160/e0f2f1/004d40?text=Analysis",
  },
  {
    id: 22,
    title: "Corporate bond investment strategy amid cooling interest rates",
    category: "Bonds",
    time: "2 hours ago",
    image: "https://placehold.co/280x160/fff8e1/ff6f00?text=Bonds",
  },
];

export const commodityPrices = [
  { name: "SJC Gold (mil/tael)", buy: "86.800", sell: "87.000", change: "+300", up: true },
  { name: "999.9 Gold Ring",     buy: "83.500", sell: "84.000", change: "+200", up: true },
  { name: "USD (VCB)",           buy: "25.150", sell: "25.480", change: "+30",  up: true },
  { name: "EUR (VCB)",           buy: "27.200", sell: "28.400", change: "-50",  up: false },
  { name: "Crude Oil (USD/bbl)", buy: "71.45",  sell: "71.45",  change: "-0.32", up: false },
];

export const navMenu = [
  {
    label: "Home",
    href: "/",
  },
  {
    label: "Stocks",
    href: "/stocks",
    sub: ["Market", "Technical Analysis", "Featured Stocks", "IPO", "Derivatives"],
  },
  {
    label: "Finance",
    href: "/finance",
    sub: ["Banking", "Insurance", "Credit", "Interest Rates"],
  },
  {
    label: "Business",
    href: "/business",
    sub: ["Corporate News", "Earnings", "M&A", "Startup"],
  },
  {
    label: "Real Estate",
    href: "/real-estate",
    sub: ["Property Market", "Projects", "Legal"],
  },
  {
    label: "Commodities",
    href: "/commodities",
    sub: ["Gold", "Forex", "Oil & Gas", "Agriculture"],
  },
  {
    label: "Macro",
    href: "/macro",
    sub: ["Domestic", "Global", "Policy"],
  },
  {
    label: "Investors",
    href: "/investors",
    sub: ["Expert View", "Analysis", "Strategy"],
  },
  {
    label: "iTable",
    href: "/itable",
  },
];
