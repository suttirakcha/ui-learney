import EmptyCart from "@/components/cart/EmptyCart";
import { Fragment } from "react/jsx-runtime";
import CartItemList from "@/components/cart/CartItemList";
import OrderSummary from "@/components/cart/OrderSummary";
import { getCurrentCart } from "@/lib/api/cart/cart.service";

export const dynamic = "force-dynamic";

export default async function CartPage() {
  const currentCart = await getCurrentCart();
  const { cart, courses } = currentCart;

  return (
    <Fragment>
      <div className="bg-primary px-8 py-16">
        <div className="max-w-7xl w-full mx-auto">
          <h2 className="text-5xl font-medium text-white">
            ตะกร้าสินค้า ({courses.length ?? 0})
          </h2>
        </div>
      </div>
      <div className="p-8">
        <div className="max-w-7xl w-full mx-auto">
          {courses.length ? (
            <main className="grid grid-cols-3 gap-6">
              <section className="col-span-2">
                <CartItemList courses={courses} />
              </section>
              <section>
                <OrderSummary cart={cart} />
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
