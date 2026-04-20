import { getAccessToken, setAccessToken } from "./auth/auth-store";
import { refreshToken } from "./auth/auth.service";

const API_URL = process.env.NEXT_PUBLIC_API!;

function buildRequestHeaders(
  token: string | null,
  headers?: HeadersInit,
): Headers {
  const requestHeaders = new Headers(headers);

  if (token) {
    requestHeaders.set("Authorization", `Bearer ${token}`);
  } else {
    requestHeaders.delete("Authorization");
  }

  if (!requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }

  return requestHeaders;
}

export async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {},
) {
  const token = await getAccessToken();
  const requestHeaders = buildRequestHeaders(token, options.headers);

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    cache: options.cache ?? "no-store",
    credentials: "include",
    headers: requestHeaders,
  });

  if (res.status === 401) {
    const data = await refreshToken().catch(() => {
      setAccessToken(null);
      throw new Error("Session expired");
    });

    setAccessToken(data.accessToken ?? null);
    const refreshedRequestHeaders = buildRequestHeaders(
      data.accessToken ?? null,
      options.headers,
    );

    return fetch(`${API_URL}${endpoint}`, {
      ...options,
      cache: options.cache ?? "no-store",
      credentials: "include",
      headers: refreshedRequestHeaders,
    });
  }

  return res;
}
