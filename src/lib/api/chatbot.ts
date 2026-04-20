import { fetchWithZustandAuth } from "@/lib/api/apiClient";

export const chatbotApi = {
  getSettings: async () => {
    return fetchWithZustandAuth<any>("/chatbot/settings/public");
  },
  getSuggestedQuestions: async () => {
    return fetchWithZustandAuth<any[]>("/chatbot/suggested-questions");
  },
  startSession: async (guestToken?: string) => {
    return fetchWithZustandAuth<any>("/chatbot/session", {
      method: "POST",
      body: JSON.stringify({ guestToken }),
    });
  },
  sendMessage: async (sessionId: string, message: string) => {
    return fetchWithZustandAuth<any>("/chatbot/message", {
      method: "POST",
      body: JSON.stringify({ sessionId, message }),
    });
  },
};
