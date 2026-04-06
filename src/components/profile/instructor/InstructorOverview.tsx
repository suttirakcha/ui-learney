"use client";

import { getInstructorDashboard } from "@/lib/api/dashboard/dashboard.service";
import { getInstructorCourses } from "@/lib/api/profile/profile.service";
import type { DashboardData } from "@/types/instructor/instructor.type";
import type { InstructorCourseView } from "@/types/profile";
import { useEffect, useState } from "react";
import InstructorCourseCard from "./InstructorCourseCard";

type InstructorOverviewState = {
  dashboard: DashboardData | null;
  courses: InstructorCourseView[];
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

export default function InstructorOverview() {
  const [state, setState] = useState<InstructorOverviewState>({
    dashboard: null,
    courses: [],
    loading: true,
    error: null,
  });

  useEffect(() => {
    let isMounted = true;

    async function loadOverview() {
      try {
        const [dashboard, courses] = await Promise.all([
          getInstructorDashboard(),
          getInstructorCourses(),
        ]);

        if (isMounted) {
          setState({
            dashboard,
            courses,
            loading: false,
            error: null,
          });
        }
      } catch (error) {
        if (isMounted) {
          setState({
            dashboard: null,
            courses: [],
            loading: false,
            error:
              error instanceof Error
                ? error.message
                : "ไม่สามารถโหลดข้อมูลโปรไฟล์ผู้สอนได้",
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
        กำลังโหลดข้อมูลโปรไฟล์ผู้สอน...
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

  const activeCourses = state.courses.filter(
    (course) => course.status === "ACTIVE",
  ).length;
  const pendingCourses = state.courses.filter(
    (course) => course.status === "PENDING",
  ).length;

  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">ภาพรวมการสอนของฉัน</h2>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
          <div className="rounded-lg border border-accent bg-background p-4">
            <p className="text-sm text-muted-foreground">คอร์สทั้งหมด</p>
            <p className="mt-2 text-2xl font-semibold">{state.courses.length}</p>
          </div>
          <div className="rounded-lg border border-accent bg-background p-4">
            <p className="text-sm text-muted-foreground">คอร์สที่เปิดสอน</p>
            <p className="mt-2 text-2xl font-semibold">{activeCourses}</p>
          </div>
          <div className="rounded-lg border border-accent bg-background p-4">
            <p className="text-sm text-muted-foreground">คอร์สรอตรวจสอบ</p>
            <p className="mt-2 text-2xl font-semibold">{pendingCourses}</p>
          </div>
          <div className="rounded-lg border border-accent bg-background p-4">
            <p className="text-sm text-muted-foreground">ยอดขาย</p>
            <p className="mt-2 text-2xl font-semibold">
              {state.dashboard.totalSales}
            </p>
          </div>
          <div className="rounded-lg border border-accent bg-background p-4">
            <p className="text-sm text-muted-foreground">รายได้รวม</p>
            <p className="mt-2 text-2xl font-semibold">
              {formatCurrency(state.dashboard.totalRevenue)}
            </p>
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">คอร์สเรียนของฉัน</h2>

        <div className="flex flex-col gap-4">
          {state.courses.length > 0 ? (
            state.courses.map((course) => (
              <InstructorCourseCard key={course.id} course={course} />
            ))
          ) : (
            <div className="rounded-lg border-2 border-dashed border-accent p-6 text-muted-foreground">
              ยังไม่มีคอร์สที่สร้างไว้ในตอนนี้
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
