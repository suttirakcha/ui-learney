"use client";

import Link from "next/link";
import { BookOpen, Mail, MessageCircle, Users } from "lucide-react";

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

const mockStudents = [
  {
    id: "1",
    name: "น้องฟ้าใส",
    course: "Next.js เต็มรูปแบบ",
    progress: "78%",
  },
  {
    id: "2",
    name: "น้องต้นน้ำ",
    course: "React Hooks สุดเจ๋ง",
    progress: "51%",
  },
  {
    id: "3",
    name: "น้องข้าวหอม",
    course: "TypeScript พื้นฐาน",
    progress: "93%",
  },
];

export default function InstructorStudentsPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto max-w-6xl px-4 py-6 sm:px-6 lg:px-8">
          <BackButton />
          <BreadcrumbNav crumbs={[{ label: "นักเรียน" }]} />
        </div>
      </div>

      <main className="container mx-auto max-w-6xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <section className="grid gap-4 md:grid-cols-3">
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <Users className="h-5 w-5 text-primary" />
                นักเรียนทั้งหมด
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">247</p>
              <p className="mt-1 text-sm text-muted-foreground">
                ติดตามผู้เรียนล่าสุดและการเติบโตของแต่ละคอร์ส
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="h-5 w-5 text-primary" />
                คอร์สที่กำลังเรียน
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">8</p>
              <p className="mt-1 text-sm text-muted-foreground">
                ตรวจว่าคอร์สไหนต้องการการดูแลหรือการกระตุ้นเพิ่มเติม
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <MessageCircle className="h-5 w-5 text-primary" />
                ข้อความที่ต้องตอบ
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-3xl font-bold">12</p>
              <p className="mt-1 text-sm text-muted-foreground">
                มีผู้เรียนที่กำลังรอคำตอบหรือคำแนะนำจากคุณ
              </p>
            </CardContent>
          </Card>
        </section>

        <Card>
          <CardHeader>
            <CardTitle>ภาพรวมนักเรียนล่าสุด</CardTitle>
            <CardDescription>
              หน้าเต็มกำลังต่อยอด แต่ตอนนี้สามารถดูรายการตัวอย่างเพื่อเช็กการเชื่อมหน้าได้แล้ว
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {mockStudents.map((student) => (
              <div
                key={student.id}
                className="flex flex-col gap-3 rounded-2xl border border-border/60 bg-card/70 p-4 sm:flex-row sm:items-center sm:justify-between"
              >
                <div>
                  <p className="font-semibold text-foreground">{student.name}</p>
                  <p className="text-sm text-muted-foreground">{student.course}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
                    ความคืบหน้า {student.progress}
                  </span>
                  <Button variant="outline" size="sm">
                    <Mail className="mr-2 h-4 w-4" />
                    ส่งข้อความ
                  </Button>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        <div className="flex flex-wrap gap-3 border-t pt-8">
          <Button asChild variant="outline">
            <Link href="/instructor/dashboard">กลับแดชบอร์ด</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/instructor/courses">ดูคอร์สของฉัน</Link>
          </Button>
          <Button asChild>
            <Link href="/instructor/analytics">เปิดหน้าสถิติ</Link>
          </Button>
        </div>
      </main>
    </div>
  );
}
