export type Instructor = {
  fullname: string;
};

export type Course = {
  id: string;
  courseName: string;
  instructor: Instructor;
};
