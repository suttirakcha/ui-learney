export type StudentOverviewCourse = {
  courseId: string;
  courseName: string;
  category: string;
  thumbnail: string;
  instructorName: string;
  purchasedAt: string | null;
};

export type StudentOverviewData = {
  stats: {
    enrolledCourses: number;
    successfulPayments: number;
    totalSpent: number;
  };
  courses: StudentOverviewCourse[];
};

export type InstructorCourseStatus =
  | "PENDING"
  | "ACTIVE"
  | "DRAFT"
  | "CANCELLED";

export type InstructorCourseView = {
  id: string;
  courseName: string;
  category: string;
  thumbnail: string;
  status: InstructorCourseStatus;
  students: number;
  rating: number;
  revenue: number;
  createdAt: string;
};

export type AdminPendingPreviewItem = {
  id: string;
  courseName: string;
  instructorName: string;
  createdAt: string;
};
