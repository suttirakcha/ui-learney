import { fetchWithAuth } from "../fetchWithAuth";

export const getCurrentCart = async () => {
  const res = await fetchWithAuth("/cart");

  if (!res.ok) {
    throw new Error("Failed to fetch cart");
  }

  return res.json();
};

export const addItemToCart = async (courseId: string) => {
  const res = await fetchWithAuth("/cart", {
    method: "POST",
    body: JSON.stringify({ courseId }),
  });
  return res.json();
};

export const deleteItemFromCart = async (courseId: string) => {
  const res = await fetchWithAuth("/cart", {
    method: "DELETE",
    body: JSON.stringify({ courseId }),
  });
  return res.json();
};
