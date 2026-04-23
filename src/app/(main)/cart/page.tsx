"use client";

import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Loader2, ShoppingCart, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import OrderSummary from "@/components/cart/OrderSummary";
import { useAuth } from "@/app/lib/AuthContext";
import { usePreference } from "@/components/learney/providers/PreferenceProvider";
import { formatCurrency, pickLocalized } from "@/lib/learney";
import {
  applyPromotionCode,
  deleteItemFromCart,
  getCurrentCart,
  removePromotionCode,
} from "@/lib/api/cart/cart.service";
import type { Cart, CartCourse } from "@/types/cart/cart";

const FALLBACK_COURSE_IMAGE =
  "https://placehold.co/960x720/f7dfe5/4a3245?text=LEARNEY";

function createEmptyCart(): Cart {
  return {
    id: "",
    subtotal: 0,
    total: 0,
    discount: 0,
    appliedPromotionId: null,
    appliedPromotionCode: null,
  };
}

export default function CartPage() {
  const { locale } = usePreference();
  const { user } = useAuth();
  const router = useRouter();

  const [cart, setCart] = useState<Cart>(createEmptyCart());
  const [courses, setCourses] = useState<CartCourse[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingCourseId, setRemovingCourseId] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const loadCart = useCallback(async () => {
    try {
      const response = await getCurrentCart();
      setCart(response.cart);
      setCourses(response.courses);
      setErrorMessage(null);
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "ไม่สามารถโหลดข้อมูลตะกร้าสินค้าได้";
      setErrorMessage(message);
      setCart(createEmptyCart());
      setCourses([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    void loadCart();
  }, [loadCart, router, user]);

  const handleRemoveCourse = async (courseId: string) => {
    setRemovingCourseId(courseId);

    try {
      const result = await deleteItemFromCart(courseId);
      toast.success(result.message);
      await loadCart();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "ลบคอร์สออกจากตะกร้าไม่สำเร็จ";
      toast.error(message);
    } finally {
      setRemovingCourseId(null);
    }
  };

  const handleApplyPromotion = async (code: string) => {
    try {
      const result = await applyPromotionCode(code);
      toast.success(result.message);
      await loadCart();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "ใช้โปรโมชันไม่สำเร็จ";
      toast.error(message);
      throw error;
    }
  };

  const handleRemovePromotion = async () => {
    try {
      const result = await removePromotionCode();
      toast.success(result.message);
      await loadCart();
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "ลบโปรโมชันไม่สำเร็จ";
      toast.error(message);
      throw error;
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <main className="section-frame py-12 md:py-16">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground md:text-4xl">
          {locale === "th" ? "ตะกร้าสินค้าของคุณ" : "Shopping Cart"}
        </h1>
        <p className="mt-2 text-muted-foreground">
          {courses.length.toLocaleString(locale === "th" ? "th-TH" : "en-US")}{" "}
          {locale === "th" ? "รายการในตะกร้า" : "items in your cart"}
        </p>
      </div>

      {errorMessage ? (
        <div className="mb-6 rounded-2xl border border-destructive/30 bg-destructive/5 p-4 text-destructive">
          {errorMessage}
        </div>
      ) : null}

      {courses.length === 0 ? (
        <div className="glass-panel flex flex-col items-center justify-center space-y-4 rounded-2xl p-12 text-center">
          <div className="mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
            <ShoppingCart size={32} />
          </div>
          <h2 className="text-2xl font-semibold text-foreground">
            {locale === "th"
              ? "ตะกร้าของคุณยังว่างเปล่า"
              : "Your cart is empty"}
          </h2>
          <p className="max-w-md text-muted-foreground">
            {locale === "th"
              ? "เลือกคอร์สที่สนใจแล้วกลับมาชำระเงินได้ทุกเมื่อ"
              : "Pick a course you like and come back anytime to check out."}
          </p>
          <Link href="/courses" className="mt-6">
            <Button size="lg" className="bg-primary text-primary-foreground">
              {locale === "th" ? "เลือกดูคอร์สเรียน" : "Browse Courses"}
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid items-start gap-8 lg:grid-cols-[1fr_380px]">
          <div className="space-y-4">
            {courses.map((course) => {
              const isRemoving = removingCourseId === course.id;
              const finalPrice = Number(course.discountPrice ?? course.price ?? 0);
              const originalPrice =
                course.discountPrice !== null &&
                course.discountPrice !== undefined
                  ? Number(course.price ?? 0)
                  : null;
              const courseTitle = pickLocalized(
                course.title ?? course.courseName,
                locale,
                course.courseName,
              );

              return (
                <div
                  key={course.id}
                  className={`glass-panel flex flex-col items-start gap-5 rounded-2xl p-4 transition-opacity sm:flex-row sm:items-center ${
                    isRemoving ? "pointer-events-none opacity-50" : ""
                  }`}
                >
                  <Link
                    href={`/courses/${course.slug || course.id}`}
                    className="relative h-28 w-full shrink-0 overflow-hidden rounded-xl sm:w-40"
                  >
                    <Image
                      src={
                        course.coverImage ||
                        course.thumbnail ||
                        FALLBACK_COURSE_IMAGE
                      }
                      alt={courseTitle}
                      fill
                      className="object-cover"
                    />
                  </Link>

                  <div className="min-w-0 flex-1">
                    <Link href={`/courses/${course.slug || course.id}`}>
                      <h3 className="line-clamp-2 text-lg font-bold text-foreground transition-colors hover:text-primary">
                        {courseTitle}
                      </h3>
                    </Link>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {locale === "th" ? "ผู้สอน:" : "By:"}{" "}
                      {course.instructor || "Learney"}
                    </p>
                  </div>

                  <div className="flex w-full items-center justify-between gap-4 sm:w-auto sm:flex-col sm:items-end">
                    <div className="text-right">
                      <p className="text-xl font-bold text-foreground">
                        {formatCurrency(finalPrice, locale)}
                      </p>
                      {originalPrice ? (
                        <p className="text-sm text-muted-foreground line-through">
                          {formatCurrency(originalPrice, locale)}
                        </p>
                      ) : null}
                    </div>

                    <button
                      type="button"
                      className="rounded-lg p-2 text-red-500 transition-colors hover:bg-red-50 hover:text-red-600 dark:hover:bg-red-500/10"
                      disabled={isRemoving}
                      onClick={() => void handleRemoveCourse(course.id)}
                    >
                      {isRemoving ? (
                        <Loader2 className="h-5 w-5 animate-spin" />
                      ) : (
                        <Trash2 className="h-5 w-5" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          <OrderSummary
            cart={cart}
            courses={courses}
            onApplyPromotion={handleApplyPromotion}
            onRemovePromotion={handleRemovePromotion}
          />
        </div>
      )}
    </main>
  );
}
