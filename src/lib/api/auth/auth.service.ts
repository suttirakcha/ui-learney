const API_URL = process.env.NEXT_PUBLIC_API!;

import { ApiError } from "@/types/api/type-api";
// import { LoginResponse } from "@/types/auth/type-auth";
import { setAccessToken } from "./auth-store";

async function handleResponse<T>(res: Response): Promise<T> {
  const text = await res.text();

  let data: unknown;

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
    console.error("❌ NOT JSON:", text);
    throw new Error("API response is not JSON");
  }

  if (!res.ok) {
    const parsed =
      typeof data === "object" && data !== null
        ? (data as { message?: string; code?: string })
        : {};

    const error: ApiError = {
      status: res.status,
      message: parsed.message || "Something went wrong",
      code: parsed.code,
      data,
    };

    throw error;
  }

  return data as T;
}

// ===============================
// ✅ REGISTER
// ===============================
export async function register(data: {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}) {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleResponse(res);
}

// ===============================
// ✅ LOGIN
// ===============================
export async function login(data: { email: string; password: string }) {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Login failed");

  const result = await res.json();

  return result;
}

export async function refreshToken() {
  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Session expired");

  const data = await handleResponse<{ accessToken: string }>(res);

  return data;
}

export async function logout() {
  const res = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Logout failed");

  return res;
}
