export interface Lesson {
  id: string;
  title: string;
  content: string;
  videoUrl?: string;
  durationMin?: number;
  downloadable: boolean;
  order: number;
}

export interface Quiz {
  id: string;
  courseId: string;
  lessonId?: string;
  question: string;
  choices: string[];
  answer: string;
  explanation?: string;
}

export interface CourseOutline {
  title: string;
  description: string;
  highlights: string[];
  lessons: Lesson[];
  quizzes: Quiz[];
  finalProject: string;
  nextCourses: string[];
  youtubeVideos: string[];
  thumbnailPrompt: string;
}

export const mockLessons = [
  {
    id: "lesson-1",
    title: "AI ทำเงินได้ยังไงในปี 2026",
    durationMin: 18,
    videoUrl: "https://www.youtube.com/watch?v=example1",
    content: `
ในบทนี้คุณจะเข้าใจว่า AI สามารถช่วยสร้างรายได้จาก
- ขายสินค้า
- รับงานฟรีแลนซ์
- ทำคอนเทนต์
- ทำเว็บไซต์
`,
    order: 1,
    downloadable: false,
  },
  {
    id: "lesson-2",
    title: "ใช้ ChatGPT + Gemini ฟรี",
    durationMin: 24,
    videoUrl: "https://www.youtube.com/watch?v=example2",
    content: `
เปรียบเทียบการใช้งาน ChatGPT และ Gemini
พร้อมตัวอย่าง prompt ที่ใช้ได้จริง
`,
    order: 2,
    downloadable: true,
  },
] as Lesson[];
