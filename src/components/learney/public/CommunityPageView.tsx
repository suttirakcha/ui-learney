"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import toast from "react-hot-toast";
import { MessageCircle, ShieldAlert } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { CommunityData } from "@/types/learney";
import { usePreference } from "@/components/learney/providers/PreferenceProvider";
import { pickLocalized, roleLabel } from "@/lib/learney";
import {
  createCommunityReply,
  createCommunityThread,
  reportCommunityContent,
} from "@/lib/api/experience.service";
import { useAuth } from "@/app/lib/AuthContext";

export function CommunityPageView({ data }: { data: CommunityData }) {
  const { locale } = usePreference();
  const { user } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const courseId = searchParams.get("courseId") ?? undefined;
  const [postContent, setPostContent] = useState("");
  const [replyDrafts, setReplyDrafts] = useState<Record<string, string>>({});

  const requireLogin = () => {
    if (!user) {
      router.push("/login");
      return false;
    }

    return true;
  };

  return (
    <main className="section-frame space-y-8 py-12">
      <div className="soft-surface rounded-lg px-6 py-10">
        <p className="eyebrow">{locale === "th" ? "Public Read, Members Write" : "Public Read, Members Write"}</p>
        <h1 className="mt-2 text-3xl font-semibold text-foreground">
          {locale === "th" ? "Learney Community" : "Learney Community"}
        </h1>
        <p className="mt-3 max-w-2xl text-muted-foreground">
          {locale === "th"
            ? "ถามคำถาม แชร์ use case และอ่านบทสนทนาที่ช่วยให้เรียนต่อได้ลึกขึ้น"
            : "Ask questions, share use cases, and learn from thoughtful discussions."}
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="glass-panel rounded-lg p-4">
            <p className="text-sm text-muted-foreground">{locale === "th" ? "ทั้งหมด" : "Total"}</p>
            <p className="mt-2 text-2xl font-semibold">{data.highlights.totalThreads}</p>
          </div>
          <div className="glass-panel rounded-lg p-4">
            <p className="text-sm text-muted-foreground">{locale === "th" ? "คำถาม" : "Questions"}</p>
            <p className="mt-2 text-2xl font-semibold">{data.highlights.questions}</p>
          </div>
          <div className="glass-panel rounded-lg p-4">
            <p className="text-sm text-muted-foreground">{locale === "th" ? "Discussion" : "Discussion"}</p>
            <p className="mt-2 text-2xl font-semibold">{data.highlights.discussions}</p>
          </div>
        </div>
      </div>

      <section className="glass-panel rounded-lg p-6">
        <h2 className="text-xl font-semibold text-foreground">
          {locale === "th" ? "เริ่มบทสนทนาใหม่" : "Start a new thread"}
        </h2>
        <Textarea
          value={postContent}
          onChange={(event) => setPostContent(event.currentTarget.value)}
          placeholder={
            locale === "th"
              ? "เล่าโจทย์ คำถาม หรือสิ่งที่อยากชวนคุย"
              : "Share a question, challenge, or useful idea"
          }
          className="mt-4 min-h-28 rounded-lg"
        />
        <div className="mt-4 flex justify-end">
          <Button
            className="bg-primary text-primary-foreground"
            onClick={async () => {
              if (!requireLogin()) {
                return;
              }

              await createCommunityThread({
                courseId,
                content: { th: postContent, en: postContent },
                type: "discussion",
              });
              toast.success(
                locale === "th" ? "สร้างโพสต์แล้ว" : "Thread created",
              );
              router.refresh();
            }}
          >
            {locale === "th" ? "โพสต์" : "Post"}
          </Button>
        </div>
      </section>

      <section className="space-y-5">
        {data.threads.map((thread) => (
          <article key={thread.id} className="glass-panel rounded-lg p-6">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="rounded-md bg-secondary/70 px-2 py-1 text-secondary-foreground">
                    {thread.type}
                  </span>
                  {thread.pinned ? (
                    <span className="rounded-md bg-white/70 px-2 py-1 text-foreground dark:bg-white/10">
                      {locale === "th" ? "Pinned" : "Pinned"}
                    </span>
                  ) : null}
                  {thread.course ? (
                    <span className="rounded-md bg-white/70 px-2 py-1 text-foreground dark:bg-white/10">
                      {pickLocalized(thread.course.title, locale)}
                    </span>
                  ) : null}
                </div>
                <h2 className="mt-3 text-xl font-semibold text-foreground">
                  {pickLocalized(thread.title, locale)}
                </h2>
                <p className="mt-1 text-sm text-muted-foreground">
                  {thread.author.name} · {roleLabel(thread.author.role, locale)}
                </p>
              </div>

              <Button
                variant="ghost"
                onClick={async () => {
                  if (!requireLogin()) {
                    return;
                  }

                  await reportCommunityContent({
                    threadId: thread.id,
                    reason:
                      locale === "th" ? "Need moderator review" : "Need moderator review",
                  });
                  toast.success(
                    locale === "th" ? "ส่งรายงานแล้ว" : "Report sent",
                  );
                }}
              >
                <ShieldAlert className="mr-2 h-4 w-4" />
                {locale === "th" ? "Report" : "Report"}
              </Button>
            </div>

            <p className="mt-4 text-sm text-muted-foreground">
              {pickLocalized(thread.content, locale)}
            </p>

            <div className="mt-5 space-y-3">
              {thread.replies.map((reply) => (
                <div
                  key={reply.id}
                  className="rounded-lg border border-white/40 bg-white/50 p-4 dark:bg-white/5"
                >
                  <div className="flex items-center gap-2 text-sm text-foreground">
                    <MessageCircle className="h-4 w-4 text-muted-foreground" />
                    <span>{reply.author.name}</span>
                    <span className="text-muted-foreground">
                      {roleLabel(reply.author.role, locale)}
                    </span>
                  </div>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {pickLocalized(reply.content, locale)}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-5 space-y-3">
              <Textarea
                value={replyDrafts[thread.id] ?? ""}
                onChange={(event) =>
                  setReplyDrafts((current) => ({
                    ...current,
                    [thread.id]: event.currentTarget.value,
                  }))
                }
                placeholder={
                  locale === "th" ? "พิมพ์คำตอบของคุณ" : "Write your reply"
                }
                className="min-h-24 rounded-lg"
              />
              <div className="flex justify-end">
                <Button
                  variant="outline"
                  onClick={async () => {
                    if (!requireLogin()) {
                      return;
                    }

                    const content = replyDrafts[thread.id];

                    if (!content?.trim()) {
                      return;
                    }

                    await createCommunityReply(thread.id, {
                      content: { th: content, en: content },
                    });
                    toast.success(
                      locale === "th" ? "ตอบกลับแล้ว" : "Reply posted",
                    );
                    router.refresh();
                  }}
                >
                  {locale === "th" ? "Reply" : "Reply"}
                </Button>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
