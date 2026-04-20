"use client";

import React, { useEffect } from "react";
import { MessageSquareText } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useChatbotStore } from "@/store/useChatbotStore";
import ChatWindow from "./ChatWindow";

export default function ChatWidget() {
  const { isOpen, toggleChat, initChat } = useChatbotStore();

  // เรียกใช้งาน initChat ทันทีเมื่อผู้ใช้กดเปิด Chat ครั้งแรก
  useEffect(() => {
    if (isOpen) initChat();
  }, [isOpen, initChat]);

  return (
    <div className="fixed bottom-6 right-6 sm:bottom-8 sm:right-8 z-50 flex flex-col items-end gap-4">
      {/* Pop-up Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-[calc(100vw-3rem)] sm:w-[400px] origin-bottom-right"
          >
            <ChatWindow />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <button
        onClick={toggleChat}
        className="w-14 h-14 bg-gradient-to-r from-brand-purple to-brand-pink text-white rounded-full shadow-xl shadow-brand-purple/30 flex items-center justify-center hover:scale-105 active:scale-95 transition-transform relative z-50"
      >
        <MessageSquareText size={24} />
      </button>
    </div>
  );
}
