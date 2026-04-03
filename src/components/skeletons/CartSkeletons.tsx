import { Skeleton } from "@/components/ui/skeleton";

export default function CartSkeletons() {
  return (
    <div>
      <div className="max-w-7xl w-full p-8 flex items-center mx-auto gap-6 h-44">
        <Skeleton className="w-80 h-10" />
      </div>
      <div className="max-w-7xl w-full mx-auto grid grid-cols-3 gap-10 p-8">
        <div className="col-span-2 flex flex-col gap-6">
          {Array.from({ length: 2 }).map((_, index) => (
            <div key={index} className="flex items-start gap-4">
              <Skeleton className="w-30 h-30" />
              <div className="flex flex-col gap-2">
                <Skeleton className="w-100 h-8" />
                <Skeleton className="w-60 h-6" />
              </div>
            </div>
          ))}
        </div>
        <div className="space-y-6">
          <Skeleton className="w-60 h-6" />
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="flex items-center justify-between">
                  <Skeleton className="w-40 h-6" />
                  <Skeleton className="w-10 h-6" />
                </div>
              ))}
            </div>
            <Skeleton className="w-full h-10" />
          </div>
        </div>
      </div>
    </div>
  );
}
