"use client";

import { getCurrentCart } from "@/lib/api/cart/cart.service";
import { Cart } from "@/types/cart/cart";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function CartLink() {
  const [carts, setCarts] = useState<Cart[]>([]);

  useEffect(() => {
    const run = async () => {
      try {
        const currentCart = await getCurrentCart();
        setCarts(currentCart.courses);
      } catch (error) {
        console.error(error);
      }
    };
    run();
  }, []);

  return (
    <Link href="/cart" className="relative">
      <p className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full flex items-center justify-center text-xs text-muted">
        {carts.length ?? 0}
      </p>
      <ShoppingCart className="w-5 h-5" />
    </Link>
  );
}
