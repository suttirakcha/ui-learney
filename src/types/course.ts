export type CourseStatus = "new" | "updated" | "deleted";

export interface Course {
  id: string;
  price: number;
  category: string;
  course_name: string;
  instructor: string;
  rating: number;
  students: number;
  duration: string;
  level: string;
  thumbnail: string;
  description?: string;
}

export type Activity = {
  type: "review" | "enrollment";
  user: string;
  course: string;
};
