import { fetchWithZustandAuth } from "@/lib/api/apiClient";

export const careerAssessmentApi = {
  // ฝั่ง User
  getQuestions: async () => {
    return fetchWithZustandAuth<any>("/career-assessment/questions");
  },
  startSession: async () => {
    return fetchWithZustandAuth<any>("/career-assessment/start", {
      method: "POST",
    });
  },
  submitAssessment: async (payload: { sessionId: string; answers: any[] }) => {
    return fetchWithZustandAuth<any>("/career-assessment/submit", {
      method: "POST",
      body: JSON.stringify(payload),
    });
  },
  getResult: async (resultId: string) => {
    return fetchWithZustandAuth<any>(`/career-assessment/results/${resultId}`);
  },

  // ฝั่ง Admin
  getAdminDashboard: async () => {
    return fetchWithZustandAuth<{
      totalSessions: number;
      completedResults: number;
      popularCareers: { name: string; count: number }[];
      recentResults: any[];
    }>("/admin/career-assessment/dashboard");
  },
};
