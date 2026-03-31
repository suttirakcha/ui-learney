export type Course = {
  id: string;
  courseName: string;
  instructor: string;
  price: number;
  discount?: number;
};

export type Activity = {
  type: 'review' | 'enrollment';
  user: string;
  course: string;
};
