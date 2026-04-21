"use client";

import { BackButton } from "@/components/instructor/ui/BackButton";
import { BreadcrumbNav } from "@/components/instructor/ui/BreadcrumbNav";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  BookOpen,
  BarChart3,
  CheckCircle,
  Save,
  Users,
  X,
} from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useState } from "react";

export default function EditCoursePage() {
  const params = useParams();
  const courseId = params.id as string;

  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "Next.js เต็มรูปแบบ (แก้ไข)",
    description: "เรียน Next.js ตั้งแต่เริ่มต้นจนโปร...",
    category: "web-development",
    price: 2500,
    thumbnail: "",
    videoPreview: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate update
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <BackButton />
          <BreadcrumbNav
            crumbs={[
              { label: "คอร์สของฉัน", href: "/instructor/courses" },
              { label: "แก้ไขคอร์ส", href: undefined },
            ]}
          />
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        <div className="max-w-2xl">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-2 w-8 bg-gradient-to-r from-emerald-400 to-blue-400 rounded-full animate-pulse" />
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
                    onChange={(e) =>
                      setFormData({ ...formData, title: e.target.value })
                    }
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="description">รายละเอียด</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    rows={4}
                    className="mt-1"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
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
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          price: Number(e.target.value),
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
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="videoPreview">วิดีโอตัวอย่าง (URL)</Label>
                  <Input
                    id="videoPreview"
                    placeholder="https://youtube.com/embed/..."
                    className="mt-1"
                  />
                </div>
              </CardContent>
            </Card>

            <div className="flex flex-col sm:flex-row gap-4 pt-6 border-t">
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
              <Link href={`/instructor/courses/${courseId}`}>
                <Button variant="outline" className="flex-1">
                  <X className="mr-2 h-4 w-4" />
                  ยกเลิก
                </Button>
              </Link>
            </div>
          </form>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 border-t">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  กลับรายการคอร์ส
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Link
                  href="/instructor/courses"
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  ดูคอร์สทั้งหมด →
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <Users className="h-5 w-5" />
                  ดูนักเรียนคอร์สนี้
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Link
                  href={`/instructor/students?courseId=${courseId}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  ดูนักเรียน (89 คน) →
                </Link>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-lg flex items-center gap-2">
                  <BarChart3 className="h-5 w-5" />
                  สถิติคอร์สนี้
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Link
                  href={`/instructor/analytics?courseId=${courseId}`}
                  className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
                >
                  ดูสถิติ (฿65,000) →
                </Link>
              </CardContent>
            </Card>
          </div>

          {/* Footer Navigation */}
          <div className="flex flex-wrap gap-3 pt-12 border-t pb-12">
            <Link href="/instructor/courses">
              <Button variant="outline">
                <BookOpen className="mr-2 h-4 w-4" />
                กลับรายการคอร์ส
              </Button>
            </Link>
            <Link href="/instructor/dashboard">
              <Button variant="outline">กลับแดชบอร์ด</Button>
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
    </div>
  );
}
