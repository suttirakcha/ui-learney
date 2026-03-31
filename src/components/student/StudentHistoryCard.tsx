import { Progress } from '../ui/progress';

export default function StudentHistoryCourseCard() {
  return (
    <div className="p-6 border-2 border-accent rounded-lg space-y-8">
      <div className="flex justify-between">
        <div className="space-y-2">
          <h2 className="text-lg font-medium">
            Complete Web Development Bootcamp
          </h2>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-muted-foreground text-sm">
              <div className="min-w-150">
                <div className="flex justify-end items-end">
                  <p>สำเร็จแล้ว</p>
                </div>
                <div className="flex justify-end items-end">
                  <p>45%</p>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground text-sm m-4">
                  <p>sarah Johnson</p>
                </div>
                <Progress value={45} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
