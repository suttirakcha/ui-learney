import { MockPaymentSessionStatus } from "@/types/payment/mock-payment";

const paymentCurrencyFormatter = new Intl.NumberFormat("th-TH", {
  style: "currency",
  currency: "THB",
  minimumFractionDigits: 0,
  maximumFractionDigits: 2,
});

export const toPaymentNumber = (value?: number | string | null): number => {
  const parsedValue =
    typeof value === "number" ? value : Number(value ?? 0);

  return Number.isFinite(parsedValue) ? parsedValue : 0;
};

export const formatPaymentCurrency = (value?: number | string | null) => {
  return paymentCurrencyFormatter.format(toPaymentNumber(value));
};

export const getSessionStatusMessage = (
  status: MockPaymentSessionStatus,
): string => {
  switch (status) {
    case "SUCCESS":
      return "บันทึกการชำระเงินจำลองเรียบร้อยแล้ว";
    case "PENDING":
      return "สแกน QR จำลองแล้วกดยืนยันเพื่อบันทึกข้อมูลเข้าระบบ";
    default:
      return "สร้าง QR จำลองก่อน จากนั้นค่อยกดยืนยันการชำระเงิน";
  }
};
