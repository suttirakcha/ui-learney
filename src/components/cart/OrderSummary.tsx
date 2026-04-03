"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import LnButton from "../custom/LnButton";
import { Cart } from "@/types/cart/cart";

interface OrderSummaryProps {
  cart: Cart;
}

export default function OrderSummary({ cart }: OrderSummaryProps) {
  const { subtotal, total, discount } = cart;
  return (
    <div className="border rounded-xl p-6 space-y-6">
      <h2 className="font-bold text-2xl">สรุปรายการ</h2>
      <div className="flex flex-col gap-4">
        <div className="space-y-1">
          <h2 className="font-semibold">รหัสคูปอง</h2>
          <form className="flex gap-2">
            <Input type="text" placeholder="ใส่รหัสคูปอง" />
            <Button variant="outline">ใช้</Button>
          </form>
        </div>
        <div className="flex items-center justify-between">
          <h1>ราคารวม:</h1>
          <p className="font-medium">{subtotal}</p>
        </div>
        <div className="flex items-center justify-between">
          <h1>ส่วนลด:</h1>
          <p className="font-medium">-{discount}</p>
        </div>
        <div className="flex items-center justify-between">
          <h1 className="font-bold text-xl">ยอดรวมทั้งหมด:</h1>
          <p className="text-primary font-bold text-xl">{total}</p>
        </div>
        <LnButton onClick={() => {}}>ไปที่หน้าชำระเงิน</LnButton>
        <p className="text-muted-foreground text-xs text-center">
          รับประกันคืนเงิน 30 วัน
        </p>
      </div>
    </div>
  );
}
