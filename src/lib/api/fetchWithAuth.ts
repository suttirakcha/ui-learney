import { getAccessToken, setAccessToken } from "./auth/auth-store";

const API_URL = process.env.NEXT_PUBLIC_API!;

export async function fetchWithAuth(
  endpoint: string,
  options: RequestInit = {},
) {
  const token = getAccessToken();

  let res = await fetch(`${API_URL}${endpoint}`, {
    ...options,
    headers: {
      ...options.headers,
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  // 🔥 ถ้า token หมด
  if (res.status === 401) {
    const refreshRes = await fetch(`${API_URL}/auth/refresh`, {
      method: "POST",
      credentials: "include",
    });

    if (!refreshRes.ok) {
      throw new Error("Session expired");
    }

    const data = await refreshRes.json();

    setAccessToken(data.accessToken);

    // 🔁 ยิงใหม่
    res = await fetch(`${API_URL}${endpoint}`, {
      ...options,
      headers: {
        ...options.headers,
        Authorization: `Bearer ${data.accessToken}`,
        "Content-Type": "application/json",
      },
      credentials: "include",
    });
  }

  return res;
}
