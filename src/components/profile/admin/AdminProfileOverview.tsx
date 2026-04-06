"use client";

import StatsCard from "@/components/admin/StatsCard";
import {
  getAdminDashboard,
  getAdminPendingPreview,
} from "@/lib/api/profile/profile.service";
import type { DashboardData } from "@/types/dashboard/dashboard";
import type { AdminPendingPreviewItem } from "@/types/profile";
import Link from "next/link";
import { useEffect, useState } from "react";

type AdminOverviewState = {
  dashboard: DashboardData | null;
  pendingCourses: AdminPendingPreviewItem[];
  loading: boolean;
  error: string | null;
};

function formatCurrency(amount: number) {
  return new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(date: string) {
  return new Intl.DateTimeFormat("th-TH", {
    dateStyle: "medium",
  }).format(new Date(date));
}

export default function AdminProfileOverview() {
  const [state, setState] = useState<AdminOverviewState>({
    dashboard: null,
    pendingCourses: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    async function loadOverview() {
      try {
        const [dashboard, pendingCourses] = await Promise.all([
          getAdminDashboard(),
          getAdminPendingPreview(1000),
        ]);

        if (isMounted) {
          setState({
            dashboard,
            pendingCourses,
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        if (isMounted) {
          setState({
            dashboard: null,
            pendingCourses: [],
            loading: false,
            error:
              error instanceof Error
                ? error.message
                : "ไม่สามารถโหลดข้อมูลโปรไฟล์ผู้ดูแลระบบได้",
          });
        }
      }
    }

    void loadOverview();

    return () => {
      isMounted = false;
    };
  }, []);

  if (state.loading) {
    return (
      <div className="rounded-xl border border-accent p-6 text-muted-foreground">
        กำลังโหลดข้อมูลโปรไฟล์ผู้ดูแลระบบ...
      </div>
    );
  }

  if (state.error) {
    return (
      <div className="rounded-xl border border-destructive/30 bg-destructive/5 p-6 text-destructive">
        {state.error}
      </div>
    );
  }

  if (!state.dashboard) {
    return null;
  }

  const previewCourses = state.pendingCourses.slice(0, 5);

  return (
    <div className="flex-1 space-y-6">
      <h2 className="text-xl font-semibold">ภาพรวมระบบ</h2>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        <StatsCard
          title="รายได้รวม"
          value={formatCurrency(state.dashboard.totalRevenue)}
        />
        <StatsCard
          title="ค่าธรรมเนียมแพลตฟอร์ม"
          value={formatCurrency(state.dashboard.platformFee)}
        />
        <StatsCard
          title="ยอดขาย"
          value={state.dashboard.totalSales.toLocaleString("th-TH")}
        />
        <StatsCard
          title="คอร์สที่เปิดสอน"
          value={state.dashboard.totalCourses.toLocaleString("th-TH")}
        />
        <StatsCard
          title="คอร์สรอตรวจสอบ"
          value={state.pendingCourses.length.toLocaleString("th-TH")}
        />
      </div>

      <section className="rounded-2xl border border-accent bg-white p-6 shadow-sm space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-semibold">คอร์สรอตรวจสอบล่าสุด</h3>
            <p className="text-sm text-muted-foreground">
              ดูคอร์สที่กำลังรอการอนุมัติจากผู้ดูแลระบบ
            </p>
          </div>

          <Link
            href="/admin/pending"
            className="text-sm font-medium text-primary hover:underline"
          >
            ไปหน้าตรวจสอบคอร์ส
          </Link>
        </div>

        {previewCourses.length > 0 ? (
          <div className="space-y-3">
            {previewCourses.map((course) => (
              <div
                key={course.id}
                className="rounded-xl border border-accent/70 p-4"
              >
                <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                  <div>
                    <p className="font-medium">{course.courseName}</p>
                    <p className="text-sm text-muted-foreground">
                      ผู้สอน: {course.instructorName}
                    </p>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    ส่งเมื่อ {formatDate(course.createdAt)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border-2 border-dashed border-accent p-6 text-muted-foreground">
            ตอนนี้ไม่มีคอร์สที่รอตรวจสอบ
          </div>
        )}
      </section>
    </div>
  );
}
