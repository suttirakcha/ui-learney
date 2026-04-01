"use client";

import EmptyCart from "@/components/cart/EmptyCart";
import { Fragment } from "react/jsx-runtime";
import CartItemList from "@/components/cart/CartItemList";
import OrderSummary from "@/components/cart/OrderSummary";
import { useRouter } from "next/navigation";

/* TODO: Fetch the dynamic cart item */
const carts = [
  {
    id: "1",
    courseName: "Web Development for Beginners",
    instructor: "Dr. Jennie Sans",
    price: 2000,
  },
  {
    id: "2",
    courseName: "วิธีใช้ AI อย่างมีคุณภาพ",
    instructor: "เขต ดุ๋น",
    price: 150,
  },
  {
    id: "3",
    courseName: "English for Beginners",
    instructor: "Mrmark",
    price: 2999,
  },
];

export default function CartPage() {
  const router = useRouter();

  const handleCreateCheckout = () => {
    router.push("/checkout");
  };

  return (
    <Fragment>
      <div className="bg-primary px-8 py-16">
        <div className="max-w-7xl w-full mx-auto">
          <h2 className="text-5xl font-medium text-white">
            ตะกร้าสินค้า ({carts.length ?? 0})
          </h2>
        </div>
      </div>
      <div className="p-8">
        <div className="max-w-7xl w-full mx-auto">
          {carts.length ? (
            <main className="grid grid-cols-3 gap-6">
              <section className="col-span-2">
                <CartItemList courses={carts} />
              </section>
              <section>
                <OrderSummary onSubmit={handleCreateCheckout} />
              </section>
            </main>
          ) : (
            <EmptyCart />
          )}
        </div>
      </div>
    </Fragment>
  );
}
