import { useAuthStore } from "@/lib/api/useAuthStore";

const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

export async function fetchWithZustandAuth<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = new URL(endpoint, baseURL);

  // ดึง Token จาก Zustand Store โดยตรง (ทำงานได้ทันทีไม่ต้องใช้ Hook)
  const token = useAuthStore.getState().accessToken;

  const headers = new Headers(options.headers);
  if (!headers.has("Content-Type")) {
    headers.set("Content-Type", "application/json");
  }

  // ถ้ามี Token ให้แนบไปกับ Header
  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  const res = await fetch(url.toString(), {
    ...options,
    headers,
  });

  if (!res.ok) {
    if (res.status === 401) {
      // เคลียร์ Auth state ถ้าระบบแจ้งว่า Token ไม่ถูกต้อง/หมดอายุ
      useAuthStore.getState().logout();
    }

    const errorData = await res.json().catch(() => ({}));
    const error = new Error(errorData.message || "API Error") as Error & {
      response?: {
        data: unknown;
        status: number;
      };
    };
    error.response = { data: errorData, status: res.status };
    throw error;
  }

  return res.json() as Promise<T>;
}
