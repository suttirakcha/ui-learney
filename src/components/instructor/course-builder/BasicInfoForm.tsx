import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Label } from "@/components/ui/label";

interface BasicInfoFormProps {
  onNext: () => void;
  onBack: () => void;
  className?: string;
}

export function BasicInfoForm({
  onNext,
  onBack,
  className,
}: BasicInfoFormProps) {
  type CourseLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

  const [formData, setFormData] = useState({
    courseName: "",
    slug: "",
    shortDescription: "",
    description: "",
    category: "AI_TECH",
    level: "BEGINNER" as CourseLevel,
    language: "ไทย",
    duration: "",
    tags: [] as string[],
    objectives: "",
    audience: "",
    outcomes: "",
  });
  const [tagInput, setTagInput] = useState("");

  const updateField = <K extends keyof typeof formData>(
    key: K,
    value: (typeof formData)[K],
  ) => {
    setFormData((prev) => ({ ...prev, [key]: value }));
  };

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9ก-๙]/g, "-")
      .replace(/-+/g, "-");
  };

  const addTag = (tag: string) => {
    if (tag && !formData.tags.includes(tag)) {
      updateField("tags", [...formData.tags, tag]);
    }
  };

  const removeTag = (tagToRemove: string) => {
    updateField(
      "tags",
      formData.tags.filter((tag) => tag !== tagToRemove),
    );
  };

  const handleNext = () => {
    // Validate
    if (!formData.courseName || !formData.slug) return;

    console.log("Step 1 data:", formData);
    onNext();
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="text-2xl">ข้อมูลพื้นฐานของคอร์ส</CardTitle>
        <CardDescription>
          ตั้งชื่อคอร์สให้ชัดเจน เช่น คอร์ส Next.js สำหรับผู้เริ่มต้น
          เพื่อให้ผู้เรียนเข้าใจทันทีว่าคอร์สนี้สอนอะไร
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <div>
            <Label>ชื่อคอร์ส</Label>
            <Input
              value={formData.courseName}
              onChange={(e) => {
                updateField("courseName", e.target.value);
                updateField("slug", generateSlug(e.target.value));
              }}
              placeholder="ชื่อคอร์สที่ชัดเจนและน่าสนใจ"
            />
          </div>

          <div>
            <Label>Slug (สำหรับ URL)</Label>
            <Input
              value={formData.slug}
              onChange={(e) => updateField("slug", e.target.value)}
              placeholder="learney-com-nextjs-beginner"
            />
            <p className="text-xs text-muted-foreground mt-1">
              URL จะเป็น learney.com/courses/{formData.slug}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <Label>หมวดหมู่</Label>
              <Select
                value={formData.category}
                onValueChange={(value) => updateField("category", value)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="AI_TECH">AI & เทคโนโลยี</SelectItem>
                  <SelectItem value="MARKETING">การตลาด</SelectItem>
                  <SelectItem value="DEVELOPMENT">พัฒนาโปรแกรม</SelectItem>
                  <SelectItem value="BUSINESS">ธุรกิจ</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>ระดับ</Label>
              <Select
                value={formData.level}
                onValueChange={(value) =>
                  updateField("level", value as CourseLevel)
                }
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BEGINNER">เริ่มต้น</SelectItem>
                  <SelectItem value="INTERMEDIATE">กลาง</SelectItem>
                  <SelectItem value="ADVANCED">สูง</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>คำอธิบายสั้น (สำหรับแสดงในรายการคอร์ส)</Label>
            <Textarea
              value={formData.shortDescription}
              onChange={(e) => updateField("shortDescription", e.target.value)}
              placeholder="คอร์สนี้จะสอน..."
              rows={3}
            />
          </div>

          <div>
            <Label>รายละเอียดเต็ม</Label>
            <Textarea
              value={formData.description}
              onChange={(e) => updateField("description", e.target.value)}
              placeholder="อธิบายคอร์สอย่างละเอียด..."
              rows={6}
            />
          </div>

          <div className="space-y-2">
            <Label>Tags</Label>
            <div className="flex gap-2 items-end">
              <Input
                value={tagInput}
                onChange={(event) => setTagInput(event.target.value)}
                placeholder="พิมพ์ tag แล้วกด Enter"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addTag(tagInput.trim());
                    setTagInput("");
                  }
                }}
              />
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={!tagInput.trim()}
                onClick={() => {
                  addTag(tagInput.trim());
                  setTagInput("");
                }}
              >
                เพิ่ม
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {formData.tags.map((tag) => (
                <Badge
                  key={tag}
                  variant="secondary"
                  className="flex items-center gap-1"
                >
                  {tag}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-4 w-4 p-0 ml-1"
                    onClick={() => removeTag(tag)}
                  >
                    ×
                  </Button>
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className="flex gap-3 pt-6 border-t">
          <Button type="button" variant="outline" onClick={onBack}>
            ย้อนกลับ
          </Button>
          <Button onClick={handleNext}>ถัดไป: เนื้อหาและบทเรียน</Button>
        </div>
      </CardContent>
    </Card>
  );
}
