import type { ApiError } from "@/types/api/type-api";
import type { Role } from "@/types/user";
import { getAccessToken } from "./auth-store";

const API_URL = process.env.NEXT_PUBLIC_API!;

type AuthUser = {
  id?: string;
  fullname: string;
  image?: string;
  email?: string;
  role: Role;
};

type AuthResponse = {
  user: AuthUser;
  accessToken?: string;
};

type TokenResponse = {
  accessToken: string;
};

type MessageResponse = {
  message: string;
};

async function handleResponse<T>(res: Response): Promise<T> {
  const text = await res.text();

  let data: unknown;

  try {
    data = text ? JSON.parse(text) : {};
  } catch {
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

export async function register(data: {
  fullname: string;
  email: string;
  password: string;
  confirmPassword: string;
}): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/auth/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleResponse(res);
}

export async function login(data: {
  email: string;
  password: string;
}): Promise<AuthResponse> {
  const res = await fetch(`${API_URL}/auth/login`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return handleResponse<AuthResponse>(res);
}

export async function refreshToken(): Promise<TokenResponse> {
  const res = await fetch(`${API_URL}/auth/refresh`, {
    method: "POST",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Session expired");

  return handleResponse<TokenResponse>(res);
}

export async function logout(): Promise<MessageResponse> {
  const res = await fetch(`${API_URL}/auth/logout`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  if (!res.ok) throw new Error("Logout failed");

  return handleResponse<MessageResponse>(res);
}

export async function requestForgotPassword(
  email: string,
): Promise<MessageResponse> {
  const token = await getAccessToken();

  const res = await fetch(`${API_URL}/auth/forgot-password`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify({ email }),
  });

  return handleResponse<MessageResponse>(res);
}

export async function requestResetPassword(token: string, password: string) {
  const accessToken = await getAccessToken();

  const res = await fetch(`${API_URL}/auth/reset-password`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
      ...(accessToken ? { Authorization: `Bearer ${accessToken}` } : {}),
    },
    body: JSON.stringify({
      token,
      password,
    }),
  });

  return handleResponse<MessageResponse>(res);
}
