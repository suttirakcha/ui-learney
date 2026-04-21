"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import {
  CreditCard,
  QrCode,
  ShieldCheck,
  Loader2,
  ArrowLeft,
  Lock,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatCurrency, pickLocalized } from "@/lib/learney";
import { usePreference } from "@/components/learney/providers/PreferenceProvider";
import { useAuth } from "@/app/lib/AuthContext";

const API_URL = process.env.NEXT_PUBLIC_API!;
const FALLBACK_COURSE_IMAGE =
  "https://placehold.co/960x720/f7dfe5/4a3245?text=LEARNEY";

type CartItem = {
  id: string;
  course: {
    id: string;
    slug?: string | null;
    title: { th?: string; en?: string };
    coverImage?: string | null;
    thumbnail?: string | null;
    price: number;
    discountPrice?: number | null;
  };
};

export default function CheckoutPage() {
  const { locale } = usePreference();
  const { user } = useAuth();
  const router = useRouter();

  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<
    "CREDIT_CARD" | "PROMPTPAY"
  >("CREDIT_CARD");

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
          // หากตะกร้าว่างเปล่า ให้เด้งกลับหน้า Cart
          if (!data.items || data.items.length === 0) {
            router.push("/cart");
          }
        }
      } catch (error) {
        console.error("Failed to fetch cart", error);
        toast.error(
          locale === "th" ? "ดึงข้อมูลตะกร้าไม่สำเร็จ" : "Failed to load cart",
        );
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [user, router, locale]);

  // คำนวณยอดรวม (เพื่อแสดงผลเบื้องต้น Backend จะคำนวณซ้ำอีกครั้งเพื่อความปลอดภัย)
  const subtotal = useMemo(() => {
    return cartItems.reduce((sum, item) => {
      const price = item.course.discountPrice ?? item.course.price ?? 0;
      return sum + price;
    }, 0);
  }, [cartItems]);

  // ฟังก์ชันดำเนินการชำระเงิน
  const handleProcessPayment = async () => {
    setIsProcessing(true);

    try {
      // เรียก API Checkout ของ Backend ที่จะประมวลผลราคาและส่วนลด
      // (สมมติว่า backend มี endpoint /checkout/process)
      /* 
      const res = await fetch(`${API_URL}/checkout/process`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ paymentMethod }),
      });
      
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "การชำระเงินล้มเหลว");
      */

      // จำลองการโหลดชำระเงิน (รอผูกกับ Payment Gateway เช่น Stripe / Omise ของจริง)
      await new Promise((resolve) => setTimeout(resolve, 2000));

      toast.success(
        locale === "th"
          ? "ชำระเงินสำเร็จ! ขอบคุณที่ร่วมเรียนกับเรา"
          : "Payment successful!",
      );

      // เด้งไปหน้า Dashboard หรือ My Courses เพื่อเข้าเรียน
      router.push("/dashboard");
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : locale === "th"
            ? "เกิดข้อผิดพลาดในการชำระเงิน"
            : "Payment error";
      toast.error(
        errorMessage,
      );
    } finally {
      setIsProcessing(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center">
        <Loader2 className="animate-spin text-primary h-8 w-8" />
      </div>
    );
  }

  return (
    <main className="section-frame py-12 md:py-16">
      <Link
        href="/cart"
        className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {locale === "th" ? "กลับไปหน้าตะกร้าสินค้า" : "Back to Cart"}
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          {locale === "th" ? "ขั้นตอนการชำระเงิน" : "Checkout"}
        </h1>
        <p className="text-muted-foreground mt-2 flex items-center gap-2">
          <Lock className="w-4 h-4 text-emerald-500" />
          {locale === "th"
            ? "ข้อมูลของคุณถูกเข้ารหัสและปลอดภัย 100%"
            : "Your connection is encrypted and 100% safe."}
        </p>
      </div>

      <div className="grid lg:grid-cols-[1fr_400px] gap-8 items-start">
        {/* Left Column: Payment Details */}
        <div className="space-y-6">
          {/* 1. User Info Summary */}
          <div className="glass-panel rounded-2xl p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 border-b border-border pb-4">
              {locale === "th" ? "ข้อมูลผู้ซื้อ" : "Billing Information"}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">
                  {locale === "th" ? "ชื่อ-นามสกุล" : "Name"}
                </p>
                <p className="font-medium text-foreground">
                  {user?.fullname || "ผู้ใช้งานระบบ"}
                </p>
              </div>
              <div>
                <p className="text-muted-foreground">
                  {locale === "th" ? "อีเมล" : "Email"}
                </p>
                <p className="font-medium text-foreground">
                  {user?.email || "-"}
                </p>
              </div>
            </div>
          </div>

          {/* 2. Payment Method Selection */}
          <div className="glass-panel rounded-2xl p-6">
            <h2 className="text-xl font-bold text-foreground mb-4 border-b border-border pb-4">
              {locale === "th" ? "เลือกวิธีชำระเงิน" : "Payment Method"}
            </h2>
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Credit Card Option */}
              <button
                type="button"
                onClick={() => setPaymentMethod("CREDIT_CARD")}
                className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-3 transition-all ${
                  paymentMethod === "CREDIT_CARD"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border hover:border-primary/50 text-muted-foreground hover:bg-secondary/50"
                }`}
              >
                <CreditCard size={32} />
                <span className="font-semibold">
                  {locale === "th" ? "บัตรเครดิต/เดบิต" : "Credit / Debit Card"}
                </span>
              </button>

              {/* PromptPay Option */}
              <button
                type="button"
                onClick={() => setPaymentMethod("PROMPTPAY")}
                className={`p-4 rounded-xl border-2 flex flex-col items-center justify-center gap-3 transition-all ${
                  paymentMethod === "PROMPTPAY"
                    ? "border-primary bg-primary/5 text-primary"
                    : "border-border hover:border-primary/50 text-muted-foreground hover:bg-secondary/50"
                }`}
              >
                <QrCode size={32} />
                <span className="font-semibold">
                  {locale === "th"
                    ? "สแกนคิวอาร์โค้ด (PromptPay)"
                    : "QR PromptPay"}
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Right Column: Order Summary */}
        <div className="glass-panel rounded-2xl p-6 shadow-sm space-y-6 sticky top-24">
          <h2 className="text-xl font-bold text-foreground">
            {locale === "th" ? "สรุปคำสั่งซื้อ" : "Order Summary"}
          </h2>

          <div className="space-y-4 max-h-[300px] overflow-y-auto pr-2">
            {cartItems.map((item) => {
              const course = item.course;
              const finalPrice = course.discountPrice ?? course.price ?? 0;
              return (
                <div key={item.id} className="flex gap-4 items-start">
                  <div className="w-16 h-12 relative rounded-md overflow-hidden shrink-0">
                    <Image
                      src={course.coverImage || course.thumbnail || FALLBACK_COURSE_IMAGE}
                      alt="course"
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-semibold text-foreground line-clamp-2">
                      {pickLocalized(course.title, locale)}
                    </p>
                    <p className="text-sm text-primary font-bold mt-1">
                      {formatCurrency(finalPrice, locale)}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          <hr className="border-border" />

          <div className="space-y-3">
            <div className="flex justify-between items-end">
              <span className="font-bold text-foreground">
                {locale === "th" ? "ยอดที่ต้องชำระ" : "Total to Pay"}
              </span>
              <span className="text-3xl font-black text-primary">
                {formatCurrency(subtotal, locale)}
              </span>
            </div>
          </div>

          <Button
            className="w-full h-14 text-lg font-bold bg-primary text-primary-foreground hover:scale-[1.02] transition-transform"
            onClick={handleProcessPayment}
            disabled={isProcessing || cartItems.length === 0}
          >
            {isProcessing ? (
              <>
                <Loader2 className="animate-spin mr-2 h-5 w-5" />{" "}
                {locale === "th" ? "กำลังทำรายการ..." : "Processing..."}
              </>
            ) : (
              <>
                <ShieldCheck className="mr-2 h-5 w-5" />{" "}
                {locale === "th" ? "ยืนยันการชำระเงิน" : "Confirm Payment"}
              </>
            )}
          </Button>
          <p className="text-xs text-center text-muted-foreground mt-4">
            {locale === "th"
              ? "การชำระเงินของคุณได้รับการคุ้มครองด้วยมาตรฐานสากล"
              : "Your payment is secured with industry-standard encryption."}
          </p>
        </div>
      </div>
    </main>
  );
}
