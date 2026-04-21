"use client";

import React, { useEffect, useState } from "react";
import {
  Bot,
  MessageSquareText,
  Users,
  Loader2,
  ChevronRight,
  AlertCircle,
} from "lucide-react";
import { adminChatbotApi } from "@/lib/api/admin-chatbot";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";

export default function AdminChatbotDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    adminChatbotApi
      .getDashboard()
      .then((res) => setData(res))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return (
      <div className="flex-1 min-h-screen flex items-center justify-center text-brand-purple">
        <Loader2 className="animate-spin" size={40} />
      </div>
    );
  }

  if (!data)
    return <div className="p-8 text-slate-500">ไม่สามารถโหลดข้อมูลได้</div>;

  const COLORS = ["#0ea5e9", "#14b8a6", "#06b6d4", "#10b981", "#3b82f6"];

  // เตรียมข้อมูลกราฟ Intent ให้สวยงาม
  const intentData =
    data.intentDistribution?.map((item: any) => ({
      name: item.intent === "unknown" ? "ตอบไม่ได้ (Fallback)" : item.intent,
      value: item.count,
    })) || [];

  return (
    <div className="p-6 md:p-8 space-y-8 max-w-7xl mx-auto animate-in fade-in duration-500">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white flex items-center gap-3">
            <Bot className="text-brand-purple" size={32} />
            AI Chatbot Dashboard
          </h1>
          <p className="text-slate-500 dark:text-slate-400 mt-1">
            ติดตามประสิทธิภาพการสนทนาและคำถามที่ผู้ใช้งานสนใจ
          </p>
        </div>
        <div className="flex gap-2">
          <button className="px-5 py-2.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-full text-sm font-medium hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
            ตั้งค่าบอท
          </button>
          <button className="px-5 py-2.5 bg-brand-purple text-white rounded-full text-sm font-bold hover:bg-brand-purple/90 transition-colors shadow-md shadow-brand-purple/20">
            จัดการ FAQ
          </button>
        </div>
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-brand-purple/10 flex items-center justify-center text-brand-purple rounded-2xl">
              <Users size={24} />
            </div>
          </div>
          <p className="text-slate-500 text-sm font-medium">
            เซสชันสนทนาทั้งหมด
          </p>
          <h3 className="text-3xl font-bold text-slate-800 dark:text-white mt-1">
            {data.stats?.totalSessions || 0}
          </h3>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-emerald-500/10 flex items-center justify-center text-emerald-500 rounded-2xl">
              <MessageSquareText size={24} />
            </div>
          </div>
          <p className="text-slate-500 text-sm font-medium">
            ข้อความรวมทั้งหมด (Messages)
          </p>
          <h3 className="text-3xl font-bold text-slate-800 dark:text-white mt-1">
            {data.stats?.totalMessages || 0}
          </h3>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] shadow-sm border border-brand-pink/20">
          <div className="flex justify-between items-start mb-4">
            <div className="w-12 h-12 bg-brand-pink/10 flex items-center justify-center text-brand-pink rounded-2xl">
              <AlertCircle size={24} />
            </div>
          </div>
          <p className="text-slate-500 text-sm font-medium">
            คำถามที่บอทตอบไม่ได้ (Unknown Intent)
          </p>
          <h3 className="text-3xl font-bold text-slate-800 dark:text-white mt-1">
            {intentData.find((i: any) => i.name === "ตอบไม่ได้ (Fallback)")
              ?.value || 0}
          </h3>
          <p className="text-xs text-brand-pink mt-2">
            * ควรเพิ่มข้อมูลเหล่านี้ลงใน FAQ
          </p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Pie Chart: Intents */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700">
          <h2 className="text-xl font-bold text-slate-800 dark:text-white mb-6">
            สัดส่วนความสนใจ (Intents)
          </h2>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={intentData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  paddingAngle={5}
                  dataKey="value"
                >
                  {intentData.map((entry: any, index: number) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    borderRadius: "1rem",
                    border: "none",
                    boxShadow: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          {/* Legend */}
          <div className="flex flex-wrap justify-center gap-3 mt-4">
            {intentData.map((entry: any, index: number) => (
              <div
                key={index}
                className="flex items-center gap-1.5 text-sm text-slate-600 dark:text-slate-300"
              >
                <span
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></span>
                {entry.name} ({entry.value})
              </div>
            ))}
          </div>
        </div>

        {/* Table: Recent Sessions */}
        <div className="bg-white dark:bg-slate-800 rounded-[2rem] shadow-sm border border-slate-100 dark:border-slate-700 overflow-hidden flex flex-col">
          <div className="p-6 border-b border-slate-100 dark:border-slate-700 flex justify-between items-center shrink-0">
            <h2 className="text-xl font-bold text-slate-800 dark:text-white">
              การสนทนาล่าสุด
            </h2>
            <button className="text-brand-purple text-sm font-bold hover:underline">
              ดูทั้งหมด
            </button>
          </div>
          <div className="flex-1 overflow-y-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-slate-50 dark:bg-slate-900/50 text-slate-500 text-xs uppercase tracking-wider sticky top-0">
                  <th className="px-6 py-4 font-medium">ผู้ใช้งาน</th>
                  <th className="px-6 py-4 font-medium">จำนวนข้อความ</th>
                  <th className="px-6 py-4 font-medium">ใช้งานล่าสุด</th>
                  <th className="px-6 py-4 font-medium text-right">ดูแชต</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
                {data.recentSessions?.map((session: any) => (
                  <tr
                    key={session.id}
                    className="hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors"
                  >
                    <td className="px-6 py-4 font-medium text-slate-800 dark:text-white">
                      {session.user ? (
                        session.user.fullname
                      ) : (
                        <span className="text-slate-400">Guest User</span>
                      )}
                    </td>
                    <td className="px-6 py-4 text-slate-600 dark:text-slate-300">
                      {session._count?.messages || 0} ข้อความ
                    </td>
                    <td className="px-6 py-4 text-sm text-slate-500">
                      {new Date(session.lastMessageAt).toLocaleTimeString(
                        "th-TH",
                        { hour: "2-digit", minute: "2-digit" },
                      )}{" "}
                      น.
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button className="p-2 text-brand-purple hover:bg-brand-purple/10 rounded-full transition-colors inline-flex">
                        <ChevronRight size={18} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
