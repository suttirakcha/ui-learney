import { fetchWithAuth } from "@/lib/api/fetchWithAuth";
import {
  MockPaymentConfirmResponse,
  MockPaymentDetailResponse,
  MockPaymentSessionResponse,
} from "@/types/payment/mock-payment";

type ApiErrorPayload = {
  message?: string | string[];
};

function normalizePaymentErrorMessage(message: string): string {
  if (
    /Session expired|No token provided|No refresh token|Unauthorized/i.test(
      message,
    )
  ) {
    return "กรุณาเข้าสู่ระบบใหม่ก่อนชำระเงิน";
  }

  if (/Cannot (GET|POST) \/payments\/mock\//.test(message)) {
    return "Payment API ยังไม่พร้อม กรุณารีสตาร์ท api-learney แล้วลองใหม่อีกครั้ง";
  }

  return message;
}

async function handlePaymentResponse<T>(response: Response): Promise<T> {
  const rawText = await response.text();
  let payload: ApiErrorPayload | T | null = null;

  if (rawText) {
    try {
      payload = JSON.parse(rawText) as ApiErrorPayload | T;
    } catch {
      payload = { message: rawText } satisfies ApiErrorPayload;
    }
  }

  if (!response.ok) {
    const message =
      payload &&
      typeof payload === "object" &&
      "message" in payload &&
      payload.message
        ? Array.isArray(payload.message)
          ? payload.message.join(", ")
          : payload.message
        : "Payment request failed";

    throw new Error(normalizePaymentErrorMessage(message));
  }

  return payload as T;
}

export async function createMockPaymentSession(): Promise<MockPaymentSessionResponse> {
  const response = await fetchWithAuth("/payments/mock/session", {
    method: "POST",
  });

  return handlePaymentResponse<MockPaymentSessionResponse>(response);
}

export async function getMockPayment(
  paymentId: string,
): Promise<MockPaymentDetailResponse> {
  const response = await fetchWithAuth(`/payments/mock/${paymentId}`);

  return handlePaymentResponse<MockPaymentDetailResponse>(response);
}

export async function confirmMockPayment(
  paymentId: string,
): Promise<MockPaymentConfirmResponse> {
  const response = await fetchWithAuth(`/payments/mock/${paymentId}/confirm`, {
    method: "POST",
  });

  return handlePaymentResponse<MockPaymentConfirmResponse>(response);
}
