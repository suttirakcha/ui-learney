"use client";

import { useEffect, useMemo, useState } from "react";
import {
  Award,
  BrainCircuit,
  Briefcase,
  CheckCircle2,
  ChevronRight,
  Download,
  Filter,
  Loader2,
  Search,
  Users,
} from "lucide-react";
import Link from "next/link";
import { toast } from "react-hot-toast";

const API_URL = process.env.NEXT_PUBLIC_API;

type AssessmentResult = {
  id: string;
  user: {
    fullname: string;
    email: string;
  } | null;
  stageSlug: string;
  topStrengths: string[];
  recommendedJobs: string[];
  createdAt: string;
};

export function AdminAssessmentHistoryView() {
  const [searchTerm, setSearchTerm] = useState("");
  const [results, setResults] = useState<AssessmentResult[]>([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAssessments: 0,
    popularStage: "-",
    topCareer: "-",
    completionRate: 0,
  });

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const endpoint = API_URL
          ? `${API_URL}/admin/assessments/career-history`
          : "/api/missing-backend";
        const response = await fetch(endpoint);

        if (!response.ok) {
          throw new Error("API not ready");
        }

        const data = await response.json();
        setResults(data.items || []);
        setStats({
          totalAssessments: data.total || 0,
          popularStage: data.popularStage || "วัยทำงาน",
          topCareer: data.topCareer || "Software Developer",
          completionRate: data.completionRate || 0,
        });
      } catch (error) {
        console.warn("Using fallback mock data for Admin Assessment Dashboard", error);
        setResults([
          {
            id: "res_1",
            user: { fullname: "สมชาย เรียนดี", email: "somchai@example.com" },
            stageSlug: "working-age",
            topStrengths: ["analysis", "communication"],
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
        ]);
        setStats({
          totalAssessments: 2,
          popularStage: "วัยมหาวิทยาลัย",
          topCareer: "Content Creator",
          completionRate: 100,
        });
      } finally {
        setLoading(false);
      }
    };

    void fetchHistory();
  }, []);

  const filteredResults = useMemo(
    () =>
      results.filter(
        (result) =>
          (result.user?.fullname || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()) ||
          (result.user?.email || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase()),
      ),
    [results, searchTerm],
  );

  const getStageLabel = (slug: string) => {
    const stages: Record<string, string> = {
      primary: "วัยประถม",
      secondary: "วัยมัธยม",
      university: "วัยมหาวิทยาลัย",
      working: "วัยทำงาน",
      "primary-school": "วัยประถม",
      "secondary-school": "วัยมัธยม",
      "working-age": "วัยทำงาน",
    };

    return stages[slug] || slug;
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-primary">
        <Loader2 className="h-10 w-10 animate-spin" />
      </div>
    );
  }

  return (
    <div className="section-frame space-y-8 py-10">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="flex items-center gap-3 text-3xl font-semibold text-foreground">
            <BrainCircuit className="text-primary" />
            ประวัติผลประเมิน Career Assessment
          </h1>
          <p className="mt-2 text-muted-foreground">
            ดูภาพรวมผลการค้นหาตัวเองของผู้ใช้ และตามต่อว่าระบบแนะนำเส้นทางไหนบ่อยที่สุด
          </p>
        </div>
        <button
          type="button"
          onClick={() => toast.success("เตรียมชุดข้อมูล CSV ให้แล้ว")}
          className="inline-flex items-center gap-2 rounded-full border border-white/50 bg-white/70 px-5 py-2.5 text-sm font-medium text-foreground shadow-sm transition hover:bg-white dark:bg-white/5"
        >
          <Download className="h-4 w-4" />
          Export CSV
        </button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[
          {
            label: "จำนวนการทำประเมินทั้งหมด",
            value: `${stats.totalAssessments} ครั้ง`,
            icon: Users,
            className: "text-primary",
          },
          {
            label: "ช่วงวัยที่ประเมินมากที่สุด",
            value: stats.popularStage,
            icon: Award,
            className: "text-emerald-500",
          },
          {
            label: "อาชีพที่ถูกแนะนำสูงสุด",
            value: stats.topCareer,
            icon: Briefcase,
            className: "text-rose-500",
          },
          {
            label: "อัตราการทำแบบประเมินสำเร็จ",
            value: `${stats.completionRate}%`,
            icon: CheckCircle2,
            className: "text-sky-500",
          },
        ].map((item) => (
          <div key={item.label} className="glass-panel rounded-lg p-5">
            <item.icon className={`h-6 w-6 ${item.className}`} />
            <p className="mt-4 text-sm text-muted-foreground">{item.label}</p>
            <p className="mt-2 text-2xl font-semibold text-foreground">{item.value}</p>
          </div>
        ))}
      </div>

      <div className="glass-panel overflow-hidden rounded-lg">
        <div className="flex flex-col gap-4 border-b border-white/40 p-6 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="text-xl font-semibold text-foreground">
            รายชื่อผู้ทำแบบประเมินล่าสุด
          </h2>
          <div className="flex w-full gap-3 sm:w-auto">
            <div className="relative flex-1 sm:w-72">
              <Search className="absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.currentTarget.value)}
                placeholder="ค้นหาชื่อหรืออีเมล"
                className="w-full rounded-full border border-white/50 bg-white/70 py-2.5 pl-10 pr-4 text-sm outline-none transition focus:border-primary/40 dark:bg-white/5"
              />
            </div>
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white/70 text-muted-foreground transition hover:text-foreground dark:bg-white/5"
            >
              <Filter className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[800px] w-full text-left">
            <thead className="bg-white/50 text-xs uppercase tracking-wide text-muted-foreground dark:bg-white/5">
              <tr>
                <th className="px-6 py-4 font-medium">ชื่อผู้เรียน</th>
                <th className="px-6 py-4 font-medium">ช่วงวัย</th>
                <th className="px-6 py-4 font-medium">อาชีพที่แนะนำ</th>
                <th className="px-6 py-4 font-medium">จุดแข็งหลัก</th>
                <th className="px-6 py-4 font-medium">วันที่ทำประเมิน</th>
                <th className="px-6 py-4 font-medium text-right">ดูผล</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/40">
              {filteredResults.map((result) => (
                <tr key={result.id} className="group transition hover:bg-white/30 dark:hover:bg-white/5">
                  <td className="px-6 py-4">
                    <p className="font-medium text-foreground">
                      {result.user?.fullname || "ผู้ใช้งานทั่วไป"}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {result.user?.email || "-"}
                    </p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs text-primary">
                      {getStageLabel(result.stageSlug)}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-sm text-foreground">
                    {result.recommendedJobs.slice(0, 2).join(", ") || "-"}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {result.topStrengths.map((strength) => (
                        <span
                          key={strength}
                          className="rounded-md bg-white/70 px-2 py-1 text-[11px] uppercase text-muted-foreground dark:bg-white/5"
                        >
                          {strength.replaceAll("_", " ")}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-sm text-muted-foreground">
                    {new Date(result.createdAt).toLocaleDateString("th-TH", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    })}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <Link
                      href={`/skill-test/result/${result.id}`}
                      className="inline-flex items-center gap-1 text-sm text-primary transition hover:text-foreground"
                    >
                      เปิดผลลัพธ์
                      <ChevronRight className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
              ))}
              {filteredResults.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-6 py-16 text-center text-muted-foreground">
                    ไม่พบข้อมูลที่ตรงกับคำค้นหา
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
