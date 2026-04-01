export interface Lesson {
  id: string;
  title: string;
  content?: string;
}

export interface CourseDetail {
  id: string;
  title: string;
  description: string;
  price: string;
  instructor: string;
  image: string;

  rating: number;
  students: number;
  duration: string;
  level: string;

  lessons: Lesson[];
}
