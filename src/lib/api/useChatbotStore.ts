import { create } from "zustand";
import { persist } from "zustand/middleware";
import { chatbotApi } from "@/lib/api/chatbot";

export interface ChatMessage {
  id: string;
  senderType: "USER" | "BOT" | "SYSTEM";
  message: string;
  messageType: "TEXT" | "COURSE_CARD" | "ACTION_LINK";
  metadata?: any;
  createdAt?: string;
}

interface ChatbotState {
  isOpen: boolean;
  isInitialized: boolean;
  isTyping: boolean;
  guestToken: string | null;
  session: any | null;
  messages: ChatMessage[];
  settings: any | null;
  suggestedQuestions: any[];

  toggleChat: () => void;
  initChat: () => Promise<void>;
  sendMessage: (text: string) => Promise<void>;
}

const generateGuestToken = () =>
  Math.random().toString(36).substring(2, 15) +
  Math.random().toString(36).substring(2, 15);

export const useChatbotStore = create<ChatbotState>()(
  persist(
    (set, get) => ({
      isOpen: false,
      isInitialized: false,
      isTyping: false,
      guestToken: null,
      session: null,
      messages: [],
      settings: null,
      suggestedQuestions: [],

      toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),

      initChat: async () => {
        const { isInitialized, guestToken } = get();
        if (isInitialized) return;

        try {
          const [settings, suggested] = await Promise.all([
            chatbotApi.getSettings(),
            chatbotApi.getSuggestedQuestions(),
          ]);

          const currentGuestToken = guestToken || generateGuestToken();
          const sessionData = await chatbotApi.startSession(currentGuestToken);

          set({
            settings,
            suggestedQuestions: suggested,
            guestToken: currentGuestToken,
            session: sessionData.session,
            messages: sessionData.messages || [],
            isInitialized: true,
          });
        } catch (error) {
          console.error("Failed to initialize chatbot:", error);
        }
      },

      sendMessage: async (text: string) => {
        const { session, messages } = get();
        if (!session) return;

        // เพิ่มข้อความผู้ใช้เข้า UI ทันที (Optimistic update)
        const tempUserMsg: ChatMessage = {
          id: Date.now().toString(),
          senderType: "USER",
          message: text,
          messageType: "TEXT",
        };
        set({ messages: [...messages, tempUserMsg], isTyping: true });

        try {
          // ยิง API ไปที่ Backend
          const botReply = await chatbotApi.sendMessage(session.id, text);
          set((state) => ({
            messages: [...state.messages, botReply],
            isTyping: false,
          }));
        } catch (error) {
          console.error("Failed to send message:", error);
          const errorMsg: ChatMessage = {
            id: Date.now().toString(),
            senderType: "SYSTEM",
            message: "เกิดข้อผิดพลาดในการส่งข้อความ กรุณาลองใหม่อีกครั้ง",
            messageType: "TEXT",
          };
          set((state) => ({
            messages: [...state.messages, errorMsg],
            isTyping: false,
          }));
        }
      },
    }),
    {
      name: "learney-chatbot-storage",
      partialize: (state) => ({ guestToken: state.guestToken }), // เก็บเฉพาะ guestToken ลง localStorage
    },
  ),
);
