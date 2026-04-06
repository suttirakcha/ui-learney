export type LessonType = "VIDEO" | "DOCS";

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  type: LessonType;
  video: string | null;
  docs: string | null;
  createdAt: string;
  updatedAt: string;
}
