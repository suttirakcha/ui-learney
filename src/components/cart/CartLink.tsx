"use client";

import { getCurrentCart } from "@/lib/api/cart/cart.service";
import { Cart } from "@/types/cart/cart";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartLink() {
  const [carts, setCarts] = useState<Cart[] | null>(null);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const currentCart = await getCurrentCart();
        setCarts(currentCart.courses);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCart();

    window.addEventListener("cart-updated", fetchCart);
    return () => window.removeEventListener("cart-updated", fetchCart);
  }, []);

  return (
    <Link href="/cart" className="relative">
      <span
        className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full items-center justify-center text-xs text-muted"
        style={{ display: carts?.length ? "flex" : "none" }}
      >
        {carts?.length ?? 0}
      </span>
      <ShoppingCart className="w-5 h-5" />
    </Link>
  );
}
