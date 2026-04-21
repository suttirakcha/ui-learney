"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import CourseBuilderForm, {
  CourseBuilderFormValues,
  CourseLevel,
} from "@/components/instructor/CourseBuilderForm";
import { BackButton } from "@/components/instructor/ui/BackButton";
import { BreadcrumbNav } from "@/components/instructor/ui/BreadcrumbNav";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  useCreateCourse,
  useUpdateCourse,
  useSubmitReview,
} from "@/instructor/hooks/useCreateCourse";
import { useInstructorCourses } from "@/instructor/hooks/useInstructorCourses";

type ArrayField =
  | "targetAudience"
  | "requirements"
  | "willLearnMessages"
  | "tags";

interface FormData extends CourseBuilderFormValues {
  price: number;
  videoPreview: string;
  coverImage: string;
  targetAudience: string[];
  requirements: string[];
  willLearnMessages: string[];
  tags: string[];
}

export default function InstructorCourseCreatePage() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    courseName: "",
    slug: "",
    shortDescription: "",
    description: "",
    category: "AI_TECH",
    level: "BEGINNER",
    price: 0,
    videoPreview: "",
    coverImage: "",
    targetAudience: [],
    requirements: [],
    willLearnMessages: [],
    tags: [],
  });
  const [saving, setSaving] = useState(false);
  const [isNew, setIsNew] = useState(true);
  const [courseId, setCourseId] = useState<string | null>(null);

  const { trigger: createCourse, isMutating: creating } = useCreateCourse();
  const { trigger: updateCourse, isMutating: updating } = useUpdateCourse();
  const { trigger: submitReview, isMutating: submitting } = useSubmitReview();

  const { refetch: refetchCourses } = useInstructorCourses();

  useEffect(() => {
    // Check for courseId param for edit mode (future)
    const urlId = new URLSearchParams(window.location.search).get("id");
    if (urlId) {
      setCourseId(urlId);
      setIsNew(false);
      // Load data
    }
  }, []);

  const updateField = <K extends keyof FormData>(
    key: K,
    value: FormData[K],
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const handleCourseBuilderChange = <K extends keyof CourseBuilderFormValues>(
    key: K,
    value: CourseBuilderFormValues[K],
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const addArrayItem = (key: ArrayField, value: string) => {
    const normalizedValue = value.trim();

    if (!normalizedValue || formData[key].includes(normalizedValue)) {
      return;
    }

    updateField(key, [...formData[key], normalizedValue]);
  };

  const removeArrayItem = (key: ArrayField, value: string) => {
    updateField(key, formData[key].filter((item) => item !== value));
  };

  const handleSaveDraft = async () => {
    if (!formData.courseName || !formData.description) {
      toast.error("กรุณากรอกชื่อคอร์สและรายละเอียด");
      return;
    }

    setSaving(true);
    try {
      const dto = {
        courseName: formData.courseName,
        shortDescription: formData.shortDescription,
        description: formData.description,
        category: formData.category,
        level: formData.level,
        price: formData.price,
        videoPreview: formData.videoPreview,
        coverImage: formData.coverImage,
        targetAudience: formData.targetAudience,
        requirements: formData.requirements,
        willLearnMessages: formData.willLearnMessages,
        tags: formData.tags,
      };

      let result;
      if (isNew) {
        result = await createCourse(dto);
        setCourseId(result.id);
        toast.success("บันทึกร่างคอร์สใหม่เรียบร้อย");
      } else {
        result = await updateCourse({ id: courseId!, dto });
        toast.success("อัปเดตร่างคอร์สเรียบร้อย");
      }

      await refetchCourses();
      router.push("/instructor/courses");
    } catch {
      toast.error("เกิดข้อผิดพลาดในการบันทึก");
    } finally {
      setSaving(false);
    }
  };

  const handleSubmitReview = async () => {
    if (!courseId || !formData.courseName || !formData.description) {
      toast.error("กรุณาบันทึกร่างก่อนส่งตรวจสอบ");
      return;
    }

    try {
      await submitReview({ id: courseId, notes: "ขอส่งคอร์สตรวจสอบ" });
      toast.success("ส่งคอร์สให้แอดมินตรวจสอบเรียบร้อย");
      router.push("/instructor/courses");
    } catch {
      toast.error("เกิดข้อผิดพลาด");
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="border-b">
        <div className="container max-w-4xl mx-auto px-4 py-6">
          <BackButton />
          <BreadcrumbNav
            crumbs={[
              { label: "คอร์สของฉัน", href: "/instructor/courses" },
              { label: "สร้างคอร์สใหม่" },
            ]}
          />
        </div>
      </div>

      <div className="container max-w-4xl mx-auto px-4 py-8 space-y-8">
        <div className="space-y-4">
          <h1 className="text-3xl font-bold">สร้างคอร์สใหม่</h1>
          <p className="text-muted-foreground">
            กรอกข้อมูลพื้นฐานคอร์สก่อน จากนั้นกดบันทึกร่าง หรือส่งตรวจสอบ
          </p>
        </div>

        <CourseBuilderForm
          value={{
            courseName: formData.courseName,
            slug: formData.slug,
            shortDescription: formData.shortDescription,
            description: formData.description,
            category: formData.category,
            level: formData.level as CourseLevel,
          }}
          onChange={handleCourseBuilderChange}
          onSubmit={handleSaveDraft}
          className="max-w-2xl"
        />

        {/* Additional Fields */}
        <Card>
          <CardHeader>
            <CardTitle>ข้อมูลเพิ่มเติม</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <Label>ราคา (บาท)</Label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) =>
                  updateField("price", parseFloat(e.target.value) || 0)
                }
                placeholder="0"
              />
            </div>

            <div>
              <Label>วิดีโอพรีวิว (URL)</Label>
              <Input
                value={formData.videoPreview}
                onChange={(e) => updateField("videoPreview", e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
              />
            </div>

            <div>
              <Label>รูปปกคอร์ส (URL)</Label>
              <Input
                value={formData.coverImage}
                onChange={(e) => updateField("coverImage", e.target.value)}
                placeholder="https://example.com/cover.jpg"
              />
            </div>

            <div>
              <Label>กลุ่มเป้าหมาย</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="พิมพ์แล้วกด Enter"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addArrayItem("targetAudience", e.currentTarget.value);
                      e.currentTarget.value = "";
                    }
                  }}
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.targetAudience.map((item) => (
                  <Badge key={item} variant="secondary" className="gap-1">
                    {item}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0"
                      onClick={() => removeArrayItem("targetAudience", item)}
                    >
                      ×
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label>ข้อกำหนดก่อนเรียน</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="พิมพ์แล้วกด Enter"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addArrayItem("requirements", e.currentTarget.value);
                      e.currentTarget.value = "";
                    }
                  }}
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.requirements.map((item) => (
                  <Badge key={item} variant="secondary" className="gap-1">
                    {item}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0"
                      onClick={() => removeArrayItem("requirements", item)}
                    >
                      ×
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label>สิ่งที่ผู้เรียนจะได้รับ</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="พิมพ์แล้วกด Enter"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addArrayItem("willLearnMessages", e.currentTarget.value);
                      e.currentTarget.value = "";
                    }
                  }}
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.willLearnMessages.map((item) => (
                  <Badge key={item} variant="secondary" className="gap-1">
                    {item}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0"
                      onClick={() => removeArrayItem("willLearnMessages", item)}
                    >
                      ×
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <Label>แท็ก</Label>
              <div className="flex gap-2">
                <Input
                  placeholder="พิมพ์แล้วกด Enter"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      addArrayItem("tags", e.currentTarget.value);
                      e.currentTarget.value = "";
                    }
                  }}
                />
              </div>
              <div className="flex flex-wrap gap-2 mt-2">
                {formData.tags.map((item) => (
                  <Badge key={item} variant="secondary" className="gap-1">
                    {item}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-4 w-4 p-0"
                      onClick={() => removeArrayItem("tags", item)}
                    >
                      ×
                    </Button>
                  </Badge>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t">
              <Button
                onClick={handleSaveDraft}
                disabled={saving || creating || updating}
                className="w-full"
              >
                {saving || creating || updating
                  ? "กำลังบันทึก..."
                  : "บันทึกร่าง"}
              </Button>
              <Button
                onClick={handleSubmitReview}
                disabled={!courseId || submitting || saving}
                variant="destructive"
                className="w-full"
              >
                {submitting ? "กำลังส่ง..." : "ส่งให้แอดมินตรวจสอบ"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
