import Image from "next/image";
import Link from "next/link";
import { Star, Clock, Zap } from "lucide-react";
import { Course } from "@/types/course";
import { addItemToCart } from "@/lib/api/cart/cart.service";
import { MouseEvent } from "react";
import toast from "react-hot-toast";

interface CourseCardProps {
  course: Course;
}

const CourseCard = ({ course }: CourseCardProps) => {
  const {
    id,
    price,
    category,
    courseName,
    instructor,
    thumbnail,
    rating,
    students,
    level,
    duration,
  } = course;

  const originalPrice = price ? `฿${(price * 1.4).toFixed(0)}` : 0;

  const handleAddToCart = async (
    e: MouseEvent<HTMLButtonElement>,
    courseId: string,
  ) => {
    e.preventDefault();
    try {
      const res = await addItemToCart(courseId);
      toast.success(res.message);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Link
        href={`/course/${id}`}
        className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group flex flex-col h-full"
      >
        <div className="relative h-48 bg-gray-300 overflow-hidden shrink-0">
          {thumbnail ? (
            <Image
              src={thumbnail}
              alt={courseName ?? "course-image"}
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover group-hover:scale-110 transition-transform duration-500"
            />
          ) : (
            <div className="h-full w-full" />
          )}
          <div className="absolute top-4 left-4 bg-white/95 text-cyan-600 font-bold px-3 py-1.5 rounded-full text-xs shadow-md">
            {category}
          </div>
        </div>

        <div className="p-6 flex flex-col grow">
          <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-cyan-600 transition-colors">
            {courseName}
          </h3>
          <p className="text-gray-500 text-sm mb-4">สอนโดย {instructor}</p>

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-4 text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                <span className="font-semibold text-gray-900">
                  {rating} <span className="text-gray-500"></span>
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between text-sm text-gray-600">
              <div className="flex items-center gap-1">
                <Clock size={16} />
                <span>{duration}</span>
              </div>
              <div className="flex items-center gap-1">
                <Zap size={16} />
                <span className="font-medium">{level}</span>
              </div>
            </div>
          </div>

          <div className="flex items-end justify-between mt-auto pt-4 border-t border-gray-100">
            <div className="flex flex-col">
              <span className="text-xs text-gray-400 font-medium line-through mb-0.5">
                {originalPrice}
              </span>
              <span className="text-2xl font-black text-rose-600 tracking-tight">
                {price}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button className="bg-cyan-50 text-cyan-600 hover:bg-cyan-500 hover:text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors duration-300 shadow-sm">
                ดูรายละเอียด
              </button>
              <button
                className="bg-cyan-50 text-cyan-600 hover:bg-cyan-500 hover:text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors duration-300 shadow-sm"
                onClick={(e) => handleAddToCart(e, id)}
              >
                เพิ่มใส่ตะกร้า
              </button>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default CourseCard;
