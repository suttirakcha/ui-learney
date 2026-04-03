import { getAccessToken, setAccessToken } from "./auth/auth-store";
import { refreshToken } from "./auth/auth.service";

const API_URL = process.env.NEXT_PUBLIC_API!;

export async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {},
) {
  const token = await getAccessToken();

  const res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...(options.headers || {}),
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  // 🔥 refresh token ถ้า access token หมด

  if (res.status === 401) {
    const data = await refreshToken();

    setAccessToken(data.accessToken);

    // 🔁 ยิงใหม่
    return await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        ...(options.headers || {}),
        Authorization: `Bearer ${data.accessToken}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  }

  return res;
}
