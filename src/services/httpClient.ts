const BASE_HEADERS = {
  "Content-Type": "application/json",
  Referer: "https://cafef.vn/",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
};

export async function get<T>(
  url: string,
  params?: Record<string, string>,
  revalidate = 60
): Promise<T> {
  const fullUrl = params
    ? `${url}?${new URLSearchParams(params).toString()}`
    : url;

  const res = await fetch(fullUrl, {
    headers: BASE_HEADERS,
    next: { revalidate },
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}: ${fullUrl}`);
  return res.json();
}

export async function getText(
  url: string,
  params?: Record<string, string>,
  revalidate = 60
): Promise<string> {
  const fullUrl = params
    ? `${url}?${new URLSearchParams(params).toString()}`
    : url;

  const res = await fetch(fullUrl, {
    headers: BASE_HEADERS,
    next: { revalidate },
  });

  if (!res.ok) throw new Error(`HTTP ${res.status}: ${fullUrl}`);
  return res.text();
}
