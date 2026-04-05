import { CircleDot, QrCode } from "lucide-react";

export default function PromptPayOption() {
  return (
    <div className="space-y-3">
      <p className="text-base font-semibold text-gray-800">เลือกวิธีการชำระเงิน</p>
      <div className="rounded-[18px] border border-gray-200 bg-white px-4 py-4 shadow-[0_1px_0_rgba(15,23,42,0.02)]">
        <div className="flex items-center gap-3">
          <CircleDot className="text-primary h-4 w-4 fill-current" />
          <div className="rounded-xl border border-gray-100 bg-gray-50 p-2 text-gray-700">
            <QrCode className="h-5 w-5" />
          </div>
          <div>
            <p className="text-[17px] font-semibold text-gray-900">
              QR Code (PromptPay)
            </p>
            <p className="text-sm text-gray-500">
              ชำระเงินแบบจำลองเพื่อบันทึกข้อมูลเข้า dashboard
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
