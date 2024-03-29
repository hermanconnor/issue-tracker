import { Skeleton } from "@/components/ui/skeleton";

const IssueFormSkeleton = () => {
  return (
    <div className="mx-auto max-w-xl py-4">
      <div className="space-y-5">
        <div className="mb-3">
          <Skeleton className="h-9 rounded-lg" />
        </div>

        <div className="mb-3">
          <Skeleton className="h-[436px] rounded" />
        </div>

        <div>
          <Skeleton className="h-10 w-full rounded-lg" />
        </div>
      </div>
    </div>
  );
};

export default IssueFormSkeleton;
