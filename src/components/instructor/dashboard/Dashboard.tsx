"use client";

import Link from "next/link";
import {
  AlertCircle,
  BadgeCheck,
  BarChart3,
  BookOpen,
  Clock3,
  Edit3,
  Eye,
  Plus,
  Star,
  Trash2,
  UserCircle,
  Users,
  Wallet,
} from "lucide-react";
import { BreadcrumbNav } from "../ui/BreadcrumbNav";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useInstructorDashboard } from "@/instructor/hooks/useInstructorDashboard";
import type { DashboardStats } from "@/types/instructor";

const statColorClasses = {
  blue: "bg-blue-500",
  emerald: "bg-emerald-500",
  green: "bg-green-500",
  orange: "bg-orange-500",
  purple: "bg-purple-500",
  yellow: "bg-yellow-500",
} as const;

function formatDate(date: string) {
  return new Intl.DateTimeFormat("th-TH", {
    dateStyle: "medium",
  }).format(new Date(date));
}

export default function Dashboard() {
  const { data, loading, error, refetch } = useInstructorDashboard();

  if (loading) {
    return (
      <div className="min-h-screen bg-background p-8">
        <div className="mx-auto max-w-7xl space-y-8">
          <div className="space-y-2">
            <div className="h-8 w-64 animate-pulse rounded-md bg-muted" />
            <div className="h-4 w-52 animate-pulse rounded-md bg-muted/60" />
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: 6 }).map((_, index) => (
              <Card key={index}>
                <CardContent className="space-y-4 p-6">
                  <div className="h-12 w-12 animate-pulse rounded-xl bg-muted" />
                  <div className="h-7 w-24 animate-pulse rounded-md bg-muted" />
                  <div className="h-4 w-32 animate-pulse rounded-md bg-muted/60" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background p-8">
        <Card className="w-full max-w-md">
          <CardContent className="space-y-4 p-8 text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-destructive/10">
              <AlertCircle className="h-8 w-8 text-destructive" />
            </div>
            <h2 className="text-xl font-bold">เกิดข้อผิดพลาด</h2>
            <p className="text-muted-foreground">{error}</p>
            <div className="flex justify-center gap-2">
              <Button onClick={() => void refetch()}>ลองใหม่</Button>
              <Button
                variant="outline"
                onClick={() => window.location.reload()}
              >
                รีเฟรช
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (!data || (data.totalCourses === 0 && data.totalStudents === 0)) {
    return <EmptyInstructorDashboard />;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b p-6">
        <div className="mx-auto max-w-7xl">
          <BreadcrumbNav crumbs={[{ label: "แดชบอร์ดผู้สอน" }]} />
          <div className="mb-8">
            <h1 className="text-3xl font-bold tracking-tight mb-2">
              แดชบอร์ดผู้สอน
            </h1>
            <p className="text-muted-foreground max-w-md">
              จัดการคอร์ส นักเรียน และสถิติของคุณ
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link href="/instructor/courses">
              <Button variant="outline" size="lg">
                <BookOpen className="mr-2 h-4 w-4" />
                ดูคอร์สทั้งหมด
              </Button>
            </Link>
            <Link href="/instructor/students">
              <Button variant="outline" size="lg">
                <Users className="mr-2 h-4 w-4" />
                ดูนักเรียน
              </Button>
            </Link>
            <Link href="/instructor/analytics">
              <Button variant="outline" size="lg">
                <BarChart3 className="mr-2 h-4 w-4" />
                ดูสถิติ
              </Button>
            </Link>
            <Link href="/instructor/profile">
              <Button variant="outline" size="lg">
                <UserCircle className="mr-2 h-4 w-4" />
                โปรไฟล์
              </Button>
            </Link>
            <Link href="/instructor/create">
              <Button
                size="lg"
                className="bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-600 hover:to-teal-600"
              >
                <Plus className="mr-2 h-4 w-4" />
                สร้างคอร์สใหม่
              </Button>
            </Link>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl space-y-8 p-6">
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          <StatCard
            icon={BookOpen}
            title="คอร์สทั้งหมด"
            value={data.totalCourses}
            href="/instructor/courses"
            color="blue"
          />
          <StatCard
            icon={Users}
            title="ผู้เรียนทั้งหมด"
            value={data.totalStudents.toLocaleString()}
            href="/instructor/students"
            color="green"
          />
          <StatCard
            icon={Wallet}
            title="รายได้รวม"
            value={`฿${data.totalRevenue.toLocaleString()}`}
            href="/instructor/analytics"
            color="purple"
          />
          <StatCard
            icon={Clock3}
            title="รออนุมัติ"
            value={data.pendingCourses}
            href="/instructor/courses"
            color="orange"
          />
          <StatCard
            icon={Star}
            title="คะแนนรีวิวเฉลี่ย"
            value={data.avgRating}
            href="/instructor/courses"
            color="yellow"
          />
          <StatCard
            icon={BadgeCheck}
            title="คอร์สเผยแพร่"
            value={data.totalPublishedCourses}
            href="/instructor/courses"
            color="emerald"
          />
        </div>

        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BookOpen className="h-5 w-5" />
                คอร์สล่าสุด
              </CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[280px]">ชื่อคอร์ส</TableHead>
                    <TableHead>หมวด</TableHead>
                    <TableHead>สถานะ</TableHead>
                    <TableHead>นักเรียน</TableHead>
                    <TableHead>อัปเดต</TableHead>
                    <TableHead>การดำเนินการ</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {data.recentCourses.length > 0 ? (
                    data.recentCourses.map((course) => (
                      <RecentCourseRow key={course.id} course={course} />
                    ))
                  ) : (
                    <TableRow>
                      <TableCell
                        colSpan={6}
                        className="py-8 text-center text-muted-foreground"
                      >
                        ยังไม่มีคอร์สล่าสุด
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                นักเรียนล่าสุด
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {data.recentStudents.length > 0 ? (
                  data.recentStudents.map((enrollment) => (
                    <RecentStudentRow
                      key={enrollment.id}
                      enrollment={enrollment}
                    />
                  ))
                ) : (
                  <div className="py-8 text-center text-muted-foreground">
                    ยังไม่มีนักเรียนใหม่
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Star className="h-5 w-5" />
              AI แนะนำหัวข้อคอร์สใหม่
            </CardTitle>
            <CardDescription>
              จากข้อมูลหมวดหมู่ที่ขายดี ธีมปัจจุบัน และรีวิวของคุณ
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
              {data.aiSuggestions.map((suggestion, index) => (
                <AiSuggestionCard
                  key={`${suggestion.template}-${index}`}
                  suggestion={suggestion}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>การดำเนินการด่วน</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="text-center py-8 text-muted-foreground">
                <p className="text-lg font-medium mb-2">การนำทางหลัก</p>
                <p className="text-sm">ใช้เมนูด้านซ้ายหรือปุ่มด้านบน</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

interface StatCardProps {
  icon: React.ElementType;
  title: string;
  value: string | number;
  href: string;
  color: keyof typeof statColorClasses;
}

function StatCard({ icon: Icon, title, value, href, color }: StatCardProps) {
  return (
    <Link href={href}>
      <Card className="group cursor-pointer border-0 bg-gradient-to-br transition-all hover:shadow-lg hover:from-white/50">
        <CardContent className="p-6">
          <div
            className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl text-white transition-transform group-hover:scale-110 ${statColorClasses[color]}`}
          >
            <Icon className="h-6 w-6" />
          </div>
          <h3 className="mb-1 text-2xl font-bold text-foreground">{value}</h3>
          <p className="text-sm text-muted-foreground">{title}</p>
        </CardContent>
      </Card>
    </Link>
  );
}

type RecentCourse = DashboardStats["recentCourses"][number];

function RecentCourseRow({ course }: { course: RecentCourse }) {
  const categoryName =
    course.categoryRecord?.name ?? course.category ?? "GENERAL";
  const statusLabel =
    course.workflowStatus === "PUBLISHED"
      ? "เผยแพร่แล้ว"
      : course.workflowStatus === "DRAFT"
        ? "ร่าง"
        : "รออนุมัติ";

  return (
    <TableRow>
      <TableCell className="font-medium">{course.courseName}</TableCell>
      <TableCell>
        <Badge variant="secondary">{categoryName}</Badge>
      </TableCell>
      <TableCell>
        <Badge
          variant={
            course.workflowStatus === "PUBLISHED" ? "default" : "secondary"
          }
        >
          {statusLabel}
        </Badge>
      </TableCell>
      <TableCell>{course.enrolledCourses.length}</TableCell>
      <TableCell className="text-sm text-muted-foreground">
        {formatDate(course.updatedAt)}
      </TableCell>
      <TableCell className="flex gap-1">
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/instructor/courses/${course.id}/edit`}>
            <Eye className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="ghost" size="sm" asChild>
          <Link href={`/instructor/courses/${course.id}/edit`}>
            <Edit3 className="h-4 w-4" />
          </Link>
        </Button>
        <Button variant="ghost" size="sm">
          <Trash2 className="h-4 w-4" />
        </Button>
      </TableCell>
    </TableRow>
  );
}

type RecentEnrollment = DashboardStats["recentStudents"][number];

function RecentStudentRow({ enrollment }: { enrollment: RecentEnrollment }) {
  const studentName = enrollment.user.fullname;
  const avatar = enrollment.user.image;
  const courseName = enrollment.course.courseName;

  return (
    <div className="group flex cursor-pointer items-center gap-3 rounded-lg p-3 hover:bg-muted">
      <Avatar className="h-10 w-10">
        <AvatarImage src={avatar} />
        <AvatarFallback>{studentName.charAt(0)}</AvatarFallback>
      </Avatar>
      <div className="min-w-0 flex-1">
        <p className="truncate font-medium">{studentName}</p>
        <p className="truncate text-sm text-muted-foreground">{courseName}</p>
      </div>
      <div className="w-24">
        <Progress value={100} className="h-2" />
      </div>
      <span className="text-xs text-muted-foreground">
        {formatDate(enrollment.createdAt)}
      </span>
    </div>
  );
}

function EmptyInstructorDashboard() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-8">
      <Card className="w-full max-w-xl">
        <CardContent className="space-y-4 p-8 text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
            <BookOpen className="h-8 w-8" />
          </div>
          <h2 className="text-2xl font-bold">เริ่มต้นแดชบอร์ดผู้สอน</h2>
          <p className="text-muted-foreground">
            ยังไม่มีคอร์สหรือผู้เรียนในระบบ
            เริ่มสร้างคอร์สแรกเพื่อเปิดหน้าจัดการเต็มรูปแบบ
          </p>
          <Button asChild>
            <Link href="/instructor/create">สร้างคอร์สแรก</Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

function AiSuggestionCard({
  suggestion,
}: {
  suggestion: DashboardStats["aiSuggestions"][number];
}) {
  return (
    <Link href={`/instructor/create?template=${suggestion.template}`}>
      <Card className="group cursor-pointer border-l-4 border-emerald-500 transition-all hover:-translate-y-1 hover:shadow-md">
        <CardContent className="p-6">
          <h3 className="mb-2 text-lg font-bold group-hover:text-emerald-600">
            {suggestion.title}
          </h3>
          <p className="mb-4 text-sm text-muted-foreground">
            {suggestion.reason}
          </p>
          <Button variant="outline" size="sm" className="w-full">
            สร้างจาก AI
          </Button>
        </CardContent>
      </Card>
    </Link>
  );
}
