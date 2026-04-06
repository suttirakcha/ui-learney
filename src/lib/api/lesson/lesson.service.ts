import { LessonType } from "@/types/lesson/lesson.type";

export async function getLessonById(courseId: string): Promise<LessonType[]> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API}/courses/${courseId}/lessons`,
    {
      method: "GET",
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch lesson");
  }

  return response.json();
}
