import { BookOpen, CircleCheckBig, Clock2, Flame } from 'lucide-react';

export default function StudentCourseCard() {
  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        <BookOpen className="w-4 h-4 text-primary" />
      </div>
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        <CircleCheckBig className="w-4 h-4" />
      </div>
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        <Clock2 className="w-4 h-4" />
      </div>
      <div className="flex items-center gap-2 text-muted-foreground text-sm">
        <Flame className="w-4 h-4" />
      </div>
    </div>
  );
}
