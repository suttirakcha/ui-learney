"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import PaymentDialog from "@/components/cart/payment/PaymentDialog";
import { formatPaymentCurrency } from "@/lib/payment/mock-payment";
import { Cart } from "@/types/cart/cart";
import { Course } from "@/types/course";

interface OrderSummaryProps {
  cart: Cart;
  courses: Course[];
}

export default function OrderSummary({ cart, courses }: OrderSummaryProps) {
  const { subtotal, total, discount } = cart;

  return (
    <div className="space-y-6 rounded-xl border p-6">
      <h2 className="text-2xl font-bold">สรุปรายการ</h2>
      <div className="flex flex-col gap-4">
        <div className="space-y-1">
          <h3 className="font-semibold">รหัสคูปอง</h3>
          <form className="flex gap-2">
            <Input type="text" placeholder="ใส่รหัสคูปอง" />
            <Button type="button" variant="outline">
              ใช้
            </Button>
          </form>
        </div>
        <div className="flex items-center justify-between">
          <span>ราคารวม:</span>
          <p className="font-medium">{formatPaymentCurrency(subtotal)}</p>
        </div>
        <div className="flex items-center justify-between">
          <span>ส่วนลด:</span>
          <p className="font-medium">-{formatPaymentCurrency(discount)}</p>
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
