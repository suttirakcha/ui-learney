"use client";

import LnButton from "@/components/custom/LnButton";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { Cart } from "@/types/cart/cart";
import { Course } from "@/types/course";
import MockQrPanel from "./MockQrPanel";
import PaymentStatusNotice from "./PaymentStatusNotice";
import PaymentSummary from "./PaymentSummary";
import PromptPayOption from "./PromptPayOption";
import { usePaymentDialog } from "./usePaymentDialog";

interface PaymentDialogProps {
  cart: Cart;
  courses: Course[];
}

const confirmButtonClassName =
  "h-12 w-full rounded-[14px] bg-primary text-primary-foreground hover:bg-primary/90";

export default function PaymentDialog({
  cart,
  courses,
}: PaymentDialogProps) {
  const {
    amount,
    handleConfirmPayment,
    handleCreateSession,
    hasCourses,
    isConfirming,
    isCreatingSession,
    isOpen,
    message,
    session,
    tone,
    updateDialogState,
  } = usePaymentDialog({
    cart,
    courses,
  });

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

            <Button
              type="button"
              variant="default"
              className={confirmButtonClassName}
              disabled={!session || isCreatingSession || isConfirming}
              onClick={handleConfirmPayment}
            >
              {isConfirming ? "กำลังบันทึกข้อมูล..." : "ยืนยันการชำระเงิน"}
            </Button>

            <p className="text-muted-foreground text-center text-xs">
              การชำระเงินนี้เป็นโหมดจำลองสำหรับเดโม และจะบันทึกข้อมูลเข้า
              dashboard เท่านั้น
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
