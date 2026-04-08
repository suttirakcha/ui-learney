"use client";

import { useCart } from "@/app/lib/CartContext";
import { ShoppingCart } from "lucide-react";
import Link from "next/link";

export default function CartLink() {
  const { cartCount } = useCart();

  return (
    <Link href="/cart" className="relative">
      <span
        className="absolute -top-2 -right-2 w-4 h-4 bg-primary rounded-full items-center justify-center text-xs text-muted"
        style={{ display: cartCount > 0 ? "flex" : "none" }}
      >
        {cartCount}
      </span>
      <ShoppingCart className="w-5 h-5" />
    </Link>
  );
}
