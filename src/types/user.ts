export type Role = "USER" | "ADMIN" | "INSTRUCTOR";

export type AuthenticatedUser = {
  id?: string;
  fullname: string;
  image?: string;
  email?: string;
  phone?: string;
  role: Role;
  enrolledCourses?: {
    courseId: string;
  }[];
};
