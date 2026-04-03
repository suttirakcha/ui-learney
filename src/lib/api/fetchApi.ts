const API_URL = process.env.NEXT_PUBLIC_API!;

export async function fetchApi(
  endpoint: string,
  options: RequestInit = {},
) {
  const headers = new Headers(options.headers);

  if (options.body && !headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  return fetch(`${API_URL}${endpoint}`, {
    ...options,
    cache: options.cache ?? "no-store",
    headers,
  });
}
