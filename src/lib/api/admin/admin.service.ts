import { cookies } from "next/headers";

const API_URL = process.env.NEXT_PUBLIC_API!;

async function safeJson(res: Response) {
  const text = await res.text();

  let data;

  try {
    data = JSON.parse(text);
  } catch {
    console.error("❌ NOT JSON:", text);
    throw new Error("Invalid API response");
  }

  if (!res.ok) {
    throw new Error(data?.message || "API error");
  }

  return data;
}

export async function getDashboardServer() {
  const cookieStore = await cookies(); // ✅ ต้อง await
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("Unauthorized");

  const res = await fetch(`${API_URL}/admin/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  return safeJson(res);
}

export async function getPendingServer() {
  const cookieStore = await cookies(); // ✅ ต้อง await
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("Unauthorized");

  const res = await fetch(`${API_URL}/admin/courses/pending`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  return safeJson(res);
}

// client side (ไม่ต้องแก้)
export async function getDashboard() {
  const token =
    localStorage.getItem("token") || sessionStorage.getItem("token");

  const res = await fetch(`${API_URL}/admin/dashboard`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!res.ok) throw new Error("Failed to fetch dashboard");

  return res.json();
}
// ================= NEW (dashboard extra) =================

// 📊 course performance
export async function getCoursePerformanceServer() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("Unauthorized");

  const res = await fetch(`${API_URL}/admin/course-performance`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  return safeJson(res);
}

// 📊 category stats
export async function getCategoriesServer() {
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) throw new Error("Unauthorized");

  const res = await fetch(`${API_URL}/admin/categories`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  });

  return safeJson(res);
}
