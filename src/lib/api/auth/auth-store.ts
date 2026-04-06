import Cookies from "js-cookie";

const ACCESS_TOKEN_KEY = "accessToken";

export const setAccessToken = (token: string | null | undefined) => {
  if (typeof window !== "undefined") {
    if (!token) {
      Cookies.remove(ACCESS_TOKEN_KEY);
      return;
    }

    Cookies.set(ACCESS_TOKEN_KEY, token, {
      expires: 10000,
      secure: window.location.protocol === "https:",
      sameSite: "lax",
    });
  }
};

export const getAccessToken = async () => {
  if (typeof window !== "undefined") {
    return Cookies.get(ACCESS_TOKEN_KEY) ?? null;
  }

  const { cookies } = await import("next/headers");
  const cookieStore = await cookies();
  return cookieStore.get(ACCESS_TOKEN_KEY)?.value ?? null;
};

export const clearAccessToken = () => {
  if (typeof window !== "undefined") {
    return Cookies.remove(ACCESS_TOKEN_KEY);
  }
};
