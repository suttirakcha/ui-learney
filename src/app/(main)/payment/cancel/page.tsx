import { redirect } from "next/navigation";

export default function PaymentCancelPage() {
  redirect("/cart?payment=open");
}
