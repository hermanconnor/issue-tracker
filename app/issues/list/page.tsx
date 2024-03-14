import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

import prisma from "@/lib/db";
import { Status } from "@prisma/client";
import IssueTable, { columnNames } from "./IssueTable";
import IssueStatusFilter from "./IssueStatusFilter";
import { IssueQuery } from "@/lib/definitions";

interface Props {
  searchParams: IssueQuery;
}

const IssuesListPage = async ({ searchParams }: Props) => {
  const statuses = Object.values(Status);

  // VALIDATE STATUS
  // If we pass undefined to prisma,
  // prisma will not include that status as part of filtering
  const status = statuses.includes(searchParams.status)
    ? searchParams.status
    : undefined;

  const orderBy = columnNames
    .map((column) => column)
    .includes(searchParams.orderBy)
    ? { [searchParams.orderBy]: "asc" }
    : undefined;

  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <IssueStatusFilter />

        <Button asChild variant="primary">
          <Link href="/issues/new">
            <PlusIcon className="mr-2 h-4 w-4" /> New Issue
          </Link>
        </Button>
      </div>

      <IssueTable searchParams={searchParams} issues={issues} />
    </div>
  );
};

export default IssuesListPage;
