"use client";

import LnButton from "@/components/custom/LnButton";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  confirmMockPayment,
  createMockPaymentSession,
  getMockPayment,
} from "@/lib/api/payment/payment.service";
import {
  getSessionStatusMessage,
  toPaymentNumber,
} from "@/lib/payment/mock-payment";
import { Cart } from "@/types/cart/cart";
import { Course } from "@/types/course";
import {
  MockPaymentDetailResponse,
  MockPaymentSessionResponse,
} from "@/types/payment/mock-payment";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { startTransition, useEffect, useState } from "react";
import toast from "react-hot-toast";
import MockQrPanel from "./MockQrPanel";
import PaymentStatusNotice from "./PaymentStatusNotice";
import PaymentSummary from "./PaymentSummary";
import PromptPayOption from "./PromptPayOption";

interface PaymentDialogProps {
  cart: Cart;
  courses: Course[];
}

const getErrorMessage = (error: unknown) => {
  if (error instanceof Error && error.message) {
    return error.message;
  }

  return "เกิดข้อผิดพลาดในการเชื่อมต่อระบบชำระเงิน";
};

export default function PaymentDialog({
  cart,
  courses,
}: PaymentDialogProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const isOpen = searchParams.get("payment") === "open";
  const [session, setSession] = useState<MockPaymentSessionResponse | null>(
    null,
  );
  const [paymentDetail, setPaymentDetail] =
    useState<MockPaymentDetailResponse | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isCreatingSession, setIsCreatingSession] = useState(false);
  const [isConfirming, setIsConfirming] = useState(false);
  const [hasTriedAutoCreate, setHasTriedAutoCreate] = useState(false);

  const amount = toPaymentNumber(cart.total) || toPaymentNumber(cart.subtotal);
  const hasCourses = courses.length > 0;

  const updateDialogState = (nextOpen: boolean) => {
    const nextSearchParams = new URLSearchParams(searchParams.toString());

    if (nextOpen) {
      nextSearchParams.set("payment", "open");
    } else {
      nextSearchParams.delete("payment");
      setSession(null);
      setPaymentDetail(null);
      setErrorMessage(null);
      setHasTriedAutoCreate(false);
    }

    const nextUrl = nextSearchParams.toString()
      ? `${pathname}?${nextSearchParams.toString()}`
      : pathname;

    router.replace(nextUrl, { scroll: false });
  };

  const syncPaymentDetail = async (paymentId: string) => {
    const detail = await getMockPayment(paymentId);
    setPaymentDetail(detail);
    return detail;
  };

  const handleCreateSession = async () => {
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
  };

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
  }, [hasCourses, hasTriedAutoCreate, isCreatingSession, isOpen, session]);

  const handleConfirmPayment = async () => {
    if (!session) {
      return;
    }

    setIsConfirming(true);
    setErrorMessage(null);

    try {
      await confirmMockPayment(session.paymentId);
      toast.success("บันทึกการชำระเงินจำลองเรียบร้อยแล้ว");
      updateDialogState(false);
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      const message = getErrorMessage(error);
      setErrorMessage(message);
      toast.error(message);

      try {
        await syncPaymentDetail(session.paymentId);
      } catch {
        // Ignore sync failures here and keep the visible error message.
      }
    } finally {
      setIsConfirming(false);
    }
  };

  const tone = errorMessage
    ? "error"
    : paymentDetail?.sessionStatus === "SUCCESS"
      ? "success"
      : "info";
  const message =
    errorMessage ??
    getSessionStatusMessage(paymentDetail?.sessionStatus ?? "EMPTY");

  return (
    <>
      <LnButton disabled={!hasCourses} onClick={() => updateDialogState(true)}>
        ชำระเงิน
      </LnButton>

      <Dialog open={isOpen} onOpenChange={updateDialogState}>
        <DialogContent className="max-w-[calc(100%-2rem)] gap-0 overflow-hidden rounded-[24px] border border-gray-200 p-0 shadow-[0_20px_60px_rgba(15,23,42,0.18)] sm:max-w-[560px]">
          <div className="space-y-5 bg-white p-5 sm:p-6">
            <div className="sr-only">
              <DialogTitle>ชำระเงิน</DialogTitle>
              <DialogDescription>
                หน้าต่างสำหรับชำระเงินแบบ PromptPay โหมดจำลอง
              </DialogDescription>
            </div>

            <PaymentSummary amount={amount} courseCount={courses.length} />
            <PromptPayOption />

            <div className="space-y-4">
              <MockQrPanel session={session} isLoading={isCreatingSession} />
              <PaymentStatusNotice message={message} tone={tone} />
            </div>

            {!session ? (
              <Button
                type="button"
                variant="outline"
                className="h-12 w-full rounded-[14px] border-gray-200 text-[15px] font-medium text-gray-700"
                disabled={isCreatingSession || isConfirming}
                onClick={handleCreateSession}
              >
                {isCreatingSession ? "กำลังสร้าง QR จำลอง..." : "สร้าง QR จำลอง"}
              </Button>
            ) : (
              <button
                type="button"
                className="block w-full text-center text-sm font-medium text-gray-500 underline-offset-2 hover:text-gray-700 hover:underline"
                disabled={isCreatingSession || isConfirming}
                onClick={handleCreateSession}
              >
                สร้าง QR ใหม่
              </button>
            )}

            <LnButton
              className="h-12 w-full rounded-[14px] border-0 bg-[#69d8f4] text-[17px] font-semibold text-slate-900 hover:bg-[#58d1ef]"
              disabled={!session || isCreatingSession || isConfirming}
              onClick={handleConfirmPayment}
            >
              {isConfirming ? "กำลังบันทึกข้อมูล..." : "ยืนยันการชำระเงิน"}
            </LnButton>

            <p className="text-center text-xs text-gray-400">
              การชำระเงินนี้เป็นโหมดจำลองสำหรับเดโม และจะบันทึกข้อมูลเข้า dashboard เท่านั้น
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
