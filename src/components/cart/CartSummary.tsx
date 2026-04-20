"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { Loader2, Ticket, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { formatCurrency } from "@/lib/learney";
import { usePreference } from "@/components/learney/providers/PreferenceProvider";

const API_URL = process.env.NEXT_PUBLIC_API!;

interface CartSummaryProps {
  initialSubtotal: number;
  cartItems: any[];
  onCheckout: (finalData: {
    subtotal: number;
    discountAmount: number;
    finalTotal: number;
    appliedPromo: string | null;
  }) => void;
}

export default function CartSummary({
  initialSubtotal,
  cartItems,
  onCheckout,
}: CartSummaryProps) {
  const { locale } = usePreference();
  const [subtotal, setSubtotal] = useState(initialSubtotal);
  const [discountAmount, setDiscountAmount] = useState(0);
  const [finalTotal, setFinalTotal] = useState(initialSubtotal);

  const [promoCodeInput, setPromoCodeInput] = useState("");
  const [appliedPromo, setAppliedPromo] = useState<string | null>(null);
  const [isApplying, setIsApplying] = useState(false);

  // รีเซ็ตยอดและโค้ดเมื่อของในตะกร้ามีการเปลี่ยนแปลง
  useEffect(() => {
    setSubtotal(initialSubtotal);
    if (appliedPromo) {
      handleRemovePromo();
    } else {
      setFinalTotal(initialSubtotal);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialSubtotal]);

  const handleApplyPromo = async (e: React.FormEvent) => {
    e.preventDefault();
    const code = promoCodeInput.trim().toUpperCase();
    if (!code) return;

    setIsApplying(true);
    try {
      const res = await fetch(`${API_URL}/cart/apply-promo`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ promoCode: code }),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "โค้ดส่วนลดไม่ถูกต้อง");
      }

      setDiscountAmount(data.discountAmount);
      setFinalTotal(data.finalTotal);
      setAppliedPromo(data.promoCode);
      toast.success(
        locale === "th" ? "ใช้โค้ดส่วนลดสำเร็จ! 🎉" : "Promo code applied!",
      );
    } catch (error: any) {
      toast.error(error.message || "เกิดข้อผิดพลาดในการใช้โค้ดส่วนลด");
      setPromoCodeInput("");
    } finally {
      setIsApplying(false);
    }
  };

  const handleRemovePromo = () => {
    setAppliedPromo(null);
    setPromoCodeInput("");
    setDiscountAmount(0);
    setFinalTotal(subtotal);
  };

  return (
    <div className="glass-panel rounded-2xl p-6 shadow-sm space-y-6 sticky top-24">
      <h2 className="text-xl font-bold text-foreground">
        {locale === "th" ? "สรุปคำสั่งซื้อ" : "Order Summary"}
      </h2>

      <div className="space-y-3">
        <p className="text-sm font-medium text-muted-foreground">
          {locale === "th" ? "โค้ดส่วนลด" : "Promo Code"}
        </p>
        {appliedPromo ? (
          <div className="flex items-center justify-between bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 p-3 rounded-xl border border-emerald-500/20">
            <div className="flex items-center gap-2 font-bold">
              <Ticket size={18} />
              {appliedPromo}
            </div>
            <button
              onClick={handleRemovePromo}
              className="hover:opacity-70 transition"
            >
              <XCircle size={18} />
            </button>
          </div>
        ) : (
          <form onSubmit={handleApplyPromo} className="flex gap-2">
            <Input
              type="text"
              placeholder={
                locale === "th" ? "กรอกโค้ดที่นี่..." : "Enter code..."
              }
              value={promoCodeInput}
              onChange={(e) => setPromoCodeInput(e.target.value)}
              disabled={isApplying || cartItems.length === 0}
              className="uppercase bg-background"
            />
            <Button
              type="submit"
              disabled={
                !promoCodeInput.trim() || isApplying || cartItems.length === 0
              }
            >
              {isApplying ? (
                <Loader2 className="animate-spin h-4 w-4" />
              ) : locale === "th" ? (
                "ใช้งาน"
              ) : (
                "Apply"
              )}
            </Button>
          </form>
        )}
      </div>

      <hr className="border-border" />

      <div className="space-y-3">
        <div className="flex justify-between text-muted-foreground">
          <span>{locale === "th" ? "ยอดรวมคอร์สเรียน" : "Subtotal"}</span>
          <span>{formatCurrency(subtotal, locale)}</span>
        </div>
        {discountAmount > 0 && (
          <div className="flex justify-between text-emerald-500 font-medium">
            <span>{locale === "th" ? "ส่วนลด" : "Discount"}</span>
            <span>- {formatCurrency(discountAmount, locale)}</span>
          </div>
        )}
        <div className="flex justify-between items-end pt-3 border-t border-border">
          <span className="font-bold text-foreground">
            {locale === "th" ? "ยอดสุทธิ" : "Total"}
          </span>
          <span className="text-3xl font-black text-primary">
            {formatCurrency(finalTotal, locale)}
          </span>
        </div>
      </div>

      <Button
        className="w-full h-12 text-base font-bold bg-primary text-primary-foreground hover:scale-[1.02] transition-transform"
        disabled={cartItems.length === 0}
        onClick={() =>
          onCheckout({ subtotal, discountAmount, finalTotal, appliedPromo })
        }
      >
        {locale === "th" ? "ดำเนินการชำระเงิน" : "Proceed to Checkout"}
      </Button>
    </div>
  );
}
