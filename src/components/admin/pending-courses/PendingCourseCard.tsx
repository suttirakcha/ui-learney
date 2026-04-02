import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, XCircle, Clock, Tag, User } from "lucide-react";
import { Course } from "@/types/course";

interface PendingCourseCardProps {
  course: Course;
}

export default function PendingCourseCard({ course }: PendingCourseCardProps) {
  return (
    <Card>
      <CardContent className="p-6 space-y-4">
        {/* Header */}
        <div className="flex justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
              คอร์สใหม่
            </span>

            {/* <div className="flex items-center text-xs text-muted-foreground gap-1">
              <Clock size={14} />
              {course.date}
            </div> */}
          </div>

          <div className="text-right">
            <p className="text-sm text-muted-foreground">ราคา</p>
            <p className="text-lg font-bold text-blue-600">
              ฿{course.price.toLocaleString()}
            </p>
          </div>
        </div>

        {/* Title */}
        <h2 className="text-lg font-semibold">{course.course_name}</h2>

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
          <p className="text-sm font-medium">รายละเอียด</p>
          <p className="text-sm text-muted-foreground">{course.description}</p>
        </div>

        {/* Revenue */}
        <div className="bg-muted p-4 rounded-md">
          <p className="text-xs text-muted-foreground">รายได้แพลตฟอร์ม (15%)</p>
          <p className="text-sm font-semibold text-blue-600">
            ฿{(course.price * 0.15).toLocaleString()} ต่อการขาย
          </p>
        </div>

        {/* Actions */}
        <div className="flex gap-4">
          <Button className="flex-1 bg-green-600 hover:bg-green-700">
            <CheckCircle className="mr-2 w-4 h-4" />
            อนุมัติ
          </Button>

          <Button
            variant="outline"
            className="flex-1 border-red-500 text-red-500 hover:bg-red-50"
          >
            <XCircle className="mr-2 w-4 h-4" />
            ปฏิเสธ
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
