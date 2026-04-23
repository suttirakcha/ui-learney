import Link from "next/link";
import { Button } from "@/components/ui/button";

interface PaymentSuccessPageProps {
  searchParams: Promise<{
    paymentId?: string;
    enrolled?: string;
  }>;
}

export default async function PaymentSuccessPage({
  searchParams,
}: PaymentSuccessPageProps) {
  const { paymentId, enrolled } = await searchParams;
  const enrolledCount = Number(enrolled ?? 0);

  return (
    <main className="section-frame py-16">
      <div className="glass-panel mx-auto max-w-2xl rounded-3xl p-8 text-center">
        <p className="text-sm font-medium text-primary">Payment Success</p>
        <h1 className="mt-3 text-3xl font-semibold text-foreground">
          ชำระเงินสำเร็จแล้ว
        </h1>
        <p className="mt-4 text-muted-foreground">
          ระบบปลดล็อกสิทธิ์เข้าเรียนให้เรียบร้อยแล้ว คุณสามารถดูคอร์สที่ซื้อได้จากแดชบอร์ดหรือประวัติคอร์สเรียนทันที
        </p>

        <div className="mt-6 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-left text-sm text-emerald-800">
          <p>ปลดล็อกคอร์สเพิ่ม: {Number.isFinite(enrolledCount) ? enrolledCount : 0} รายการ</p>
          {paymentId ? <p className="mt-1">Payment ID: {paymentId}</p> : null}
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          <Button asChild className="bg-primary text-primary-foreground">
            <Link href="/dashboard">ไปที่แดชบอร์ดผู้เรียน</Link>
          </Button>
          <Button asChild variant="outline">
            <Link href="/profile/history">ดูประวัติคอร์สเรียน</Link>
          </Button>
        </div>
      </div>
    </main>
  );
}
