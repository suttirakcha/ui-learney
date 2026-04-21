// แนะนำให้ตั้งค่า NEXT_PUBLIC_API_URL ในไฟล์ .env
const baseURL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";

// Helper function สำหรับใช้งาน Fetch API แทน axios
async function fetchApi<T>(
  endpoint: string,
  options: RequestInit = {},
): Promise<T> {
  const url = new URL(endpoint, baseURL);
  const res = await fetch(url.toString(), {
    ...options,
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },
    credentials: "include", // สำหรับส่ง Cookie/Session ไปยัง Backend (เทียบเท่ากับ withCredentials: true)
  });

  if (!res.ok) {
    const errorData = await res.json().catch(() => ({}));
    const error: any = new Error(errorData.message || "API Error");
    error.response = { data: errorData, status: res.status }; // จำลองโครงสร้าง error ให้คล้าย axios เพื่อให้ UI เดิมไม่พัง
    throw error;
  }

  return res.json() as Promise<T>;
}

// --- Types ---
export interface AnswerPayload {
  questionId: string;
  selectedChoiceId?: string;
  textAnswer?: string;
}

export interface TestAttemptResponse {
  id: string;
  status: "IN_PROGRESS" | "SUBMITTED" | "EVALUATED";
  totalScore?: number;
  maxScore?: number;
  normalizedScore?: number;
  evaluation?: any;
}

// --- API Services ---
export const testApi = {
  // 1. ดึงข้อมูลแบบทดสอบพร้อมโครงสร้างคำถาม (แต่ไม่เฉลย)
  getCourseTest: async (courseId: string, type: "PRE_TEST" | "POST_TEST") => {
    return fetchApi<any>(`/courses/${courseId}/tests?type=${type}`);
  },

  // 2. เริ่มทำข้อสอบ (สร้าง Attempt ใน Database)
  startAttempt: async (testId: string) => {
    return fetchApi<TestAttemptResponse>(`/tests/${testId}/attempts`, {
      method: "POST",
    });
  },

  // 3. ส่งคำตอบทั้งหมดและรับผลประเมินกลับมา
  submitAttempt: async (
    attemptId: string,
    answers: AnswerPayload[],
    learnerSnapshot?: any,
  ) => {
    return fetchApi<TestAttemptResponse>(`/attempts/${attemptId}/submit`, {
      method: "POST",
      body: JSON.stringify({ answers, learnerSnapshot }),
    });
  },

  // 4. ดึงข้อมูลเปรียบเทียบ Pre-test vs Post-test
  getComparison: async (courseId: string) => {
    return fetchApi<{
      preTestScore: number;
      postTestScore: number;
      maxScore: number;
      dimensions: Array<{
        subject: string;
        preScore: number;
        postScore: number;
        fullMark: number;
      }>;
    }>(`/courses/${courseId}/tests/comparison`);
  },
};
