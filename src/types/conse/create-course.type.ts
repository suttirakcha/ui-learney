export type CreateCoursePayload = {
  courseName: string;
  description: string;
  category: string;
  price: number;
  tags: string[];
  thumbnail: string;
  videoPreview: string;
};
