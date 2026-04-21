"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";

type CourseLevel = "BEGINNER" | "INTERMEDIATE" | "ADVANCED";

interface CourseBuilderFormValues {
  courseName: string;
  slug: string;
  shortDescription: string;
  description: string;
  category: string;
  level: CourseLevel;
}

interface CourseBuilderFormProps {
  onSuccess?: (courseId: string) => void;
  initialData?: Partial<CourseBuilderFormValues>;
  className?: string;
}

const defaultValues: CourseBuilderFormValues = {
  courseName: "",
  slug: "",
  shortDescription: "",
  description: "",
  category: "AI_TECH",
  level: "BEGINNER",
};

export default function CourseBuilderForm({
  onSuccess,
  initialData,
  className = "",
}: CourseBuilderFormProps) {
  const [values, setValues] = useState<CourseBuilderFormValues>({
    ...defaultValues,
    ...initialData,
  });

  const updateField = <K extends keyof CourseBuilderFormValues>(
    key: K,
    value: CourseBuilderFormValues[K],
  ) => {
    setValues((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSuccess?.("draft-course");
  };

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle>Course Builder</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            value={values.courseName}
            onChange={(event) => updateField("courseName", event.target.value)}
            placeholder="ชื่อคอร์ส"
          />
          <Input
            value={values.slug}
            onChange={(event) => updateField("slug", event.target.value)}
            placeholder="slug"
          />
          <Input
            value={values.category}
            onChange={(event) => updateField("category", event.target.value)}
            placeholder="หมวดหมู่"
          />
          <Textarea
            value={values.shortDescription}
            onChange={(event) =>
              updateField("shortDescription", event.target.value)
            }
            placeholder="คำอธิบายสั้น"
            rows={3}
          />
          <Textarea
            value={values.description}
            onChange={(event) => updateField("description", event.target.value)}
            placeholder="รายละเอียดคอร์ส"
            rows={6}
          />
          <div className="flex flex-wrap gap-2">
            {(["BEGINNER", "INTERMEDIATE", "ADVANCED"] as const).map((level) => (
              <Button
                key={level}
                type="button"
                variant={values.level === level ? "default" : "outline"}
                onClick={() => updateField("level", level)}
              >
                {level}
              </Button>
            ))}
          </div>
          <Button type="submit" className="w-full">
            บันทึกร่างคอร์ส
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
