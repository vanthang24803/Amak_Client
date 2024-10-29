import { Skeleton } from "./ui/skeleton";

export const ProductSkeleton = () => (
  <div className="w-full pb-4 bg-white rounded-sm flex flex-col overflow-hidden lg:h-[60vh] md:h-[50vh] relative">
    <Skeleton className="md:h-[35vh] w-full rounded-md" />
    <div className="flex flex-col space-y-2 px-4 mt-2">
      <Skeleton className="h-3 w-1/3" />
      <Skeleton className="h-4 w-full" />
      <Skeleton className="h-4 w-2/3" />
      <Skeleton className="h-3 w-1/4" />
      <div className="flex items-center justify-between py-2">
        <Skeleton className="h-4 w-1/4" />
        <Skeleton className="h-6 w-12" />
      </div>
      <div className="flex items-center space-x-4">
        <Skeleton className="w-8 h-8 rounded-full" />
        <Skeleton className="h-4 w-24" />
      </div>
    </div>
  </div>
);
