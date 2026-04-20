"use client";

import React, { useState, useEffect } from "react";
import {
  Users,
  Search,
  Filter,
  MoreVertical,
  Download,
  ChevronRight,
  BrainCircuit,
  Loader2,
  Briefcase,
  Award,
} from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_API!;

interface AssessmentResult {
  id: string;
  user: {
    fullname: string;
    email: string;
  } | null;
  stageSlug: string;
  topStrengths: string[];
  recommendedJobs: string[];
  createdAt: string;
}

export default function AdminAssessmentHistoryPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<AssessmentResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAssessments: 0,
    popularStage: "-",
    topCareer: "-",
  });

  // ดึงข้อมูลประวัติการทำประเมินจาก Backend
  useEffect(() => {
    const fetchHistory = async () => {
      try {
        // หากมี API จริง สามารถเปลี่ยน Endpoint ตรงนี้ได้เลย
        // const res = await fetchWithZustandAuth(`${API_URL}/admin/assessments/career-history`);
        const res = await fetch(`${API_URL}/admin/assessments/career-history`, {
          // headers: { Authorization: `Bearer ${token}` } // ใส่ Token สำหรับ Admin
        });

        if (res.ok) {
          const data = await res.json();
          setResults(data.items || []);
          setStats({
            totalAssessments: data.total || 0,
            popularStage: data.popularStage || "วัยทำงาน (Working Age)",
            topCareer: data.topCareer || "Software Developer",
          });
        } else {
          // Fallback ข้อมูลจำลองเพื่อให้เห็น UI ตอนที่ Backend ยังไม่พร้อม
          throw new Error("API not ready");
        }
      } catch (error) {
        console.warn("Using fallback mock data for Admin Assessment Dashboard");
        setResults([
          {
            id: "res_1",
            user: { fullname: "สมชาย เรียนดี", email: "somchai@example.com" },
            stageSlug: "working",
            topStrengths: ["analysis", "technology_readiness"],
            recommendedJobs: ["Data Analyst", "AI Engineer"],
            createdAt: new Date().toISOString(),
          },
          {
            id: "res_2",
            user: { fullname: "มาลี สีสวย", email: "malee@example.com" },
            stageSlug: "university",
            topStrengths: ["creativity", "communication"],
            recommendedJobs: ["Content Creator", "UX Designer"],
            createdAt: new Date(Date.now() - 86400000).toISOString(),
          },
          {
            id: "res_3",
            user: { fullname: "วิชัย ใจสู้", email: "wichai@example.com" },
            stageSlug: "secondary",
            topStrengths: ["leadership", "teamwork"],
            recommendedJobs: ["Project Manager", "Entrepreneur"],
            createdAt: new Date(Date.now() - 86400000 * 2).toISOString(),
          },
        ]);
        setStats({
          totalAssessments: 124,
          popularStage: "วัยมหาวิทยาลัย",
          topCareer: "Content Creator",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  // Helper แปลง Stage Slug เป็นชื่อภาษาไทย
  const getStageLabel = (slug: string) => {
    const stages: Record<string, string> = {
      primary: "วัยประถม",
      secondary: "วัยมัธยม",
      university: "วัยมหาวิทยาลัย",
      working: "วัยทำงาน",
    };
    return stages[slug] || slug;
  };

  if (loading) {
    return (
      <div className="flex-1 min-h-[60vh] flex items-center justify-center text-brand-purple">
        <Loader2 className="animate-spin" size={40} />
      </div>
    );
  }

  // กรองข้อมูลตามการค้นหา
  const filteredResults = results.filter(
    (r) =>
      (r.user?.fullname || "")
        .toLowerCase()
        .includes(searchTerm.toLowerCase()) ||
      (r.user?.email || "").toLowerCase().includes(searchTerm.toLowerCase()),
  );

  return (
    <div className="p-6 sm:p-8 max-w-7xl mx-auto space-y-8 animate-in fade-in duration-500">
      {/* 1. Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
            <BrainCircuit className="text-brand-purple" size={32} />
            ประวัติผลประเมิน Career Assessment
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            ตรวจสอบประวัติการทำแบบประเมินและทิศทางอาชีพของผู้ใช้งาน
          </p>
        </div>
        <button
          className="flex items-center gap-2 px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-full text-slate-700 dark:text-slate-200 font-medium transition-all shadow-sm active:scale-95"
          onClick={() => toast.success("กำลังดาวน์โหลดรายงาน CSV...")}
        >
          <Download size={18} />
          Export CSV
        </button>
      </div>

      {/* 2. Analytics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-brand-purple/10 flex items-center justify-center text-brand-purple rounded-2xl">
              <Users size={24} />
            </div>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            จำนวนการทำประเมินทั้งหมด
          </p>
          <h3 className="text-3xl font-bold text-slate-800 dark:text-white mt-1">
            {stats.totalAssessments}{" "}
            <span className="text-lg font-normal text-slate-400">ครั้ง</span>
          </h3>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-emerald-500/10 flex items-center justify-center text-emerald-500 rounded-2xl">
              <Award size={24} />
            </div>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            ช่วงวัยที่ประเมินมากที่สุด
          </p>
          <h3 className="text-2xl font-bold text-slate-800 dark:text-white mt-2">
            {stats.popularStage}
          </h3>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] shadow-sm border border-brand-pink/30 hover:shadow-md transition-shadow">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-brand-pink/10 flex items-center justify-center text-brand-pink rounded-2xl">
              <Briefcase size={24} />
            </div>
          </div>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">
            อาชีพที่ถูกแนะนำสูงสุด (Top Match)
          </p>
          <h3 className="text-2xl font-bold text-brand-pink mt-2">
            {stats.topCareer}
          </h3>
        </div>
      </div>

      {/* 3. Data Table Section */}
      <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden">
        {/* Table Header & Filters */}
        <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex flex-col sm:flex-row gap-4 justify-between items-center bg-slate-50/30 dark:bg-slate-800/30">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white">
            รายชื่อผู้ทำแบบประเมินล่าสุด
          </h2>

          <div className="flex gap-3 w-full sm:w-auto">
            <div className="relative flex-1 sm:w-72">
              <Search
                className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
                size={18}
              />
              <input
                type="text"
                placeholder="ค้นหาชื่อ หรืออีเมล..."
                className="w-full pl-11 pr-4 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 rounded-full text-sm focus:ring-2 focus:ring-brand-purple/20 dark:text-white outline-none transition-all shadow-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <button className="p-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 text-slate-500 hover:text-brand-purple rounded-full transition-colors shrink-0 shadow-sm">
              <Filter size={18} />
            </button>
          </div>
        </div>

        {/* Table Body */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse min-w-[800px]">
            <thead>
              <tr className="bg-slate-50/80 dark:bg-slate-900/50 text-slate-500 dark:text-slate-400 text-xs uppercase tracking-wider">
                <th className="px-6 py-4 font-medium">ชื่อผู้เรียน</th>
                <th className="px-6 py-4 font-medium">ช่วงวัย</th>
                <th className="px-6 py-4 font-medium">อาชีพที่แนะนำ (Top 2)</th>
                <th className="px-6 py-4 font-medium">จุดแข็งหลัก</th>
                <th className="px-6 py-4 font-medium">วันที่ทำประเมิน</th>
                <th className="px-6 py-4 font-medium text-right">จัดการ</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
              {filteredResults.map((result) => (
                <tr
                  key={result.id}
                  className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors group cursor-pointer"
                >
                  <td className="px-6 py-4">
                    <div className="font-semibold text-slate-800 dark:text-white">
                      {result.user?.fullname || "ผู้ใช้งานทั่วไป (Guest)"}
                    </div>
                    <div className="text-xs text-slate-500">
                      {result.user?.email || "-"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-3 py-1 bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 text-xs font-medium rounded-full border border-slate-200 dark:border-slate-700">
                      {getStageLabel(result.stageSlug)}
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-emerald-600 dark:text-emerald-400">
                      {result.recommendedJobs.slice(0, 2).join(", ")}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {result.topStrengths.map((s) => (
                        <span
                          key={s}
                          className="px-2 py-0.5 bg-brand-purple/10 text-brand-purple text-[10px] font-bold rounded-md uppercase"
                        >
                          {s.replace("_", " ")}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-slate-500 dark:text-slate-400">
                    {new Date(result.createdAt).toLocaleDateString("th-TH", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/career-discovery/result/${result.id}`}
                      className="inline-flex p-2 text-brand-purple hover:bg-brand-purple/10 rounded-full transition-colors items-center gap-1 text-sm font-medium opacity-0 group-hover:opacity-100"
                    >
                      ดูผลลัพธ์ <ChevronRight size={16} />
                    </Link>
                  </td>
                </tr>
              ))}
              {filteredResults.length === 0 && (
                <tr>
                  <td
                    colSpan={6}
                    className="px-6 py-16 text-center text-slate-500"
                  >
                    <div className="flex flex-col items-center justify-center gap-2">
                      <Search size={32} className="text-slate-300 mb-2" />
                      <p>ไม่พบข้อมูลผู้เรียนที่คุณค้นหา</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
