import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Star, Clock, Zap } from "lucide-react";
import { useTranslations } from "next-intl";

interface CourseCardProps {
  id: string;
  price: string;
  category: string;
  title: string;
  instructor: string;
  rating: number;
  students: number;
  duration: string;
  level: string;
  image: string;
}

const CourseCard: React.FC<CourseCardProps> = ({
  id,
  price,
  category,
  title,
  instructor,
  rating,
  students,
  duration,
  level,
  image,
}) => {
  const t = useTranslations("courseCard");
  const numericPrice = parseInt(price.replace(/[^0-9]/g, "")) || 0;
  const originalPrice = numericPrice
    ? `฿${(numericPrice * 1.4).toFixed(0)}`
    : "";

  return (
    <Link
      href={`/course/${id}`}
      className="bg-white rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 overflow-hidden group flex flex-col h-full"
    >
      <div className="relative h-48 bg-gray-300 overflow-hidden shrink-0">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute top-4 left-4 bg-white/95 text-cyan-600 font-bold px-3 py-1.5 rounded-full text-xs shadow-md">
          {category}
        </div>
      </div>

      <div className="p-6 flex flex-col grow">
        <h3 className="text-xl font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-cyan-600 transition-colors">
          {title}
        </h3>
        <p className="text-gray-500 text-sm mb-4">{t("taughtBy")} {instructor}</p>

        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Star size={16} className="fill-yellow-400 text-yellow-400" />
              <span className="font-semibold text-gray-900">
                {rating}{" "}
                <span className="text-gray-500">
                  ({students.toLocaleString()})
                </span>
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
          <div className="bg-cyan-50 text-cyan-600 group-hover:bg-cyan-500 group-hover:text-white px-5 py-2.5 rounded-xl text-sm font-bold transition-colors duration-300 shadow-sm">
            {t("viewDetails")}
          </div>
        </div>
      </div>
    </Link>
  );
};

export default CourseCard;
