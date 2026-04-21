"use client";

import { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import {
  BarChart3,
  BookOpen,
  CheckCircle,
  Save,
  Users,
  X,
} from "lucide-react";
import { BackButton } from "@/components/instructor/ui/BackButton";
import { BreadcrumbNav } from "@/components/instructor/ui/BreadcrumbNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

export default function EditCoursePage() {
  const params = useParams();
  const courseId = params.courseId as string;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "Next.js เต็มรูปแบบ (แก้ไข)",
    description: "เรียน Next.js ตั้งแต่เริ่มต้นจนโปร...",
    category: "web-development",
    price: 2500,
    thumbnail: "",
    videoPreview: "",
  });

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <BackButton />
          <BreadcrumbNav
            crumbs={[
              { label: "คอร์สของฉัน", href: "/instructor/courses" },
              { label: "แก้ไขคอร์ส", href: undefined },
            ]}
          />
        </div>
      </div>

      <div className="container mx-auto max-w-4xl space-y-8 px-4 py-8 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="h-2 w-8 animate-pulse rounded-full bg-gradient-to-r from-emerald-400 to-blue-400" />
            <h1 className="text-3xl font-bold">แก้ไขคอร์ส</h1>
            <Badge className="bg-yellow-100 text-yellow-800">ร่าง</Badge>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>ข้อมูลพื้นฐาน</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="title">ชื่อคอร์ส</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(event) =>
                      setFormData({ ...formData, title: event.target.value })
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="description">รายละเอียด</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        description: event.target.value,
                      })
                    }
                    rows={4}
                    className="mt-1"
                  />
                </div>

                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <div>
                    <Label htmlFor="category">หมวดหมู่</Label>
                    <Select
                      value={formData.category}
                      onValueChange={(value) =>
                        setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger className="mt-1">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="web-development">
                          Web Development
                        </SelectItem>
                        <SelectItem value="javascript">JavaScript</SelectItem>
                        <SelectItem value="react">React</SelectItem>
                        <SelectItem value="nextjs">Next.js</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="price">ราคา (฿)</Label>
                    <Input
                      id="price"
                      type="number"
                      value={formData.price}
                      onChange={(event) =>
                        setFormData({
                          ...formData,
                          price: Number(event.target.value),
                        })
                      }
                      className="mt-1"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>สื่อประกอบ</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="thumbnail">รูปภาพปก (URL)</Label>
                  <Input
                    id="thumbnail"
                    placeholder="https://example.com/thumbnail.jpg"
                    value={formData.thumbnail}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        thumbnail: event.target.value,
                      })
                    }
                    className="mt-1"
                  />
                </div>

                <div>
                  <Label htmlFor="videoPreview">วิดีโอตัวอย่าง (URL)</Label>
                  <Input
                    id="videoPreview"
                    placeholder="https://youtube.com/embed/..."
                    value={formData.videoPreview}
                    onChange={(event) =>
                      setFormData({
                        ...formData,
                        videoPreview: event.target.value,
                      })
                    }
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col gap-4 border-t pt-6 sm:flex-row">
              <Button type="submit" className="flex-1" disabled={loading}>
                {loading ? (
                  <>
                    <CheckCircle className="mr-2 h-4 w-4 animate-spin" />
                    กำลังอัปเดต...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    อัปเดตคอร์ส
                  </>
                )}
              </Button>

              <Link href={`/instructor/courses/${courseId}/lessons`} className="flex-1">
                <Button variant="outline" className="w-full">
                  <X className="mr-2 h-4 w-4" />
                  กลับไปจัดการบทเรียน
                </Button>
              </Link>
            </div>
          </form>

          <div className="grid grid-cols-1 gap-6 border-t pt-12 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BookOpen className="h-5 w-5" />
                  กลับรายการคอร์ส
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Link
                  href="/instructor/courses"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  ดูคอร์สทั้งหมด
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <Users className="h-5 w-5" />
                  ดูนักเรียนคอร์สนี้
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Link
                  href={`/instructor/students?courseId=${courseId}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  ดูรายชื่อนักเรียน
                </Link>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center gap-2 text-lg">
                  <BarChart3 className="h-5 w-5" />
                  สถิติคอร์สนี้
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Link
                  href={`/instructor/analytics?courseId=${courseId}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  ดูภาพรวมการเรียน
                </Link>
              </CardContent>
            </Card>
          </div>

          <div className="flex flex-wrap gap-3 border-t pb-12 pt-12">
            <Link href={`/instructor/courses/${courseId}/lessons`}>
              <Button variant="outline">
                <BookOpen className="mr-2 h-4 w-4" />
                กลับไปบทเรียน
              </Button>
            </Link>
            <Link href="/instructor/courses">
              <Button variant="outline">คอร์สทั้งหมด</Button>
            </Link>
            <Link href="/instructor/dashboard">
              <Button variant="outline">กลับแดชบอร์ด</Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
