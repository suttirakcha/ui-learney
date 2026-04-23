"use client";

import { type FormEvent, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PaymentDialog from "@/components/cart/payment/PaymentDialog";
import { formatPaymentCurrency } from "@/lib/payment/mock-payment";
import { Cart, CartCourse } from "@/types/cart/cart";
import toast from "react-hot-toast";

interface OrderSummaryProps {
  cart: Cart;
  courses: CartCourse[];
  onApplyPromotion: (code: string) => Promise<void>;
  onRemovePromotion: () => Promise<void>;
}

export default function OrderSummary({
  cart,
  courses,
  onApplyPromotion,
  onRemovePromotion,
}: OrderSummaryProps) {
  const { subtotal, total, discount, appliedPromotionCode } = cart;
  const [promotionCode, setPromotionCode] = useState("");
  const [isApplyingPromotion, setIsApplyingPromotion] = useState(false);
  const [isRemovingPromotion, setIsRemovingPromotion] = useState(false);

  const handleApplyPromotion = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const trimmedCode = promotionCode.trim();

    if (!trimmedCode) {
      toast.error("กรุณากรอกรหัสโปรโมชัน");
      return;
    }

    setIsApplyingPromotion(true);

    try {
      await onApplyPromotion(trimmedCode);
      setPromotionCode("");
    } catch {
      // Parent handler already shows a user-facing error message.
    } finally {
      setIsApplyingPromotion(false);
    }
  };

  const handleRemovePromotion = async () => {
    setIsRemovingPromotion(true);

    try {
      await onRemovePromotion();
      setPromotionCode("");
    } catch {
      // Parent handler already shows a user-facing error message.
    } finally {
      setIsRemovingPromotion(false);
    }
  };

  return (
    <div className="space-y-6 rounded-xl border p-6">
      <h2 className="text-2xl font-bold">สรุปรายการ</h2>
      <div className="flex flex-col gap-4">
        <div className="space-y-1">
          <h3 className="font-semibold">รหัสคูปอง</h3>
          {appliedPromotionCode ? (
            <div className="flex items-center justify-between rounded-lg border border-emerald-200 bg-emerald-50 px-3 py-2 text-sm text-emerald-700">
              <span>ใช้งานอยู่: {appliedPromotionCode}</span>
              <Button
                type="button"
                variant="ghost"
                className="h-auto px-0 text-emerald-700 hover:bg-transparent hover:text-emerald-800"
                disabled={isRemovingPromotion}
                onClick={() => void handleRemovePromotion()}
              >
                {isRemovingPromotion ? "กำลังลบ..." : "ลบ"}
              </Button>
            </div>
          ) : (
            <form className="flex gap-2" onSubmit={handleApplyPromotion}>
              <Input
                type="text"
                placeholder="ใส่รหัสคูปอง"
                value={promotionCode}
                disabled={isApplyingPromotion || !courses.length}
                onChange={(event) => setPromotionCode(event.currentTarget.value)}
              />
              <Button
                type="submit"
                variant="outline"
                disabled={
                  isApplyingPromotion || !courses.length || !promotionCode.trim()
                }
              >
                {isApplyingPromotion ? "กำลังใช้..." : "ใช้"}
              </Button>
            </form>
          )}
        </div>
        <div className="flex items-center justify-between">
          <span>ราคารวม:</span>
          <p className="font-medium">{formatPaymentCurrency(subtotal)}</p>
        </div>
        <div className="flex items-center justify-between">
          <span>ส่วนลด:</span>
          <p className="font-medium">
            -{formatPaymentCurrency(discount ?? 0)}
          </p>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold">ยอดรวมทั้งหมด:</span>
          <p className="text-primary text-xl font-bold">
            {formatPaymentCurrency(total)}
          </p>
        </div>
        <PaymentDialog cart={cart} courses={courses} />
        <p className="text-muted-foreground text-xs text-center">
          รับประกันคืนเงิน 30 วัน
        </p>
      </div>
    </div>
  );
}
