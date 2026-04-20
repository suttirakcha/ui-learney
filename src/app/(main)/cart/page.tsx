"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { Trash2, ShoppingCart, ArrowRight, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency, pickLocalized } from "@/lib/learney";
import { usePreference } from "@/components/learney/providers/PreferenceProvider";
import CartSummary from "@/components/cart/CartSummary";
import { useAuth } from "@/app/lib/AuthContext";

const API_URL = process.env.NEXT_PUBLIC_API!;

export default function CartPage() {
  const { locale } = usePreference();
  const { user } = useAuth();
  const router = useRouter();

  const [cartItems, setCartItems] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [removingId, setRemovingId] = useState<string | null>(null);

  // ดึงข้อมูลตะกร้าสินค้า
  useEffect(() => {
    if (!user) {
      router.push("/login");
      return;
    }

    const fetchCart = async () => {
      try {
        const res = await fetch(`${API_URL}/cart`, {
          headers: { "Content-Type": "application/json" },
        });
        if (res.ok) {
          const data = await res.json();
          setCartItems(data.items || []);
        }
      } catch (error) {
        console.error("Failed to fetch cart", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user, router]);

  // ฟังก์ชันลบสินค้าออกจากตะกร้า
  const handleRemoveItem = async (itemId: string) => {
    setRemovingId(itemId);
    try {
      const res = await fetch(`${API_URL}/cart/items/${itemId}`, {
        method: "DELETE",
      });
      if (res.ok) {
        setCartItems((prev) => prev.filter((item) => item.id !== itemId));
        toast.success(
          locale === "th" ? "ลบคอร์สออกจากตะกร้าแล้ว" : "Removed from cart",
        );
      }
    } catch (error) {
      toast.error(
        locale === "th" ? "ลบสินค้าไม่สำเร็จ" : "Failed to remove item",
      );
    } finally {
      setRemovingId(null);
    }
  };

  const handleCheckout = (finalData: any) => {
    // ส่งข้อมูลไปหน้า Checkout พร้อมกับยอดที่สรุปแล้ว
    console.log("Proceeding to checkout with:", finalData);
    router.push("/checkout");
  };

  // คำนวณยอดรวมพื้นฐาน (Subtotal) แบบ Real-time
  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const price = item.course.discountPrice ?? item.course.price ?? 0;
      return sum + price;
    }, 0);
  }, [cartItems]);

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary h-8 w-8" />
      </div>
    );
  }

  return (
    <main className="section-frame py-12 md:py-16">
      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          {locale === "th" ? "ตะกร้าสินค้าของคุณ" : "Shopping Cart"}
        </h1>
        <p className="text-muted-foreground mt-2">
          {cartItems.length}{" "}
          {locale === "th" ? "รายการในตะกร้า" : "Courses in cart"}
        </p>
      </div>

      {cartItems.length === 0 ? (
        // Empty State
        <div className="glass-panel rounded-2xl p-12 flex flex-col items-center justify-center text-center space-y-4">
          <div className="w-20 h-20 bg-secondary rounded-full flex items-center justify-center text-secondary-foreground mb-4">
            <ShoppingCart size={32} />
          </div>
          <h2 className="text-2xl font-semibold text-foreground">
            {locale === "th"
              ? "ตะกร้าของคุณยังว่างเปล่า"
              : "Your cart is empty"}
          </h2>
          <p className="text-muted-foreground max-w-md">
            {locale === "th"
              ? "ค้นหาคอร์สเรียนที่ใช่และอัปสกิลของคุณได้เลยตั้งแต่วันนี้"
              : "Find the right course and start upgrading your skills today."}
          </p>
          <Link href="/courses" className="mt-6">
            <Button size="lg" className="bg-primary text-primary-foreground">
              {locale === "th" ? "เลือกดูคอร์สเรียน" : "Browse Courses"}
            </Button>
          </Link>
        </div>
      ) : (
        // Cart Content (2 Columns Grid)
        <div className="grid lg:grid-cols-[1fr_380px] gap-8 items-start">
          {/* Left Column: Cart Items List */}
          <div className="space-y-4">
            {cartItems.map((item) => {
              const course = item.course;
              const isRemoving = removingId === item.id;
              const finalPrice = course.discountPrice ?? course.price;

              return (
                <div
                  key={item.id}
                  className={`glass-panel rounded-2xl p-4 flex flex-col sm:flex-row gap-5 items-start sm:items-center transition-opacity ${isRemoving ? "opacity-50 pointer-events-none" : ""}`}
                >
                  {/* Course Image */}
                  <Link
                    href={`/courses/${course.slug || course.id}`}
                    className="shrink-0 w-full sm:w-40 h-28 relative rounded-xl overflow-hidden group"
                  >
                    <Image
                      src={course.coverImage || course.thumbnail}
                      alt={pickLocalized(course.title, locale)}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </Link>

                  {/* Course Details */}
                  <div className="flex-1 min-w-0">
                    <Link href={`/courses/${course.slug || course.id}`}>
                      <h3 className="font-bold text-lg text-foreground hover:text-primary transition-colors line-clamp-2">
                        {pickLocalized(course.title, locale)}
                      </h3>
                    </Link>
                    <p className="text-sm text-muted-foreground mt-1">
                      {locale === "th" ? "ผู้สอน:" : "By:"}{" "}
                      {course.instructor?.fullname || course.instructor?.name}
                    </p>
                  </div>

                  {/* Price & Actions */}
                  <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto gap-4">
                    <div className="text-right">
                      <p className="text-xl font-bold text-foreground">
                        {formatCurrency(finalPrice, locale)}
                      </p>
                      {course.discountPrice && (
                        <p className="text-sm text-muted-foreground line-through">
                          {formatCurrency(course.price, locale)}
                        </p>
                      )}
                    </div>
                    <button
                      onClick={() => handleRemoveItem(item.id)}
                      disabled={isRemoving}
                      className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 p-2 rounded-lg transition-colors flex items-center justify-center"
                    >
                      {isRemoving ? (
                        <Loader2 className="w-5 h-5 animate-spin" />
                      ) : (
                        <Trash2 className="w-5 h-5" />
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Cart Summary Component */}
          <CartSummary
            initialSubtotal={subtotal}
            cartItems={cartItems}
            onCheckout={handleCheckout}
          />
        </div>
      )}
    </main>
  );
}
