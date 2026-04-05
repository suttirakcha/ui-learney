"use client";

import { MockPaymentSessionResponse } from "@/types/payment/mock-payment";
import { LoaderCircle, QrCode } from "lucide-react";
import { QRCodeSVG } from "qrcode.react";

interface MockQrPanelProps {
  session: MockPaymentSessionResponse | null;
  isLoading: boolean;
}

export default function MockQrPanel({
  session,
  isLoading,
}: MockQrPanelProps) {
  if (isLoading) {
    return (
      <div className="flex min-h-[255px] flex-col items-center justify-center rounded-[22px] bg-[#f7f8fa] px-6 py-8 text-center">
        <LoaderCircle className="text-primary mb-4 h-10 w-10 animate-spin" />
        <p className="font-semibold text-gray-900">กำลังสร้าง QR จำลอง</p>
        <p className="mt-1 text-sm text-gray-500">
          กรุณารอสักครู่เพื่อเตรียมข้อมูลการชำระเงิน
        </p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex min-h-[255px] flex-col items-center justify-center rounded-[22px] bg-[#f7f8fa] px-6 py-8 text-center">
        <div className="mb-4 rounded-[22px] border border-dashed border-gray-200 bg-white p-5 text-[#c2c8d1]">
          <QrCode className="h-24 w-24" strokeWidth={1.35} />
        </div>
        <p className="font-semibold text-gray-900">ยังไม่มี QR สำหรับชำระเงิน</p>
        <p className="mt-1 max-w-xs text-sm text-gray-500">
          กดปุ่มสร้าง QR จำลองก่อน แล้วระบบจะแสดงโค้ดสำหรับเดโมให้ตรงนี้
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-[22px] bg-[#f7f8fa] px-6 py-7 text-center">
      <div className="mx-auto inline-flex rounded-[18px] border border-[#d9dee7] bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
        <QRCodeSVG
          value={session.qrCodeValue}
          size={170}
          bgColor="#ffffff"
          fgColor="#98a1af"
          includeMargin={true}
        />
      </div>
      <p className="mt-4 font-semibold text-gray-700">
        สแกน QR Code เพื่อชำระเงิน
      </p>
      <p className="mt-1 text-sm text-gray-500">
        Reference: {session.referenceCode}
      </p>
    </div>
  );
}
