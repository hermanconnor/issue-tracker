import { Skeleton } from "@/components/ui/skeleton";

const IssueDetailsSkeleton = () => {
  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-5">
      <div className="md:col-span-4">
        <Skeleton className="h-[174.6px]" />
      </div>

      <div className="mt-5 flex flex-col gap-4">
        <Skeleton className="h-9" />
        <Skeleton className="h-9" />
        <Skeleton className="h-9" />
      </div>
    </div>
  );
};

export default IssueDetailsSkeleton;
