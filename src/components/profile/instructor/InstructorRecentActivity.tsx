import { UserCheck } from "lucide-react";

export default function InstructorRecentActivity() {
  return (
    <div className="flex gap-4">
      <div className="bg-blue-200 text-blue-600 flex p-4 rounded-full w-fit h-fit">
        <UserCheck />
      </div>
      <div className="space-y-1">
        <h3 className="text-base font-medium">New Enrollment</h3>
        <div className="text-muted-foreground text-sm flex items-center gap-1">
          <p>Mary Johnson</p>
          {"•"}
          <p>Advanced React</p>
        </div>
        <p className="text-sm">1 day ago</p>
      </div>
    </div>
  );
}
