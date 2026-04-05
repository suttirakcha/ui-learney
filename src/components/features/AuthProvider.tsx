"use client";

import { useEffect, useState } from "react";
import { refreshToken } from "@/lib/api/auth/auth.service";
import { setAccessToken } from "@/lib/api/auth/auth-store"; // ⭐ เพิ่ม

export default function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function init() {
      try {
        const data = await refreshToken();

        // 🔥 สำคัญมาก
        setAccessToken(data.accessToken ?? null);
      } catch {
        // ไม่มี session → ไม่ต้องทำอะไร
      } finally {
        setLoading(false);
      }
    }

    init();
  }, []);

  if (loading) return null;

  return <>{children}</>;
}
