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
    <div className="space-y-3 border-b border-gray-100 pb-6">
      <div className="space-y-1">
        <h2 className="text-[2rem] leading-none font-semibold text-gray-900">
          ชำระเงิน
        </h2>
        <p className="text-[15px] text-gray-500">
          เลือกวิธีการชำระเงินที่คุณต้องการสำหรับ {courseCount} รายการ
        </p>
      </div>
      <div className="space-y-1">
        <p className="text-base font-semibold text-gray-700">ยอดที่ต้องชำระ:</p>
        <p className="text-primary text-[2.6rem] leading-none font-semibold">
          {formatPaymentCurrency(amount)}
        </p>
      </div>
    </div>
  );
}
