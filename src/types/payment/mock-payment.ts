export type MockPaymentSessionStatus = "EMPTY" | "PENDING" | "SUCCESS";

export type MockPaymentSession = {
  referenceCode: string;
  qrCodeValue: string;
  amount: number;
  courseIds: string[];
  createdAt: string;
  status: Exclude<MockPaymentSessionStatus, "EMPTY">;
};

export type MockPaymentSessionResponse = {
  paymentId: string;
  amount: number;
  status: "PENDING";
  referenceCode: string;
  qrCodeValue: string;
  createdAt: string;
  courseCount: number;
};

export type MockPaymentDetailResponse = {
  paymentId: string;
  paymentStatus: "PENDING" | "SUCCESS" | "FAILED";
  sessionStatus: MockPaymentSessionStatus;
  totalPaid: number;
  latestSession: MockPaymentSession | null;
  transactionCount: number;
};

export type MockPaymentConfirmResponse = {
  paymentId: string;
  status: "SUCCESS";
  amount: number;
  referenceCode: string;
  confirmedAt: string;
  enrolledCourseCount: number;
};
