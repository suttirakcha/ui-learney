import { Button } from "@/components/ui/button";
import { Edit, Star, Users } from "lucide-react";

export default function InstructorCourseCard() {
  return (
    <div className="p-6 border border-accent rounded-lg space-y-8">
      <div className="flex justify-between">
        <div className="space-y-2">
          <h2 className="text-lg font-medium">
            Complete Web Development Bootcamp
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Users className="w-4 h-4" />
              1,543 students
            </div>
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <Star className="w-4 h-4" />
              4.8 (328 reviews)
            </div>
          </div>
        </div>

        <Button className="flex items-center gap-2" variant="outline">
          <Edit />
          Edit
        </Button>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="rounded-lg bg-primary/30 p-4">
          <h3 className="text-accent-foreground">Revenue</h3>
          <p className="text-xl font-semibold">฿8,830</p>
        </div>
        <div className="rounded-lg bg-success/10 p-4">
          <h3 className="text-accent-foreground">Revenue</h3>
          <p className="text-xl font-semibold text-success">฿7,505.50</p>
        </div>
        <div className="rounded-lg bg-primary/10 p-4">
          <h3 className="text-accent-foreground">Enrollment Rate</h3>
          <p className="text-xl font-semibold text-primary">58%</p>
        </div>
      </div>
    </div>
  );
}
