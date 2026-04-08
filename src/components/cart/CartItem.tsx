import { useCart } from "@/app/lib/CartContext";
import { Course } from "@/types/course";
import { Trash2 } from "lucide-react";
import LnButton from "../custom/LnButton";
import toast from "react-hot-toast";
import { deleteItemFromCart } from "@/lib/api/cart/cart.service";
import { revalidateCart } from "@/lib/revalidate";
import Image from "next/image";

interface CartItemProps {
  course: Course;
}

export default function CartItem({ course }: CartItemProps) {
  const { courseName, price, instructor, thumbnail } = course;
  const { refetchCart } = useCart();

  const priceAmount =
    typeof price === "number" ? price?.toLocaleString() : price;

  const handleRemoveCourseFromCart = async (courseId: string) => {
    try {
      const res = await deleteItemFromCart(courseId);
      toast.success(res.message);
      revalidateCart();
      await refetchCart();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="border rounded-xl p-6">
      <div className="flex justify-between">
        <div className="flex gap-4">
          {/* Image */}
          <div className="rounded-md overflow-hidden">
            {thumbnail ? (
              <Image
                src={thumbnail}
                alt={courseName ?? "course-image"}
                width={120}
                height={80}
              />
            ) : (
              <div className="bg-gray-300 w-30 h-20"></div>
            )}
          </div>

          {/* Course detail */}
          <div className="space-y-2">
            <div className="space-y-1">
              <h1 className="text-2xl font-bold">{courseName}</h1>
              <p className="text-muted-foreground">โดย {instructor}</p>
            </div>
            <h2 className="text-primary font-bold text-xl">฿{priceAmount}</h2>
          </div>
        </div>

        {/* Delete item from cart */}
        <LnButton
          variant="ghost"
          className="flex items-center gap-2 text-destructive"
          onClick={() => handleRemoveCourseFromCart(course.id)}
        >
          <Trash2 />
          ลบ
        </LnButton>
      </div>
    </div>
  );
}
