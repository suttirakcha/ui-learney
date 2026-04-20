"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import {
  ArrowRight,
  Heart,
  MessageCircle,
  PlayCircle,
  Star,
  Users,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { CourseDetailData } from "@/types/learney";
import { usePreference } from "@/components/learney/providers/PreferenceProvider";
import {
  formatCurrency,
  formatNumber,
  pickLocalized,
  roleLabel,
} from "@/lib/learney";
import { addItemToCart } from "@/lib/api/cart/cart.service";
import { addToWishlist } from "@/lib/api/experience.service";
import { useAuth } from "@/app/lib/AuthContext";
import { CourseCard } from "./CourseCard";
import PromotionBadge from "@/components/PromotionBadge";

export function CourseDetailView({ data }: { data: CourseDetailData }) {
  const { locale } = usePreference();
  const { user } = useAuth();
  const router = useRouter();
  const { course } = data;

  const handleBuyNow = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    try {
      await addItemToCart(course.id);
      router.push("/checkout");
    } catch (error) {
      console.error(error);
      toast.error(
        locale === "th" ? "เพิ่มคอร์สไม่สำเร็จ" : "Unable to add course",
      );
    }
  };

  const handleWishlist = async () => {
    if (!user) {
      router.push("/login");
      return;
    }

    try {
      await addToWishlist(course.id);
      toast.success(
        locale === "th" ? "บันทึกลง Wishlist แล้ว" : "Saved to wishlist",
      );
    } catch (error) {
      console.error(error);
      toast.error(locale === "th" ? "บันทึกไม่สำเร็จ" : "Unable to save");
    }
  };

  return (
    <main className="pb-16">
      <section className="soft-surface">
        <div className="section-frame grid gap-8 py-12 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="space-y-5">
            <Link
              href="/courses"
              className="text-sm text-muted-foreground hover:text-foreground"
            >
              {locale === "th" ? "กลับไปหน้าคอร์ส" : "Back to courses"}
            </Link>
            <div className="space-y-3">
              <div className="flex flex-wrap items-center gap-2 text-xs text-muted-foreground">
                {course.badges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-md bg-white/70 px-2 py-1 text-foreground dark:bg-white/10"
                  >
                    {badge}
                  </span>
                ))}
              </div>
              <h1 className="max-w-3xl text-4xl font-semibold text-foreground">
                {pickLocalized(course.title, locale)}
              </h1>
              <p className="max-w-2xl text-lg text-muted-foreground">
                {pickLocalized(
                  course.description ?? course.shortDescription,
                  locale,
                )}
              </p>
            </div>

            <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
              <span className="inline-flex items-center gap-1">
                <Star className="h-4 w-4 fill-amber-300 text-amber-300" />
                {course.rating.toFixed(1)}
              </span>
              <span className="inline-flex items-center gap-1">
                <Users className="h-4 w-4" />
                {formatNumber(course.learners, locale)}
              </span>
              <span>{course.duration}</span>
            </div>

            <div className="glass-panel overflow-hidden rounded-lg">
              <div className="relative aspect-video">
                <Image
                  src={course.previewThumbnail ?? course.coverImage}
                  alt={pickLocalized(course.title, locale)}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/20">
                  <div className="rounded-full bg-white/80 p-4 text-foreground">
                    <PlayCircle className="h-10 w-10" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          <aside className="glass-panel h-fit rounded-lg p-6">
            {(course as any).promotion ? (
              <div className="mb-4">
                <PromotionBadge
                  discountType={(course as any).promotion.discountType}
                  discountValue={(course as any).promotion.discount}
                  size="md"
                />
              </div>
            ) : null}
            <div className="space-y-2">
              {course.discountPrice ? (
                <p className="text-sm text-muted-foreground line-through">
                  {formatCurrency(course.price, locale)}
                </p>
              ) : null}
              <p className="text-3xl font-semibold text-foreground">
                {formatCurrency(course.discountPrice ?? course.price, locale)}
              </p>
            </div>

            <div className="mt-6 grid gap-3">
              <Button
                size="lg"
                className="bg-primary text-primary-foreground"
                onClick={() => void handleBuyNow()}
              >
                {locale === "th" ? "Buy Now" : "Buy Now"}
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => void handleWishlist()}
              >
                <Heart className="mr-2 h-4 w-4" />
                {locale === "th" ? "Add to Wishlist" : "Add to Wishlist"}
              </Button>
              <Link
                href={`/skill-test/questions?ageGroup=${encodeURIComponent(
                  "Working Age (23+)",
                )}&courseId=${course.id}&assessmentKind=PRE_TEST&sourceType=COURSE_ASSESSMENT`}
              >
                <Button size="lg" variant="outline" className="w-full">
                  {locale === "th" ? "Start Pre-test" : "Start Pre-test"}
                </Button>
              </Link>
              <a href="#instructor">
                <Button
                  size="lg"
                  variant="ghost"
                  className="w-full justify-start"
                >
                  {locale === "th" ? "View Instructor" : "View Instructor"}
                </Button>
              </a>
              <Link href={`/community?courseId=${course.id}`}>
                <Button
                  size="lg"
                  variant="ghost"
                  className="w-full justify-start"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  {locale === "th" ? "Join Discussion" : "Join Discussion"}
                </Button>
              </Link>
              <a href="#related-courses">
                <Button
                  size="lg"
                  variant="ghost"
                  className="w-full justify-start"
                >
                  {locale === "th"
                    ? "View Related Courses"
                    : "View Related Courses"}
                </Button>
              </a>
            </div>
          </aside>
        </div>
      </section>

      <section className="section-frame grid gap-8 py-12 lg:grid-cols-[1fr_320px]">
        <div className="space-y-8">
          <div className="glass-panel rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-foreground">
              {locale === "th" ? "What you will learn" : "What you will learn"}
            </h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {course.willLearnMessages.map((item) => (
                <div
                  key={item}
                  className="rounded-lg bg-white/60 p-4 text-sm text-muted-foreground dark:bg-white/5"
                >
                  {item}
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-foreground">
              {locale === "th" ? "Course outline" : "Course outline"}
            </h2>
            <div className="mt-4 space-y-4">
              {course.modules.map((module) => (
                <div
                  key={module.id}
                  className="rounded-lg border border-white/40 bg-white/50 p-4 dark:bg-white/5"
                >
                  <div>
                    <p className="eyebrow">Module {module.order}</p>
                    <h3 className="mt-2 text-lg font-semibold text-foreground">
                      {pickLocalized(module.title, locale)}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {pickLocalized(module.summary, locale)}
                    </p>
                  </div>
                  <div className="mt-4 space-y-3">
                    {module.lessons.map((lesson) => (
                      <div
                        key={lesson.id}
                        className="rounded-lg bg-white/70 p-4 dark:bg-white/5"
                      >
                        <p className="text-sm font-medium text-foreground">
                          {lesson.order}. {pickLocalized(lesson.title, locale)}
                        </p>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {pickLocalized(lesson.summary, locale)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div id="community-preview" className="glass-panel rounded-lg p-6">
            <div className="flex items-end justify-between gap-4">
              <h2 className="text-2xl font-semibold text-foreground">
                {locale === "th"
                  ? "Community discussion"
                  : "Community discussion"}
              </h2>
              <Link
                href={`/community?courseId=${course.id}`}
                className="text-sm text-muted-foreground hover:text-foreground"
              >
                {locale === "th" ? "ดูทั้งหมด" : "View all"}
              </Link>
            </div>
            <div className="mt-4 space-y-4">
              {data.discussionPreview.map((thread) => (
                <div
                  key={thread.id}
                  className="rounded-lg border border-white/40 bg-white/50 p-4 dark:bg-white/5"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-lg font-semibold text-foreground">
                        {pickLocalized(thread.title, locale)}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {thread.author} · {roleLabel(thread.role, locale)}
                      </p>
                    </div>
                    {thread.pinned ? (
                      <span className="rounded-md bg-secondary/70 px-2 py-1 text-xs text-secondary-foreground">
                        {locale === "th" ? "Pinned" : "Pinned"}
                      </span>
                    ) : null}
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {pickLocalized(thread.content, locale)}
                  </p>
                  {thread.replies.length ? (
                    <div className="mt-3 rounded-lg bg-white/70 p-3 text-sm text-muted-foreground dark:bg-white/5">
                      {thread.replies[0].author}:{" "}
                      {pickLocalized(thread.replies[0].content, locale)}
                    </div>
                  ) : null}
                </div>
              ))}
            </div>
          </div>

          <div className="glass-panel rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-foreground">
              {locale === "th" ? "Reviews" : "Reviews"}
            </h2>
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              {data.reviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-lg border border-white/40 bg-white/50 p-4 dark:bg-white/5"
                >
                  <div className="flex items-center justify-between">
                    <p className="font-medium text-foreground">
                      {review.author}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {"★".repeat(review.rating)}
                    </p>
                  </div>
                  <p className="mt-3 text-sm text-muted-foreground">
                    {review.content}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <aside id="instructor" className="space-y-6">
          <div className="glass-panel rounded-lg p-5">
            <p className="eyebrow">
              {locale === "th" ? "Instructor profile" : "Instructor profile"}
            </p>
            <div className="mt-4 flex items-center gap-4">
              <div className="relative h-16 w-16 overflow-hidden rounded-lg bg-muted">
                {course.instructor.image ? (
                  <Image
                    src={course.instructor.image}
                    alt={course.instructor.name}
                    fill
                    className="object-cover"
                  />
                ) : null}
              </div>
              <div>
                <p className="text-lg font-semibold text-foreground">
                  {course.instructor.name}
                </p>
                <p className="text-sm text-muted-foreground">
                  {pickLocalized(
                    course.instructor.headline ?? { th: "", en: "" },
                    locale,
                  )}
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm text-muted-foreground">
              {pickLocalized(
                course.instructor.bio ?? { th: "", en: "" },
                locale,
              )}
            </p>
          </div>

          <div className="glass-panel rounded-lg p-5">
            <p className="eyebrow">
              {locale === "th" ? "Requirements" : "Requirements"}
            </p>
            <div className="mt-4 space-y-2 text-sm text-muted-foreground">
              {course.requirements.map((requirement) => (
                <p key={requirement}>{requirement}</p>
              ))}
            </div>
          </div>
        </aside>
      </section>

      <section id="related-courses" className="section-frame py-12">
        <div className="flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">
              {locale === "th" ? "Recommended next" : "Recommended next"}
            </p>
            <h2 className="mt-2 text-2xl font-semibold text-foreground">
              {locale === "th" ? "คอร์สที่เกี่ยวข้อง" : "Related courses"}
            </h2>
          </div>
          <Link
            href="/courses"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground"
          >
            {locale === "th" ? "ดูทั้งหมด" : "View all"}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-6 grid gap-5 md:grid-cols-3">
          {data.relatedCourses.map((relatedCourse) => (
            <CourseCard key={relatedCourse.id} course={relatedCourse} />
          ))}
        </div>
      </section>
    </main>
  );
}
