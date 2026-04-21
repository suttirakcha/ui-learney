"use client";

import { BackButton } from "@/components/instructor/ui/BackButton";
import { BreadcrumbNav } from "@/components/instructor/ui/BreadcrumbNav";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import {
  BarChart3,
  Calendar,
  Download,
  Filter,
  BookOpen,
  Star,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type MockCourse = {
  name: string;
  revenue: number;
  students: number;
  rating: number;
};

const mockData: {
  totalRevenue: number;
  totalStudents: number;
  avgRating: number;
  courses: MockCourse[];
  trendData: number[];
} = {
  totalRevenue: 125000,
  totalStudents: 247,
  avgRating: 4.7,
  courses: [
    { name: "Next.js เต็มรูปแบบ", revenue: 65000, students: 89, rating: 4.8 },
    { name: "React Hooks สุดเจ๋ง", revenue: 45000, students: 67, rating: 4.9 },
    { name: "TypeScript พื้นฐาน", revenue: 15000, students: 91, rating: 4.5 },
  ],
  trendData: [1200, 1800, 1600, 2200, 2800, 2400, 3200], // weekly
};

export default function InstructorAnalyticsPage() {
  const [period, setPeriod] = useState("30d");
  const [courseFilter, setCourseFilter] = useState("all");

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BackButton />
          <BreadcrumbNav crumbs={[{ label: "สถิติ", href: undefined }]} />
        </div>
      </div>

      <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">รายได้รวม</CardTitle>
              <Calendar className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                ฿{mockData.totalRevenue.toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                +18.2% จากเดือนที่แล้ว
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">
                ผู้เรียนทั้งหมด
              </CardTitle>
              <Users className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">
                {mockData.totalStudents.toLocaleString()}
              </div>
              <p className="text-sm text-muted-foreground mt-1">
                +12.5% จากเดือนที่แล้ว
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-lg font-semibold">
                คะแนนรีวิว
              </CardTitle>
              <Star className="h-5 w-5 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{mockData.avgRating}</div>
              <p className="text-sm text-muted-foreground mt-1">จาก 5 ดาว</p>
            </CardContent>
          </Card>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <div className="flex-1 lg:flex-none lg:w-80">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>กรองข้อมูล</CardTitle>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4 w-4" />
                    ล้าง
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    คอร์ส
                  </label>
                  <Select value={courseFilter} onValueChange={setCourseFilter}>
                    <SelectTrigger>
                      <SelectValue placeholder="ทุกคอร์ส" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">ทุกคอร์ส</SelectItem>
                      {mockData.courses.map((course) => (
                        <SelectItem key={course.name} value={course.name}>
                          {course.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label className="text-sm font-medium mb-2 block">
                    ช่วงเวลา
                  </label>
                  <Select value={period} onValueChange={setPeriod}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="7d">7 วัน</SelectItem>
                      <SelectItem value="30d">30 วัน</SelectItem>
                      <SelectItem value="90d">90 วัน</SelectItem>
                      <SelectItem value="all">ทั้งหมด</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <Button className="w-full">
                  <Download className="mr-2 h-4 w-4" />
                  Export CSV
                </Button>
              </CardContent>
            </Card>
          </div>

          <div className="flex-1 space-y-6">
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-6 w-6" />
                    รายได้ตามเวลา
                  </CardTitle>
                  <CardDescription>
                    ฿{(mockData.totalRevenue * 0.3).toLocaleString()}{" "}
                    จากคอร์สใหม่
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="h-64 bg-gradient-to-r from-muted to-muted/50 rounded-xl flex items-center justify-center">
                    <div className="text-center text-muted-foreground">
                      <BarChart3 className="h-16 w-16 mx-auto mb-4 opacity-40" />
                      <p className="text-lg font-medium">
                        กราฟรายได้ (Recharts - coming soon)
                      </p>
                      <p className="text-sm">Trend +12% MoM</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>ประสิทธิภาพคอร์ส</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {mockData.courses.map((course, i) => (
                    <Card key={course.name}>
                      <CardHeader className="pb-2">
                        <div className="flex items-center gap-2">
                          <Badge variant="outline" className="text-xs">
                            คอร์สที่ {i + 1}
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-2xl font-bold mb-1">{course.name}</p>
                        <div className="space-y-2 text-sm mb-4">
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              รายได้
                            </span>
                            <span>฿{course.revenue.toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-muted-foreground">
                              ผู้เรียน
                            </span>
                            <span>{course.students}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-amber-400 text-amber-500" />
                            <span>{course.rating}</span>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Footer Navigation */}
        <div className="flex flex-wrap gap-3 pt-12 border-t pb-12">
          <Link href="/instructor/dashboard">
            <Button variant="outline">กลับแดชบอร์ด</Button>
          </Link>
          <Link href="/instructor/courses">
            <Button variant="outline">
              <BookOpen className="mr-2 h-4 w-4" />
              คอร์สของฉัน
            </Button>
          </Link>
          <Link href="/instructor/students">
            <Button variant="outline">
              <Users className="mr-2 h-4 w-4" />
              นักเรียน
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
