"use client";

import { useInstructorCourses } from "@/instructor/hooks/useInstructorCourses";
import { InstructorCourseCard } from "@/components/instructor/InstructorCourseCard";
import { BackButton } from "@/components/instructor/ui/BackButton";
import { BreadcrumbNav } from "@/components/instructor/ui/BreadcrumbNav";
import { Button } from "@/components/ui/button";
import { BookOpen, Plus, Users, BarChart3, UserCircle } from "lucide-react";
import Link from "next/link";

export default function InstructorCoursesPage() {
  const { courses, loading } = useInstructorCourses();

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="max-w-4xl mx-auto space-y-8">
          <div className="space-y-4">
            <div className="h-8 w-64 animate-pulse rounded-md bg-muted" />
            <div className="h-4 w-96 animate-pulse rounded-md bg-muted/80" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className="h-64 animate-pulse bg-muted rounded-xl" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="border-b">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BackButton />
          <BreadcrumbNav crumbs={[{ label: "คอร์สของฉัน" }]} />
        </div>
      </div>
      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">คอร์สของคุณ</h1>
            <p className="text-muted-foreground mt-2 max-w-md">
              จัดการคอร์สที่สอน ดูสถิติ และสร้างคอร์สใหม่
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {courses.map((course) => (
            <InstructorCourseCard key={course.courseId} course={course} />
          ))}
        </div>

        {courses.length === 0 && (
          <div className="text-center py-24">
            <BookOpen className="mx-auto h-16 w-16 text-muted-foreground mb-6" />
            <h3 className="text-2xl font-bold mb-4">ยังไม่มีคอร์ส</h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              เริ่มสร้างคอร์สแรกของคุณวันนี้
              สร้างรายได้และช่วยผู้เรียนพัฒนาทักษะ
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
              <Link href="/instructor/create">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-500 to-teal-500"
                >
                  <Plus className="mr-2 h-4 w-4" />
                  สร้างคอร์สแรก
                </Button>
              </Link>
              <Link href="/instructor/dashboard">
                <Button variant="outline" size="lg">
                  กลับแดชบอร์ด
                </Button>
              </Link>
            </div>
          </div>
        )}

        {courses.length > 0 && (
          <div className="flex flex-wrap gap-3 pt-12 border-t">
            <Link href="/instructor/dashboard">
              <Button variant="outline">
                <BookOpen className="mr-2 h-4 w-4" />
                กลับแดชบอร์ด
              </Button>
            </Link>
            <Link href="/instructor/students">
              <Button variant="outline">
                <Users className="mr-2 h-4 w-4" />
                ดูนักเรียน
              </Button>
            </Link>
            <Link href="/instructor/analytics">
              <Button variant="outline">
                <BarChart3 className="mr-2 h-4 w-4" />
                ดูสถิติ
              </Button>
            </Link>
            <Link href="/instructor/profile">
              <Button variant="outline">
                <UserCircle className="mr-2 h-4 w-4" />
                โปรไฟล์
              </Button>
            </Link>
            <Link href="/instructor/create">
              <Button className="bg-gradient-to-r from-emerald-500 to-teal-500">
                <Plus className="mr-2 h-4 w-4" />
                สร้างคอร์สใหม่
              </Button>
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
