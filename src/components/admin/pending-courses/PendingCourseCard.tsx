import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock, Tag, User } from "lucide-react";
import { Course } from "@/types/course";
import { useTranslations } from "next-intl";

interface Props {
  course: Course;
}

export default function PendingCourseCard({ course }: Props) {
  const t = useTranslations("admin.pendingCourses");

  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        {/* Header */}
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
              {t("newCourse")}
            </span>

            <div className="flex items-center text-xs text-muted-foreground gap-1">
              <Clock size={14} />
              {course.date}
            </div>
          </div>

          <div className="text-right">
            <p className="text-sm text-muted-foreground">{t("price")}</p>
            <p className="text-lg font-bold text-blue-600">
              ฿{course.price.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold">{course.courseName}</h2>

        {/* Meta */}
        <div className="flex gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <User size={14} />
            {course.instructor}
          </div>

          <div className="flex items-center gap-1">
            <Tag size={14} />
            {course.category}
          </div>
        </div>

        {/* Description */}
        <div>
          <p className="text-sm font-medium">{t("details")}</p>
          <p className="text-sm text-muted-foreground">{course.description}</p>
        </div>

        {/* Revenue */}
        <div className="bg-muted p-4 rounded-md">
          <p className="text-xs text-muted-foreground">{t("platformRevenue")}</p>
          <p className="text-sm font-semibold text-blue-600">
            ฿{(course.price * 0.15).toLocaleString()} {t("perSale")}
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button className="flex-1 bg-green-600 hover:bg-green-700">
            <CheckCircle className="mr-2 w-4 h-4" />
            {t("approve")}
          </Button>

          <Button
            variant="outline"
            className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
          >
            <XCircle className="mr-2 w-4 h-4" />
            {t("reject")}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
