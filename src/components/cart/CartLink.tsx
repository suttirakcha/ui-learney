"use client";

import { getCurrentCart } from "@/lib/api/cart/cart.service";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartLink() {
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    const run = async () => {
      try {
        const currentCart = await getCurrentCart();
        setCartCount(currentCart.courses.length);
      } catch (error) {
        console.error(error);
      }
    };
    run();
  }, []);

  return (
    <Link href="/cart" className="relative">
      <span
        className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full items-center justify-center text-xs text-muted"
        style={{ display: cartCount ? "flex" : "none" }}
      >
        {cartCount}
      </span>
      <ShoppingCart className="w-5 h-5" />
    </Link>
  );
}
