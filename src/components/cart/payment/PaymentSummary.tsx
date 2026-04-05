import { formatPaymentCurrency } from "@/lib/payment/mock-payment";

interface PaymentSummaryProps {
  amount: number | string;
  courseCount: number;
}

export default function PaymentSummary({
  amount,
  courseCount,
}: PaymentSummaryProps) {
  return (
    <div className="space-y-3 border-b border-border pb-6">
      <div className="space-y-1">
        <h2 className="text-[2rem] font-semibold leading-none text-foreground">
          ชำระเงิน
        </h2>
        <p className="text-muted-foreground text-[15px]">
          เลือกวิธีการชำระเงินที่คุณต้องการสำหรับ {courseCount} รายการ
        </p>
      </div>
      <div className="space-y-1">
        <p className="text-base font-semibold text-foreground">ยอดที่ต้องชำระ:</p>
        <p className="text-primary text-[2.6rem] font-semibold leading-none">
          {formatPaymentCurrency(amount)}
        </p>
      </div>
    </div>
  );
}
