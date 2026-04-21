"use client";

import Image from "next/image";
import Link from "next/link";
import { startTransition, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  BadgeCheck,
  BarChart3,
  BookOpen,
  Bot,
  Brain,
  Lightbulb,
  Loader2,
  MessageCircle,
  Minimize2,
  RefreshCw,
  Send,
  Shield,
  Sparkles,
  Star,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import {
  type MascotMode,
  type MascotPosition,
  type MascotSize,
  type MascotLocale,
  MASCOT_NAME,
  getMascotActions,
  getMascotBadge,
  getMascotDescription,
  getMascotEmptyState,
  getMascotMessage,
  getMascotModeConfig,
  getMascotPromptHints,
} from "@/lib/mascot";
import { usePreference } from "@/components/learney/providers/PreferenceProvider";

type ChatRole = "user" | "assistant";

type ChatMessage = {
  id: string;
  role: ChatRole;
  content: string;
};

export interface MascotAssistantProps {
  mode?: MascotMode;
  message?: string;
  position?: MascotPosition;
  size?: MascotSize;
  imageSrc?: string;
}

const sizeClasses: Record<
  MascotSize,
  { button: string; panel: string; avatar: string }
> = {
  sm: {
    button: "h-14 w-14",
    panel: "w-[min(20rem,calc(100vw-1.5rem))] h-[min(32rem,calc(100vh-5rem))]",
    avatar: "h-16 w-16",
  },
  md: {
    button: "h-16 w-16",
    panel: "w-[min(23rem,calc(100vw-1.5rem))] h-[min(35rem,calc(100vh-5rem))]",
    avatar: "h-20 w-20",
  },
  lg: {
    button: "h-[4.5rem] w-[4.5rem]",
    panel: "w-[min(26rem,calc(100vw-1.5rem))] h-[min(38rem,calc(100vh-5rem))]",
    avatar: "h-24 w-24",
  },
};

const positionClasses: Record<MascotPosition, string> = {
  "bottom-right": "bottom-4 right-4 sm:bottom-6 sm:right-6",
  "bottom-left": "bottom-4 left-4 sm:bottom-6 sm:left-6",
};

const modeIllustrationStyles: Record<
  MascotMode,
  { objectPosition: string; scale: number }
> = {
  // The replacement mascot is a centered portrait illustration, so we keep
  // one consistent crop that shows the face clearly in both the bubble and panel.
  welcome: { objectPosition: "50% 36%", scale: 1.55 },
  recommend: { objectPosition: "50% 36%", scale: 1.55 },
  quiz: { objectPosition: "50% 36%", scale: 1.55 },
  success: { objectPosition: "50% 36%", scale: 1.55 },
  error: { objectPosition: "50% 36%", scale: 1.55 },
  assistant: { objectPosition: "50% 36%", scale: 1.55 },
};

const iconMap = {
  sparkles: Sparkles,
  book: BookOpen,
  brain: Brain,
  success: BadgeCheck,
  alert: AlertCircle,
  bot: Bot,
} as const;

const decorations: Record<MascotMode, Array<typeof Sparkles>> = {
  welcome: [Sparkles, BookOpen, MessageCircle],
  recommend: [BookOpen, Lightbulb, Star],
  quiz: [Brain, Lightbulb, Sparkles],
  success: [BadgeCheck, BarChart3, Star],
  error: [AlertCircle, RefreshCw, Shield],
  assistant: [Bot, Sparkles, MessageCircle],
};

function createMessageId() {
  return `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
}

function toMascotLocale(locale: string): MascotLocale {
  return locale === "en" ? "en" : "th";
}

type ResolvedMascotAction = ReturnType<typeof getMascotActions>[number];

export function MascotAssistant({
  mode = "assistant",
  message,
  position = "bottom-right",
  size = "md",
  imageSrc = "/mascot/learney-mascot-replacement.png",
}: MascotAssistantProps) {
  const { locale } = usePreference();
  const mascotLocale = toMascotLocale(locale);
  const config = getMascotModeConfig(mode);
  const ModeIcon = iconMap[config.icon];
  const floatingIcons = decorations[mode];
  const [open, setOpen] = useState(false);
  const [showBubble, setShowBubble] = useState(true);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const resolvedMessage = message ?? getMascotMessage(mode, mascotLocale);
  const description = getMascotDescription(mode, mascotLocale);
  const badge = getMascotBadge(mode, mascotLocale);
  const emptyState = getMascotEmptyState(mode, mascotLocale);
  const promptHints = getMascotPromptHints(mode, mascotLocale);
  const actions = getMascotActions(mode, mascotLocale);
  const art = modeIllustrationStyles[mode];
  const bubbleAlignment =
    position === "bottom-left" ? "items-start" : "items-end";

  useEffect(() => {
    setShowBubble(true);
  }, [mode, resolvedMessage]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  useEffect(() => {
    if (open) {
      inputRef.current?.focus();
    }
  }, [open]);

  const openPanel = () => {
    startTransition(() => {
      setOpen(true);
      setShowBubble(false);
    });
  };

  const collapsePanel = () => {
    startTransition(() => {
      setOpen(false);
      setShowBubble(true);
    });
  };

  const sendMessage = async (prefilled?: string) => {
    const text = (prefilled ?? input).trim();
    if (!text || loading) {
      return;
    }

    const userMessage: ChatMessage = {
      id: createMessageId(),
      role: "user",
      content: text,
    };
    const nextMessages = [...messages, userMessage];

    setMessages(nextMessages);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          mode,
          messages: nextMessages.map(({ role, content }) => ({ role, content })),
        }),
      });

      if (!res.ok || !res.body) {
        throw new Error("Unable to reach assistant");
      }

      const assistantId = createMessageId();
      setMessages((current) => [
        ...current,
        { id: assistantId, role: "assistant", content: "" },
      ]);

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let assistantText = "";

      while (true) {
        const { done, value } = await reader.read();
        if (done) {
          break;
        }

        assistantText += decoder.decode(value, { stream: true });
        setMessages((current) =>
          current.map((item) =>
            item.id === assistantId
              ? { ...item, content: assistantText }
              : item,
          ),
        );
      }
    } catch {
      setMessages((current) => [
        ...current,
        {
          id: createMessageId(),
          role: "assistant",
          content:
            mascotLocale === "en"
              ? "I hit a small snag, but I am still here to help. Try asking in a shorter sentence."
              : "ฉันสะดุดนิดหน่อย แต่ยังช่วยได้อยู่นะ ลองถามใหม่สั้น ๆ อีกครั้งได้เลย",
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = (action: ResolvedMascotAction) => {
    if (action.kind === "prompt" && action.prompt) {
      openPanel();
      void sendMessage(action.prompt);
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      void sendMessage();
    }
  };

  return (
    <div className={cn("fixed z-[60]", positionClasses[position])}>
      <AnimatePresence initial={false} mode="wait">
        {open ? (
          <motion.section
            key="mascot-panel"
            initial={{ opacity: 0, y: 20, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.96 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className={cn(
              "pointer-events-auto flex flex-col overflow-hidden rounded-[2rem] border border-white/40 bg-card/95 shadow-[0_22px_80px_rgba(46,21,95,0.22)] backdrop-blur-xl",
              sizeClasses[size].panel,
            )}
          >
            <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-primary/12 text-primary">
                  <ModeIcon className="h-5 w-5" />
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {MASCOT_NAME}
                  </p>
                  <p className="text-xs text-muted-foreground">{badge}</p>
                </div>
              </div>

              <div className="flex items-center gap-1">
                <Button
                  type="button"
                  variant="ghost"
                  size="icon-sm"
                  aria-label="ย่อผู้ช่วย"
                  onClick={collapsePanel}
                >
                  <Minimize2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="flex min-h-0 flex-1 flex-col gap-4 p-4">
              <div className="relative overflow-hidden rounded-[1.6rem] border border-white/45 bg-gradient-to-br from-brand-sky/18 via-white to-brand-primary/12 p-4 dark:from-brand-sky/10 dark:via-card dark:to-brand-secondary/10">
                <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-brand-secondary/10 to-transparent" />
                <div className="flex gap-3">
                  <motion.div
                    animate={{
                      y: [0, -5, 0],
                      rotate: mode === "success" ? [0, -3, 3, 0] : [0, -2, 0],
                    }}
                    transition={{
                      duration: 3.2,
                      repeat: Number.POSITIVE_INFINITY,
                      ease: "easeInOut",
                    }}
                    className={cn(
                      "relative shrink-0 overflow-hidden rounded-[1.4rem] border border-white/50 bg-white/70 shadow-lg dark:bg-white/10",
                      sizeClasses[size].avatar,
                    )}
                  >
                    <Image
                      src={imageSrc}
                      alt={`${MASCOT_NAME} mascot`}
                      fill
                      sizes="160px"
                      className="object-cover"
                      style={{
                        objectPosition: art.objectPosition,
                        transform: `scale(${art.scale})`,
                      }}
                    />
                  </motion.div>

                  <div className="min-w-0 flex-1">
                    <div className="inline-flex items-center gap-2 rounded-full bg-white/75 px-3 py-1 text-xs font-semibold text-foreground shadow-sm dark:bg-white/10">
                      <ModeIcon className="h-3.5 w-3.5 text-primary" />
                      {badge}
                    </div>
                    <p className="mt-3 text-sm font-semibold text-foreground">
                      {resolvedMessage}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-muted-foreground">
                      {description}
                    </p>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-2">
                  {floatingIcons.map((FloatingIcon, index) => (
                    <motion.div
                      key={`${mode}-${index}`}
                      animate={{ y: [0, -3, 0] }}
                      transition={{
                        duration: 2.4 + index * 0.4,
                        repeat: Number.POSITIVE_INFINITY,
                        ease: "easeInOut",
                      }}
                      className="inline-flex items-center gap-1 rounded-full border border-white/60 bg-white/70 px-2.5 py-1 text-xs text-muted-foreground dark:bg-white/10"
                    >
                      <FloatingIcon className="h-3.5 w-3.5 text-primary" />
                      {promptHints[index] ?? promptHints[0]}
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="grid gap-2 sm:grid-cols-2">
                {actions.map((action) =>
                  action.kind === "link" && action.href ? (
                    <Button
                      key={`${mode}-${action.label}`}
                      type="button"
                      asChild
                      variant={action.style}
                      size="sm"
                    >
                      <Link href={action.href}>{action.label}</Link>
                    </Button>
                  ) : (
                    <Button
                      key={`${mode}-${action.label}`}
                      type="button"
                      variant={action.style}
                      size="sm"
                      onClick={() => handleAction(action)}
                    >
                      {action.label}
                    </Button>
                  ),
                )}
              </div>

              <div className="flex flex-wrap gap-2">
                {promptHints.map((hint) => (
                  <button
                    key={hint}
                    type="button"
                    onClick={() => void sendMessage(hint)}
                    className="rounded-full border border-border/70 bg-background/70 px-3 py-1.5 text-xs font-medium text-muted-foreground transition hover:border-primary/40 hover:text-foreground"
                  >
                    {hint}
                  </button>
                ))}
              </div>

              <div className="min-h-0 flex-1 overflow-y-auto rounded-[1.5rem] border border-border/60 bg-background/65 p-3">
                {messages.length === 0 ? (
                  <div className="flex h-full flex-col items-center justify-center text-center">
                    <Bot className="h-10 w-10 text-primary/70" />
                    <p className="mt-3 text-sm font-medium text-foreground">
                      {resolvedMessage}
                    </p>
                    <p className="mt-1 max-w-xs text-xs leading-5 text-muted-foreground">
                      {emptyState}
                    </p>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {messages.map((item) => (
                      <div
                        key={item.id}
                        className={cn(
                          "flex",
                          item.role === "user"
                            ? "justify-end"
                            : "justify-start",
                        )}
                      >
                        <div
                          className={cn(
                            "max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-6 shadow-sm",
                            item.role === "user"
                              ? "rounded-br-sm bg-primary text-primary-foreground"
                              : "rounded-bl-sm border border-border/70 bg-card text-foreground",
                          )}
                        >
                          {item.content || (
                            <span className="inline-flex items-center gap-2 text-muted-foreground">
                              <Loader2 className="h-3.5 w-3.5 animate-spin" />
                              {mascotLocale === "en"
                                ? "Thinking..."
                                : "กำลังคิด..."}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}

                    {loading &&
                    messages[messages.length - 1]?.role !== "assistant" ? (
                      <div className="flex justify-start">
                        <div className="rounded-2xl rounded-bl-sm border border-border/70 bg-card px-3 py-2 text-muted-foreground shadow-sm">
                          <Loader2 className="h-4 w-4 animate-spin" />
                        </div>
                      </div>
                    ) : null}
                    <div ref={bottomRef} />
                  </div>
                )}
              </div>

              <div className="rounded-[1.5rem] border border-border/60 bg-card/90 p-3 shadow-sm">
                <div className="flex items-end gap-2">
                  <textarea
                    ref={inputRef}
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={handleKeyDown}
                    rows={1}
                    placeholder={
                      mascotLocale === "en"
                        ? "Ask Crossy about your learning..."
                        : "ถาม Crossy เรื่องการเรียนได้เลย..."
                    }
                    className="min-h-10 flex-1 resize-none bg-transparent px-1 py-1 text-sm outline-none placeholder:text-muted-foreground"
                  />
                  <Button
                    type="button"
                    size="icon-sm"
                    onClick={() => void sendMessage()}
                    disabled={!input.trim() || loading}
                    aria-label={
                      mascotLocale === "en"
                        ? "Send message"
                        : "ส่งข้อความ"
                    }
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </motion.section>
        ) : (
          <motion.div
            key="mascot-bubble"
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 18 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className={cn("flex flex-col gap-3", bubbleAlignment)}
          >
            <AnimatePresence>
              {showBubble ? (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.96 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.96 }}
                  className="pointer-events-auto max-w-[19rem] rounded-[1.4rem] border border-white/50 bg-card/95 px-4 py-3 text-sm shadow-[0_16px_42px_rgba(48,23,87,0.16)] backdrop-blur-xl"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-primary/12 text-primary">
                      <ModeIcon className="h-4 w-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="font-semibold text-foreground">
                        {resolvedMessage}
                      </p>
                      <p className="mt-1 text-xs leading-5 text-muted-foreground">
                        {description}
                      </p>
                    </div>
                    <button
                      type="button"
                      className="text-muted-foreground transition hover:text-foreground"
                      onClick={() => setShowBubble(false)}
                      aria-label={
                        mascotLocale === "en" ? "Hide hint" : "ซ่อนข้อความ"
                      }
                    >
                      <X className="h-4 w-4" />
                    </button>
                  </div>
                </motion.div>
              ) : null}
            </AnimatePresence>

            <motion.button
              type="button"
              onClick={openPanel}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.98 }}
              animate={{ y: [0, -4, 0] }}
              transition={{
                y: {
                  duration: 3.4,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                },
              }}
              aria-label={
                mascotLocale === "en"
                  ? "Open mascot assistant"
                  : "เปิดผู้ช่วยมาสคอต"
              }
              className={cn(
                "pointer-events-auto relative overflow-hidden rounded-full border border-white/55 shadow-[0_18px_50px_rgba(44,18,86,0.2)]",
                sizeClasses[size].button,
              )}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-brand-sky via-white to-brand-primary" />
              <Image
                src={imageSrc}
                alt={`${MASCOT_NAME} mascot`}
                fill
                sizes="96px"
                className="object-cover"
                style={{
                  objectPosition: art.objectPosition,
                  transform: `scale(${art.scale})`,
                }}
              />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,transparent_32%,rgba(15,23,42,0.08)_100%)]" />
              <div className="absolute right-0 top-0 flex h-7 w-7 items-center justify-center rounded-full border border-white/80 bg-white/90 text-primary shadow-sm">
                <ModeIcon className="h-3.5 w-3.5" />
              </div>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
