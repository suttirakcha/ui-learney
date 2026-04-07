import { Lesson, LessonType } from "@/types/lesson/lesson.type";
import { fetchWithAuth } from "@/lib/api/fetchWithAuth";
import { getAccessToken } from "@/lib/api/auth/auth-store";

const API_URL = process.env.NEXT_PUBLIC_API!;

// ===============================
// ✅ GET ALL LESSONS IN A COURSE
// ===============================
export async function getLessonsByCourse(courseId: string): Promise<Lesson[]> {
  const res = await fetchWithAuth(`/courses/${courseId}/lessons`);

  if (!res.ok) {
    throw new Error("Failed to fetch lessons");
  }

  return res.json();
}

// ===============================
// ✅ CREATE LESSON (VIDEO or DOCS)
// FormData ต้องไม่ set Content-Type เพื่อให้ browser set boundary เอง
// ===============================
export async function createLesson(
  courseId: string,
  data: { title: string; type: LessonType; docs?: string },
  videoFile?: File,
): Promise<Lesson> {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("type", data.type);
  if (data.docs) formData.append("docs", data.docs);
  if (videoFile) formData.append("video", videoFile);

  const token = await getAccessToken();

  const res = await fetch(`${API_URL}/courses/${courseId}/lessons`, {
    method: "POST",
    body: formData,
    headers: token ? { Authorization: `Bearer ${token}` } : {},
    credentials: "include",
  });

  if (!res.ok) {
    const text = await res.text();
    console.error("createLesson error:", text);
    throw new Error("Failed to create lesson");
  }

  return res.json();
}

// ===============================
// ✅ DELETE LESSON
// ===============================
export async function deleteLesson(
  courseId: string,
  lessonId: string,
): Promise<void> {
  const res = await fetchWithAuth(
    `/courses/${courseId}/lessons/${lessonId}`,
    { method: "DELETE" },
  );

  if (!res.ok) {
    throw new Error("Failed to delete lesson");
  }
}
