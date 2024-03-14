import Link from "next/link";
import { ArrowUpIcon } from "@radix-ui/react-icons";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Issue } from "@prisma/client";
import IssueStatusBadge from "@/components/IssueStatusBadge";
import { IssueQuery } from "@/lib/definitions";

interface Props {
  searchParams: IssueQuery;
  issues: Issue[];
}

const COLUMNS: { label: string; value: keyof Issue; className?: string }[] = [
  { label: "Issue", value: "title" },
  { label: "Status", value: "status", className: "hidden md:table-cell" },
  { label: "Created", value: "createdAt", className: "hidden md:table-cell" },
];

export const columnNames = COLUMNS.map((column) => column.value);

const IssueTable = ({ searchParams, issues }: Props) => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {COLUMNS.map((column) => (
            <TableHead key={column.value} className={column.className}>
              <Link
                href={{ query: { ...searchParams, orderBy: column.value } }}
              >
                {column.label}
                {column.value === searchParams.orderBy && (
                  <ArrowUpIcon className="h-4 w-4" />
                )}
              </Link>
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {issues.map((issue) => (
          <TableRow key={issue.id}>
            <TableCell className="space-y-3 md:space-y-0">
              <Link
                href={`/issues/${issue.id}`}
                className="font-medium text-purple-500"
              >
                {issue.title}
              </Link>
              <div className="block md:hidden">
                <IssueStatusBadge status={issue.status} />
              </div>
            </TableCell>
            <TableCell className="hidden md:table-cell">
              <IssueStatusBadge status={issue.status} />
            </TableCell>
            <TableCell className="hidden md:table-cell">
              {issue.createdAt.toDateString()}
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default IssueTable;
