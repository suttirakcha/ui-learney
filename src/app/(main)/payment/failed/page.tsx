import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function PaymentFailedPage() {
  return (
    <main className="section-frame py-16">
      <div className="glass-panel mx-auto max-w-2xl rounded-3xl p-8 text-center">
        <p className="text-sm font-medium text-destructive">Payment Failed</p>
        <h1 className="mt-3 text-3xl font-semibold text-foreground">
          ไม่สามารถชำระเงินได้
        </h1>
        <p className="mt-4 text-muted-foreground">
          ระบบยังไม่ได้ตัดสิทธิ์หรือสร้างรายการซื้อให้ กรุณาลองใหม่อีกครั้ง หรือตรวจสอบข้อมูลการชำระเงินก่อนทำรายการต่อ
        </p>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild className="bg-primary text-primary-foreground">
            <Link href="/cart?payment=open">ลองชำระเงินอีกครั้ง</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/cart">กลับไปที่ตะกร้า</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
