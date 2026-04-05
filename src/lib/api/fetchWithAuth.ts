import { getAccessToken, setAccessToken } from "./auth/auth-store";
import { refreshToken } from "./auth/auth.service";

const API_URL = process.env.NEXT_PUBLIC_API!;

export async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {},
) {
  const token = await getAccessToken();
  const requestHeaders = new Headers(options.headers);

  if (token) {
    requestHeaders.set("Authorization", `Bearer ${token}`);
  } else {
    requestHeaders.delete("Authorization");
  }

  if (!requestHeaders.has("Content-Type")) {
    requestHeaders.set("Content-Type", "application/json");
  }

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    credentials: "include", // 🔥 สำคัญสุด
    headers: requestHeaders,
  });

  // 🔥 refresh token ถ้า access token หมด

  if (res.status === 401) {
    const data = await refreshToken().catch(() => {
      setAccessToken(null);
      throw new Error("Session expired");
    });

    setAccessToken(data.accessToken ?? null);
    const refreshedRequestHeaders = new Headers(options.headers);

    if (data.accessToken) {
      refreshedRequestHeaders.set("Authorization", `Bearer ${data.accessToken}`);
    } else {
      refreshedRequestHeaders.delete("Authorization");
    }

    if (!refreshedRequestHeaders.has("Content-Type")) {
      refreshedRequestHeaders.set("Content-Type", "application/json");
    }

    // 🔁 ยิงใหม่
    return await fetch(`${API_URL}${endpoint}`, {
      ...options,
      credentials: "include",
      headers: refreshedRequestHeaders,
    });
  }

  return res;
}
