import { useEffect, useState } from "react";

import { fetchWithAuth } from "@/lib/api/fetchWithAuth";
import type { CourseStat } from "@/types/analytics";

interface DashboardCourse {
  courseId: string;
  courseName: string;
  sales: number;
  revenue: number;
  students: number;
  rating: number;
  category?: unknown;
}

interface InstructorDashboardResponse {
  courses?: DashboardCourse[];
}

function normalizeCategoryName(category?: unknown) {
  if (!category) {
    return undefined;
  }

  if (typeof category === "string") {
    return category;
  }

  if (typeof category === "object" && category !== null) {
    const localizedCategory = category as {
      name?: string;
      th?: string;
      en?: string;
    };

    return (
      localizedCategory.name ??
      localizedCategory.th ??
      localizedCategory.en ??
      undefined
    );
  }

  return undefined;
}

export function useInstructorCourses() {
  const [courses, setCourses] = useState<CourseStat[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchCourses = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetchWithAuth("/instructor/dashboard");

      if (!response.ok) {
        throw new Error("Failed to load instructor courses");
      }

      const data = (await response.json()) as InstructorDashboardResponse;
      const nextCourses =
        data.courses?.map((course) => {
          const categoryName = normalizeCategoryName(course.category);

          return {
            courseId: course.courseId,
            courseName: course.courseName,
            sales: course.sales,
            revenue: course.revenue,
            students: course.students,
            rating: course.rating,
            category: categoryName ? { name: categoryName } : undefined,
          };
        }) ?? [];

      setCourses(nextCourses);
      return nextCourses;
    } catch (caughtError) {
      const nextError =
        caughtError instanceof Error
          ? caughtError
          : new Error("Failed to load instructor courses");

      setError(nextError);
      setCourses([]);
      return [];
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void fetchCourses();
  }, []);

  return {
    courses,
    loading,
    error,
    refetch: fetchCourses,
  };
}
