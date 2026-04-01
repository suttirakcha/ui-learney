import LnButton from '../custom/LnButton';
import { Progress } from '../ui/progress';

export default function StudentCourseCard() {
  return (
    <div className="p-6 border-2 border-accent rounded-lg space-y-8">
      <div className="space-y-2">
        <div className="flex justify-between">
          <div className="text-sm text-primary">
            <p>development</p>
            <h2 className="text-lg font-medium text-black">
              Complete Web Development Bootcamp
            </h2>
          </div>
          <div className="text-primary text-sm">
            <p className="text-2xl flex justify-end">45%</p>
            <p>สำเร็จแล้ว</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="flex flex-col gap-2 w-full">
            <p className="text-muted-foreground text-sm">sarah Johnson</p>
            <Progress value={45} className="gap-2 h-2 w-full" />
          </div>
        </div>
        <LnButton>{'เรียนต่อ'}</LnButton>
      </div>
    </div>
  );
}
