import { Lesson, Quiz } from "@/types/course-builder";
import { z } from "zod";

export interface CourseDraft {
  id?: string;
  step1: {
    courseName: string;
    slug: string;
    shortDescription: string;
    description: string;
    category: string;
    level: "BEGINNER" | "INTERMEDIATE" | "ADVANCED";
    language: string;
    estimatedDuration: string;
    tags: string[];
    learningObjectives: string;
    targetAudience: string;
    outcomes: string;
  };
  step2: {
    lessons: Lesson[];
  };
  step3: {
    videos: Array<{
      id: string;
      title: string;
      url: string;
      previewEnabled: boolean;
      thumbnail: string;
    }>;
  };
  step4: {
    quizzes: Quiz[];
  };
  step5: {
    resources: Array<{
      title: string;
      type: string;
      url: string;
    }>;
  };
  step6: {
    price: number;
    promoPrice?: number;
    promoStart?: string;
    promoEnd?: string;
    maxStudents?: number;
  };
  step7: {
    thumbnail: string;
    primaryColor: string;
    themeKey: string;
  };
  step8: {
    readyToPublish: boolean;
  };
  updatedAt: string;
  status: "draft" | "pending" | "published";
}

export const Step1Schema = z.object({
  courseName: z.string().min(1, "ชื่อคอร์สจำเป็นต้องมี"),
  slug: z.string().min(1, "Slug จำเป็นต้องมี"),
  // ... more
});
