"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

export type CourseLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

export interface CourseBuilderFormValues {
  courseName: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: string;
  level: CourseLevel;
}

interface CourseBuilderFormProps {
  value: CourseBuilderFormValues;
  onChange: <K extends keyof CourseBuilderFormValues>(
    key: K,
    value: CourseBuilderFormValues[K],
  ) => void;
  onSubmit?: () => void;
  className?: string;
  submitLabel?: string;
}

export default function CourseBuilderForm({
  value,
  onChange,
  onSubmit,
  className = "",
  submitLabel = "บันทึกร่างคอร์ส",
}: CourseBuilderFormProps) {
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSubmit?.();
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Course Builder</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={value.courseName}
            onChange={(event) => onChange("courseName", event.target.value)}
            placeholder="ชื่อคอร์ส"
          />
          <Input
            value={value.slug}
            onChange={(event) => onChange("slug", event.target.value)}
            placeholder="slug"
          />
          <Input
            value={value.category}
            onChange={(event) => onChange("category", event.target.value)}
            placeholder="หมวดหมู่"
          />
          <Textarea
            value={value.shortDescription}
            onChange={(event) =>
              onChange("shortDescription", event.target.value)
            }
            placeholder="คำอธิบายสั้น"
            rows={3}
          />
          <Textarea
            value={value.description}
            onChange={(event) => onChange("description", event.target.value)}
            placeholder="รายละเอียดคอร์ส"
            rows={6}
          />
          <div className="flex flex-wrap gap-2">
            {(["BEGINNER", "INTERMEDIATE", "ADVANCED"] as const).map(
              (level) => (
                <Button
                  key={level}
                  type="button"
                  variant={value.level === level ? "default" : "outline"}
                  onClick={() => onChange("level", level)}
                >
                  {level}
                </Button>
              ),
            )}
          </div>
          <Button type="submit" className="w-full">
            {submitLabel}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
