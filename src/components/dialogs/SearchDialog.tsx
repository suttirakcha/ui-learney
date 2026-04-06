import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { coursesData } from "@/data/courses";
import { Search } from "lucide-react";
import Image from "next/image";
import SearchForm from "../forms/SearchForm";

export default function SearchDialog() {
  return (
    <Dialog>
      <DialogTrigger>
        <div className="flex items-center border rounded-full pl-3 pr-10 py-1 text-sm bg-gray-50 text-muted-foreground cursor-pointer">
          <Search className="w-4 h-4 mr-2 text-gray-500" />
          Search courses...
        </div>
      </DialogTrigger>
      <DialogContent className="max-w-xl! w-full p-6">
        <DialogTitle className="text-2xl font-bold">Search courses</DialogTitle>
        <SearchForm />
        <div className="flex flex-col gap-4 mt-4">
          {coursesData.map((course) => (
            <div key={course.id} className="flex gap-4">
              <div className="rounded-xl overflow-hidden">
                <Image
                  src={course.image}
                  alt={course.title}
                  width={60}
                  height={60}
                />
              </div>
              <div>
                <h2 className="text-xl font-semibold">{course.title}</h2>
                <p className="text-muted-foreground">โดย {course.instructor}</p>
              </div>
            </div>
          ))}
        </div>
      </DialogContent>
    </Dialog>
  );
}
