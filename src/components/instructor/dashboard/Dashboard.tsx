"use client";

import { useEffect, useState } from "react";
import { DashboardData } from "@/types/instructor/instructor.type";
import { getInstructorDashboard } from "@/lib/api/dashboard/dashboard.service";
import StatsCards from "./StatsCards";
import CoursesGrid from "./CoursesGrid";

export default function Dashboard() {
  const [data, setData] = useState<DashboardData | null>(null);

  useEffect(() => {
    getInstructorDashboard().then(setData);
  }, []);

  if (!data) return <div className="p-6">Loading...</div>;

  return (
    <div className="p-6 space-y-6">
      {/* Header */}{" "}
      <div className="flex justify-between items-center">
        {" "}
        <div>
          {" "}
          <h1 className="text-2xl font-bold">Instructor Dashboard</h1>{" "}
          <p className="text-gray-500 text-sm">
            Manage courses and track your earnings{" "}
          </p>{" "}
        </div>
        <button className="bg-cyan-500 text-black px-4 py-2 rounded shadow hover:bg-amber-100">
          + Create Course
        </button>
      </div>
      {/* Stats */}
      <StatsCards data={data} />
      {/* Middle Section */}
      <div className="grid grid-cols-3 gap-6">
        {/* Chart */}
        <div className="col-span-2 bg-white p-4 rounded-xl shadow">
          <h2 className="font-semibold mb-4">Earnings Overview</h2>

          <div className="h-40 bg-gradient-tor from-cyan-200 to-cyan-400 rounded-lg" />
        </div>

        {/* Right Panel */}
        <div className="space-y-4">
          {/* Balance */}
          <div className="bg-green-50 p-4 rounded-xl border border-green-200">
            <p className="text-gray-600">Available Balance</p>
            <h2 className="text-2xl font-bold text-green-600">
              ฿{data.totalRevenue.toLocaleString()}
            </h2>

            <button className="mt-4 w-full bg-green-500 text-white py-2 rounded">
              Withdraw Funds
            </button>
          </div>

          {/* Revenue Split */}
          <div className="bg-white p-4 rounded-xl shadow text-center">
            <p className="font-semibold mb-2">Revenue Split</p>

            <div className="w-24 h-24 mx-auto rounded-full border-8 border-cyan-400" />

            <p className="text-sm mt-2 text-gray-500">
              Your earnings vs platform fee
            </p>
          </div>
        </div>
      </div>
      {/* Courses */}
      <CoursesGrid courses={data.courses ?? []} />
    </div>
  );
}
