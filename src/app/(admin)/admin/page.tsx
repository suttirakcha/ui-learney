"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "@/lib/api/fetchWithAuth";
import { DashboardData } from "@/types/dashboard/dashboard";

export default function AdminPage() {
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const res = await fetchWithAuth("/admin/dashboard");

        if (!res.ok) throw new Error();

        const json = await res.json();
        setData(json);
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading) return <p>Loading...</p>;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      <aside className="w-64 bg-white shadow-lg p-6">
        <h2 className="text-xl font-bold mb-6">Admin Panel</h2>
      </aside>

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold mb-6">Dashboard</h1>

        <div className="grid grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <p>Courses</p>
            <h2>{data?.totalCourses}</h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p>Pending</p>
            <h2>{data?.pending}</h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p>Approved</p>
            <h2>{data?.approved}</h2>
          </div>

          <div className="bg-white p-6 rounded-xl shadow">
            <p>Users</p>
            <h2>{data?.totalUsers}</h2>
          </div>
        </div>
      </main>
    </div>
  );
}
