"use client";

import React, { useEffect, useRef, useState } from "react";
import { useChatbotStore } from "@/store/useChatbotStore";
import ChatMessage from "./ChatMessage";
import { X, Send, Sparkles } from "lucide-react";

export default function ChatWindow() {
  const {
    messages,
    isTyping,
    settings,
    suggestedQuestions,
    toggleChat,
    sendMessage,
  } = useChatbotStore();
  const [inputText, setInputText] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto scroll ลงล่างสุดเมื่อมีข้อความใหม่
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const handleSend = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!inputText.trim()) return;
    sendMessage(inputText);
    setInputText("");
  };

  const handleSuggestedClick = (question: string) => {
    sendMessage(question);
  };

  return (
    <div className="flex flex-col w-full h-[500px] sm:h-[600px] max-h-[80vh] bg-[#f8fafc] dark:bg-slate-900 rounded-2xl shadow-2xl overflow-hidden border border-slate-200 dark:border-slate-700">
      {/* Header */}
      <div className="bg-gradient-to-r from-brand-purple to-brand-pink p-4 flex justify-between items-center text-white shadow-sm shrink-0 relative z-10">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <Sparkles size={20} />
          </div>
          <div>
            <h3 className="font-bold text-lg leading-tight">LEARNEY AI</h3>
            <p className="text-xs text-white/80 font-medium">
              พร้อมให้คำแนะนำเสมอ 💡
            </p>
          </div>
        </div>
        <button
          onClick={toggleChat}
          className="p-2 hover:bg-white/20 rounded-full transition"
        >
          <X size={20} />
        </button>
      </div>

      {/* Message Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-2 relative">
        {messages.map((msg, idx) => (
          <ChatMessage key={msg.id || idx} message={msg} />
        ))}

        {isTyping && (
          <div className="flex w-full gap-3 justify-start mb-4 items-center text-slate-400">
            <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-800 flex items-center justify-center shrink-0">
              🤖
            </div>
            <div className="bg-white dark:bg-slate-800 p-3.5 rounded-2xl rounded-tl-sm border border-slate-100 dark:border-slate-700 flex gap-1 items-center">
              <span
                className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"
                style={{ animationDelay: "0ms" }}
              ></span>
              <span
                className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"
                style={{ animationDelay: "150ms" }}
              ></span>
              <span
                className="w-2 h-2 bg-slate-300 rounded-full animate-bounce"
                style={{ animationDelay: "300ms" }}
              ></span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Questions */}
      {suggestedQuestions.length > 0 && messages.length < 5 && (
        <div className="px-4 pb-2 flex gap-2 overflow-x-auto no-scrollbar shrink-0">
          {suggestedQuestions.map((sq) => (
            <button
              key={sq.id}
              onClick={() => handleSuggestedClick(sq.question)}
              className="whitespace-nowrap px-3 py-1.5 bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-brand-purple text-xs font-medium rounded-full hover:bg-brand-purple hover:text-white transition-colors shadow-sm"
            >
              {sq.question}
            </button>
          ))}
        </div>
      )}

      {/* Input Area */}
      <div className="p-3 bg-white dark:bg-slate-800 border-t border-slate-200 dark:border-slate-700 shrink-0">
        <form onSubmit={handleSend} className="flex gap-2 items-center">
          <input
            type="text"
            placeholder="พิมพ์ข้อความที่นี่..."
            className="flex-1 bg-slate-100 dark:bg-slate-900 border-none rounded-full px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-purple/50 dark:text-white transition-all"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
          <button
            type="submit"
            disabled={!inputText.trim() || isTyping}
            className="w-11 h-11 bg-brand-purple hover:bg-brand-purple/90 disabled:bg-slate-300 text-white rounded-full flex items-center justify-center transition-colors shrink-0 shadow-md"
          >
            <Send size={18} className="ml-1" />
          </button>
        </form>
      </div>
    </div>
  );
}
