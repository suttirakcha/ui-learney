import React from "react";
import { Bot, User, ChevronRight } from "lucide-react";
import type { ChatMessage as ChatMessageType } from "@/store/useChatbotStore";
import Link from "next/link";

export default function ChatMessage({ message }: { message: ChatMessageType }) {
  const isBot = message.senderType === "BOT" || message.senderType === "SYSTEM";

  return (
    <div
      className={`flex w-full gap-3 ${isBot ? "justify-start" : "justify-end"} mb-4`}
    >
      {isBot && (
        <div className="w-8 h-8 rounded-full bg-gradient-to-br from-brand-purple to-brand-pink flex items-center justify-center text-white shrink-0 mt-1 shadow-sm">
          <Bot size={16} />
        </div>
      )}

      <div className={`max-w-[80%] flex flex-col gap-2`}>
        {/* Text Bubble */}
        {message.message && (
          <div
            className={`p-3.5 text-[15px] leading-relaxed shadow-sm ${
              isBot
                ? "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-2xl rounded-tl-sm border border-slate-100 dark:border-slate-700"
                : "bg-brand-purple text-white rounded-2xl rounded-tr-sm"
            }`}
          >
            {message.message}
          </div>
        )}

        {/* Rich Response: Course Card */}
        {message.messageType === "COURSE_CARD" && message.metadata?.courses && (
          <div className="flex flex-col gap-2 mt-1">
            {message.metadata.courses.map((course: any) => (
              <Link
                key={course.id}
                href={`/courses/${course.slug || course.id}`}
              >
                <div className="bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-xl p-3 flex gap-3 items-center hover:border-brand-purple hover:shadow-md transition cursor-pointer">
                  <img
                    src={
                      course.image || "https://placehold.co/100x100?text=Course"
                    }
                    alt={course.name}
                    className="w-16 h-16 object-cover rounded-lg shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-sm text-slate-800 dark:text-white truncate">
                      {course.name}
                    </h4>
                    <p className="text-brand-purple text-sm font-semibold mt-1">
                      ฿{Number(course.price).toLocaleString()}
                    </p>
                  </div>
                  <ChevronRight size={18} className="text-slate-400 shrink-0" />
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>

      {!isBot && (
        <div className="w-8 h-8 rounded-full bg-slate-200 dark:bg-slate-700 flex items-center justify-center text-slate-500 shrink-0 mt-1">
          <User size={16} />
        </div>
      )}
    </div>
  );
}
