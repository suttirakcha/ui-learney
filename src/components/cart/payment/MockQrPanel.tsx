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
      <div className="bg-muted/40 flex min-h-[255px] flex-col items-center justify-center rounded-[22px] px-6 py-8 text-center">
        <LoaderCircle className="text-primary mb-4 h-10 w-10 animate-spin" />
        <p className="font-semibold text-foreground">กำลังสร้าง QR จำลอง</p>
        <p className="text-muted-foreground mt-1 text-sm">
          กรุณารอสักครู่เพื่อเตรียมข้อมูลการชำระเงิน
        </p>
      </div>
    );
  }

  if (!session) {
    return (
      <div className="bg-muted/40 flex min-h-[255px] flex-col items-center justify-center rounded-[22px] px-6 py-8 text-center">
        <div className="text-muted-foreground mb-4 rounded-[22px] border border-dashed border-border bg-background p-5">
          <QrCode className="h-24 w-24" strokeWidth={1.35} />
        </div>
        <p className="font-semibold text-foreground">ยังไม่มี QR สำหรับชำระเงิน</p>
        <p className="text-muted-foreground mt-1 max-w-xs text-sm">
          กดปุ่มสร้าง QR จำลองก่อน แล้วระบบจะแสดงโค้ดสำหรับเดโมให้ตรงนี้
        </p>
      </div>
    );
  }

  return (
    <div className="bg-muted/40 rounded-[22px] px-6 py-7 text-center">
      <div className="mx-auto inline-flex rounded-[18px] border border-border bg-background p-4 shadow-[0_8px_24px_rgba(15,23,42,0.04)]">
        <QRCodeSVG
          value={session.qrCodeValue}
          size={170}
          bgColor="#ffffff"
          fgColor="#98a1af"
          includeMargin={true}
        />
      </div>
      <p className="mt-4 font-semibold text-foreground">
        สแกน QR Code เพื่อชำระเงิน
      </p>
      <p className="text-muted-foreground mt-1 text-sm">
        Reference: {session.referenceCode}
      </p>
    </div>
  );
}
