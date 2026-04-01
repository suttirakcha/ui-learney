"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { fetchWithAuth } from "@/lib/api/fetchWithAuth";
import { PieChart, Pie, Cell, Tooltip } from "recharts";

import { DashboardData } from "@/types/dashboard/dashboard";
import { CategoryStat, CoursePerformance } from "@/types/admin/type-admin";

// ================= UTIL =================
function formatMoney(num: number) {
  return "฿" + num.toLocaleString();
}

// ================= MAIN =================
export default function AdminPage() {
  const router = useRouter();

  const [dashboard, setDashboard] = useState<DashboardData | null>(null);
  const [courses, setCourses] = useState<CoursePerformance[]>([]);
  const [categories, setCategories] = useState<CategoryStat[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const [dRes, cRes, catRes] = await Promise.all([
          fetchWithAuth("/admin/dashboard"),
          fetchWithAuth("/admin/course-performance"),
          fetchWithAuth("/admin/categories"),
        ]);

        if (!dRes.ok || !cRes.ok || !catRes.ok) throw new Error();

        const dJson: DashboardData = await dRes.json();
        const cJson: CoursePerformance[] = await cRes.json();
        const catJson: Record<string, number> = await catRes.json();

        setDashboard(dJson);
        setCourses(cJson);

        const arr: CategoryStat[] = Object.entries(catJson).map(
          ([name, value]) => ({
            name,
            value: Number(value),
          }),
        );

        setCategories(arr);
      } catch {
        router.push("/login");
      } finally {
        setLoading(false);
      }
    }

    load();
  }, []);

  if (loading || !dashboard) return <p className="p-10">Loading...</p>;

  const COLORS = ["#06b6d4", "#67e8f9", "#22d3ee"];

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      {/* HEADER */} <h1 className="text-3xl font-bold">Admin Dashboard</h1>{" "}
      <p className="text-gray-500 mb-6">Platform overview and management </p>
      {/* ================= TOP CARDS ================= */}
      <div className="grid grid-cols-4 gap-6 mb-8">
        <Card
          title="Total Revenue"
          value={formatMoney(dashboard.totalRevenue)}
        />

        <Card title="Platform Fee" value={formatMoney(dashboard.platformFee)} />

        <Card title="Total Sales" value={dashboard.totalSales} />

        <Card title="Total Courses" value={dashboard.totalCourses} />
      </div>
      {/* ================= MAIN ================= */}
      <div className="grid grid-cols-3 gap-6">
        {/* COURSE PERFORMANCE */}
        <div className="col-span-2 bg-white rounded-xl shadow p-6">
          <h2 className="font-bold mb-4 text-lg">All Courses Performance</h2>

          {courses.map((c) => (
            <div
              key={c.courseId}
              className="bg-gray-50 rounded-xl p-4 mb-4 shadow-sm"
            >
              <div className="flex justify-between">
                <h3 className="font-semibold">{c.courseName}</h3>
                <span className="text-sm text-gray-500">
                  ⭐ {c.rating} • {c.students} students
                </span>
              </div>

              <div className="grid grid-cols-4 gap-4 mt-4">
                <Stat label="Sales" value={c.sales} />
                <Stat label="Revenue" value={formatMoney(c.revenue)} />
                <Stat label="Platform Fee" value={formatMoney(c.platformFee)} />
                <Stat
                  label="Instructor"
                  value={formatMoney(c.instructorEarn)}
                />
              </div>
            </div>
          ))}
        </div>

        {/* PIE CHART */}
        <div className="bg-white rounded-xl shadow p-6 flex flex-col items-center">
          <h2 className="font-bold mb-4 text-lg">Course Categories</h2>

          <PieChart width={250} height={250}>
            <Pie
              data={categories}
              dataKey="value"
              nameKey="name"
              outerRadius={90}
            >
              {categories.map((_, i) => (
                <Cell key={i} fill={COLORS[i % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>

          <div className="mt-4 text-sm w-full">
            {categories.map((c) => (
              <div key={c.name} className="flex justify-between">
                <span>{c.name}</span>
                <span>{c.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// ================= COMPONENT =================

function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="bg-white rounded-xl p-6 shadow hover:shadow-lg transition flex justify-between items-center hover:bg-green-100">
      <div>
        <p className="text-gray-500 text-sm">{title}</p>
        <h2 className="text-2xl font-bold mt-2">{value}</h2>
      </div>

      <div className="text-xl">💰</div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string | number }) {
  return (
    <div className="bg-cyan-50 rounded-lg p-3 text-center">
      {" "}
      <p className="text-xs text-gray-500">{label}</p>{" "}
      <p className="font-semibold mt-1 text-cyan-700">{value}</p>{" "}
    </div>
  );
}
