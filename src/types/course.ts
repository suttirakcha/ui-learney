// export type Course = {
//   id: string;
//   courseName: string;
//   instructor: string;
//   price: number;
//   discount?: number;
// };

export type CourseStatus = "new" | "updated" | "deleted";

export interface Course {
  id: number;
  courseName: string;
  instructor: string;
  category: string;
  price: number;
  discount?: number;
  description: string;
  type: CourseStatus;
  date: string;
}
