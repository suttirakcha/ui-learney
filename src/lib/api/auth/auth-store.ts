import Cookies from "js-cookie";

const ACCESS_TOKEN_KEY = "accessToken";

export const setAccessToken = (token: string) => {
  if (typeof window !== "undefined") {
    Cookies.set(ACCESS_TOKEN_KEY, token, {
      expires: 10000,
      secure: true,
      sameSite: "strict",
    });
  }
};

export const getAccessToken = async () => {
  if (typeof window !== "undefined") {
    return Cookies.get(ACCESS_TOKEN_KEY);
  }

  try {
    const { cookies } = await import("next/headers");
    const cookieStore = await cookies();
    return cookieStore.get(ACCESS_TOKEN_KEY)?.value || null;
  } catch (error) {
    console.error(error);
    return null;
  }
};

export const clearAccessToken = () => {
  if (typeof window !== "undefined") {
    return Cookies.remove(ACCESS_TOKEN_KEY);
  }
};
