import { Course } from "@/types/course";
import CartItem from "./CartItem";

interface CartItemListProps {
  courses: Course[];
}

export default function CartItemList({ courses }: CartItemListProps) {
  return (
    <div className="flex flex-col gap-4">
      {courses.map((course) => (
        <CartItem key={course.id} course={course} />
      ))}
    </div>
  );
}
