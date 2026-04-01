import { getAccessToken } from "./auth/auth-store";

export async function fetchWithAuth(url: string) {
  const token = getAccessToken();

  return fetch(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    credentials: "include",
  });
}
