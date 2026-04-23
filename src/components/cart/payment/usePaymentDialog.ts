"use client";

import { useAuth } from "@/app/lib/AuthContext";
import {
  confirmMockPayment,
  createMockPaymentSession,
  getMockPayment,
} from "@/lib/api/payment/payment.service";
import {
  getSessionStatusMessage,
  toPaymentNumber,
} from "@/lib/payment/mock-payment";
import { Cart, CartCourse } from "@/types/cart/cart";
import {
  MockPaymentDetailResponse,
  MockPaymentSessionResponse,
} from "@/types/payment/mock-payment";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import toast from "react-hot-toast";

type UsePaymentDialogParams = {
  cart: Cart;
  courses: CartCourse[];
};

type PaymentNoticeTone = "info" | "success" | "error";

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "เกิดข้อผิดพลาดในการเชื่อมต่อระบบชำระเงิน";
};

export function usePaymentDialog({
  cart,
  courses,
}: UsePaymentDialogParams) {
  const { user, setUser } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const isOpen = searchParams.get("payment") === "open";
  const amount = toPaymentNumber(cart.total) || toPaymentNumber(cart.subtotal);
  const hasCourses = courses.length > 0;

  const [session, setSession] = useState<MockPaymentSessionResponse | null>(
    null,
  );
  const [paymentDetail, setPaymentDetail] =
    useState<MockPaymentDetailResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCreatingSession, setIsCreatingSession] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [hasTriedAutoCreate, setHasTriedAutoCreate] = useState(false);

  const tone: PaymentNoticeTone = errorMessage
    ? "error"
    : paymentDetail?.sessionStatus === "SUCCESS"
      ? "success"
      : "info";
  const message =
    errorMessage ??
    getSessionStatusMessage(paymentDetail?.sessionStatus ?? "EMPTY");

  const resetDialogState = () => {
    setSession(null);
    setPaymentDetail(null);
    setErrorMessage(null);
    setHasTriedAutoCreate(false);
  };

  const updateDialogState = (nextOpen: boolean) => {
    const nextSearchParams = new URLSearchParams(searchParams.toString());

    if (nextOpen) {
      nextSearchParams.set("payment", "open");
    } else {
      nextSearchParams.delete("payment");
      resetDialogState();
    }

    const nextUrl = nextSearchParams.toString()
      ? `${pathname}?${nextSearchParams.toString()}`
      : pathname;

    router.replace(nextUrl, { scroll: false });
  };

  const syncPaymentDetail = useCallback(async (paymentId: string) => {
    const detail = await getMockPayment(paymentId);
    setPaymentDetail(detail);
    return detail;
  }, []);

  const syncLocalCourseAccess = useCallback(() => {
    if (!user) {
      return;
    }

    const nextCourseIds = new Set([
      ...(user.enrolledCourses ?? []).map((course) => course.courseId),
      ...courses.map((course) => course.id),
    ]);
    const nextUser = {
      ...user,
      enrolledCourses: Array.from(nextCourseIds).map((courseId) => ({
        courseId,
      })),
    };

    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(nextUser));
    }

    setUser(nextUser);
  }, [courses, setUser, user]);

  const handleCreateSession = useCallback(async () => {
    setIsCreatingSession(true);
    setErrorMessage(null);

    try {
      const createdSession = await createMockPaymentSession();
      setSession(createdSession);
      await syncPaymentDetail(createdSession.paymentId);
      toast.success("สร้าง QR จำลองเรียบร้อยแล้ว");
    } catch (error) {
      const message = getErrorMessage(error);
      setErrorMessage(message);
      toast.error(message);
    } finally {
      setIsCreatingSession(false);
    }
  }, [syncPaymentDetail]);

  useEffect(() => {
    if (
      !isOpen ||
      !hasCourses ||
      session ||
      isCreatingSession ||
      hasTriedAutoCreate
    ) {
      return;
    }

    setHasTriedAutoCreate(true);
    void handleCreateSession();
  }, [
    handleCreateSession,
    hasCourses,
    hasTriedAutoCreate,
    isCreatingSession,
    isOpen,
    session,
  ]);

  const handleConfirmPayment = async () => {
    if (!session) {
      return;
    }

    setIsConfirming(true);
    setErrorMessage(null);

    try {
      const result = await confirmMockPayment(session.paymentId);
      syncLocalCourseAccess();
      toast.success("ชำระเงินสำเร็จและปลดล็อกคอร์สเรียบร้อยแล้ว");
      resetDialogState();
      router.replace(
        `/payment/success?paymentId=${encodeURIComponent(
          session.paymentId,
        )}&enrolled=${result.enrolledCourseCount}`,
      );
    } catch (error) {
      const message = getErrorMessage(error);
      setErrorMessage(message);
      toast.error(message);

      try {
        await syncPaymentDetail(session.paymentId);
      } catch {
        // Keep the latest visible error message when the sync request fails.
      }
    } finally {
      setIsConfirming(false);
    }
  };

  return {
    amount,
    hasCourses,
    isConfirming,
    isCreatingSession,
    isOpen,
    message,
    session,
    tone,
    updateDialogState,
    handleConfirmPayment,
    handleCreateSession,
  };
}
