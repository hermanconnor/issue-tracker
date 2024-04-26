import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Skeleton } from "@/components/ui/skeleton";

const IssueListSkeleton = () => {
  const issues = [1, 2, 3, 4, 5, 6, 7];

  return (
    <>
      <div className="flex items-center justify-between">
        <Skeleton className="h-9 w-[180px]" />

        <Skeleton className="h-9 w-[125.24px]" />
      </div>

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Issue</TableHead>
            <TableHead className="hidden md:table-cell">Status</TableHead>
            <TableHead className="hidden md:table-cell">Created</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {issues.map((issue) => (
            <TableRow key={issue}>
              <TableCell className="space-y-3 md:space-y-0">
                <Skeleton className="h-[38.4px]" />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton className="h-[38.4px]" />
              </TableCell>
              <TableCell className="hidden md:table-cell">
                <Skeleton className="h-[38.4px]" />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default IssueListSkeleton;
