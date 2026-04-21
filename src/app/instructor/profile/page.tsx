"use client";

import { BackButton } from "@/components/instructor/ui/BackButton";
import { BreadcrumbNav } from "@/components/instructor/ui/BreadcrumbNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  UserCircle,
  Camera,
  Save,
  BookOpen,
  BarChart3,
  Users,
} from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function InstructorProfilePage() {
  const [loading, setLoading] = useState(false);
  const [avatarPreview, setAvatarPreview] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate save
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BackButton />
          <BreadcrumbNav crumbs={[{ label: "โปรไฟล์", href: undefined }]} />
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-2xl">
                <UserCircle className="h-10 w-10" />
                โปรไฟล์ผู้สอน
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
                <div className="flex flex-col items-center">
                  <div className="relative group">
                    <Avatar className="h-32 w-32 border-4 border-background shadow-lg">
                      <AvatarImage src={avatarPreview || "/placeholder.svg"} />
                      <AvatarFallback className="h-32 w-32 text-3xl">
                        ส
                      </AvatarFallback>
                    </Avatar>
                    <label className="absolute -bottom-2 -right-2 bg-primary p-3 rounded-full cursor-pointer hover:bg-primary/90 transition-all group-hover:scale-110">
                      <Camera className="h-5 w-5 text-primary-foreground" />
                      <input
                        type="file"
                        className="hidden"
                        accept="image/*"
                        onChange={(e) => {
                          const file = e.target.files?.[0];
                          if (file) {
                            const url = URL.createObjectURL(file);
                            setAvatarPreview(url);
                          }
                        }}
                      />
                    </label>
                  </div>
                  <p className="text-sm text-muted-foreground mt-3 text-center">
                    JPG, PNG สูงสุด 2MB
                  </p>
                </div>
                <div className="flex-1 space-y-4">
                  <div>
                    <Label htmlFor="name" className="text-sm font-medium">
                      ชื่อผู้สอน
                    </Label>
                    <Input
                      id="name"
                      defaultValue="สมชาย ใจดี"
                      className="mt-1"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium">
                        เบอร์โทร
                      </Label>
                      <Input
                        id="phone"
                        defaultValue="08x-xxx-xxxx"
                        className="mt-1"
                      />
                    </div>
                    <div>
                      <Label htmlFor="bank" className="text-sm font-medium">
                        ธนาคาร
                      </Label>
                      <Input
                        id="bank"
                        placeholder="ธนาคารกสิกรไทย"
                        className="mt-1"
                      />
                    </div>
                  </div>
                  <div>
                    <Label htmlFor="bio" className="text-sm font-medium">
                      คำอธิบายสั้น (Bio)
                    </Label>
                    <textarea
                      id="bio"
                      rows={3}
                      className="w-full mt-1 p-3 border rounded-xl resize-vertical focus-visible:ring-2"
                      defaultValue="ผู้สอน Next.js และ React มืออาชีพ 10 ปีประสบการณ์"
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
                <Button
                  onClick={handleSubmit}
                  className="flex-1"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Save className="mr-2 h-4 w-4 animate-spin" />
                      กำลังบันทึก...
                    </>
                  ) : (
                    <>
                      <Save className="mr-2 h-4 w-4" />
                      บันทึกการเปลี่ยนแปลง
                    </>
                  )}
                </Button>
                <Button variant="outline" className="flex-1">
                  รีเซ็ตรหัสผ่าน
                </Button>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader className="flex-row items-center gap-3 pb-3">
                <CardTitle className="text-lg">สถิติของคุณ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">คอร์สทั้งหมด</span>
                  <span className="font-semibold">8</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">ผู้เรียนรวม</span>
                  <span className="font-semibold">247</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">รายได้รวม</span>
                  <span className="font-semibold">฿125,000</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex-row items-center gap-3 pb-3">
                <CardTitle className="text-lg">ลิงก์สำคัญ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Link
                  href="/instructor/courses"
                  className="block p-3 -m-3 rounded-xl hover:bg-accent transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <BookOpen className="h-5 w-5 text-emerald-500" />
                    <div>
                      <p className="font-medium">คอร์สของฉัน</p>
                      <p className="text-sm text-muted-foreground">
                        จัดการคอร์สและบทเรียน
                      </p>
                    </div>
                  </div>
                </Link>
                <Link
                  href="/instructor/analytics"
                  className="block p-3 -m-3 rounded-xl hover:bg-accent transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <BarChart3 className="h-5 w-5 text-amber-500" />
                    <div>
                      <p className="font-medium">สถิติ</p>
                      <p className="text-sm text-muted-foreground">
                        ดูรายได้และข้อมูล
                      </p>
                    </div>
                  </div>
                </Link>
                <Link
                  href="/instructor/students"
                  className="block p-3 -m-3 rounded-xl hover:bg-accent transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-blue-500" />
                    <div>
                      <p className="font-medium">นักเรียน</p>
                      <p className="text-sm text-muted-foreground">
                        ดูรายชื่อผู้เรียน
                      </p>
                    </div>
                  </div>
                </Link>
              </CardContent>
            </Card>
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
            <Link href="/instructor/analytics">
              <Button variant="outline">
                <BarChart3 className="mr-2 h-4 w-4" />
                สถิติ
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
