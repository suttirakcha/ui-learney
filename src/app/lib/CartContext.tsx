"use client";

import { getCurrentCart } from "@/lib/api/cart/cart.service";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useAuth } from "./AuthContext";

type CartContextType = {
  cartCount: number;
  refetchCart: () => Promise<void>;
};

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [cartCount, setCartCount] = useState(0);

  const refetchCart = useCallback(async () => {
    try {
      const cart = await getCurrentCart();
      setCartCount(cart.courses?.length ?? 0);
    } catch {
      setCartCount(0);
    }
  }, []);

  useEffect(() => {
    if (user) {
      void refetchCart();
    } else {
      setCartCount(0);
    }
  }, [user, refetchCart]);

  return (
    <CartContext.Provider value={{ cartCount, refetchCart }}>
      {children}
    </CartContext.Provider>
  );
}

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }

  return context;
};
