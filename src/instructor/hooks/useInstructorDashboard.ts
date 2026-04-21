"use client";

import { useEffect, useState } from "react";
import { DashboardStats } from "@/types/instructor";

export function useInstructorDashboard() {
  const [data, setData] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadDashboard = async (signal?: AbortSignal) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch("/api/instructor/dashboard", {
        credentials: "include",
        signal,
      });

      if (!response.ok) {
        throw new Error("ไม่สามารถโหลดแดชบอร์ดได้");
      }

      const payload = (await response.json()) as DashboardStats;
      setData(payload);
    } catch (err) {
      if (signal?.aborted) {
        return;
      }

      setError(err instanceof Error ? err.message : "เกิดข้อผิดพลาด");
    } finally {
      if (!signal?.aborted) {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    const controller = new AbortController();

    void loadDashboard(controller.signal);

    return () => {
      controller.abort();
    };
  }, []);

  return {
    data,
    loading,
    error,
    refetch: () => loadDashboard(),
  };
}
