import { fetchWithAuth } from "../fetchWithAuth";
import type { CurrentCartResponse } from "@/types/cart/cart";

type ApiErrorPayload = {
  code?: string;
  message?: string | string[];
};

type MutationMessage = {
  message: string;
};

const emptyCartResponse: CurrentCartResponse = {
  cart: {
    id: "",
    subtotal: 0,
    total: 0,
    discount: 0,
    appliedPromotionId: null,
    appliedPromotionCode: null,
  },
  courses: [],
};

function normalizeMessage(message: string) {
  if (/Cart not found/i.test(message)) {
    return "ยังไม่มีรายการในตะกร้า";
  }

  return message;
}

async function handleCartResponse<T>(
  response: Response,
  options?: {
    allowEmptyCart?: boolean;
  },
): Promise<T> {
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
    const code =
      payload &&
      typeof payload === "object" &&
      "code" in payload &&
      payload.code
        ? payload.code
        : undefined;
    const message =
      payload &&
      typeof payload === "object" &&
      "message" in payload &&
      payload.message
        ? Array.isArray(payload.message)
          ? payload.message.join(", ")
          : payload.message
        : "เกิดข้อผิดพลาดในการเชื่อมต่อระบบตะกร้า";

    if (options?.allowEmptyCart && code === "CART_NOT_FOUND") {
      return emptyCartResponse as T;
    }

    throw new Error(normalizeMessage(message));
  }

  return payload as T;
}

export const getCurrentCart = async () => {
  const res = await fetchWithAuth("/cart");
  return handleCartResponse<CurrentCartResponse>(res, {
    allowEmptyCart: true,
  });
};

export const addItemToCart = async (courseId: string) => {
  const res = await fetchWithAuth("/cart", {
    method: "POST",
    body: JSON.stringify({ courseId }),
  });

  return handleCartResponse<MutationMessage>(res);
};

export const deleteItemFromCart = async (courseId: string) => {
  const res = await fetchWithAuth("/cart", {
    method: "DELETE",
    body: JSON.stringify({ courseId }),
  });

  return handleCartResponse<MutationMessage>(res);
};

export const applyPromotionCode = async (code: string) => {
  const res = await fetchWithAuth("/cart/promotion", {
    method: "POST",
    body: JSON.stringify({ code }),
  });

  return handleCartResponse<{
    message: string;
    cart: CurrentCartResponse["cart"];
  }>(res);
};

export const removePromotionCode = async () => {
  const res = await fetchWithAuth("/cart/promotion", {
    method: "DELETE",
  });

  return handleCartResponse<{
    message: string;
    cart: CurrentCartResponse["cart"];
  }>(res);
};
