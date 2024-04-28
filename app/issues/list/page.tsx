import type { Metadata } from "next";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

import prisma from "@/lib/db";
import { Status } from "@prisma/client";
import IssueTable, { columnNames } from "./IssueTable";
import IssueStatusFilter from "./IssueStatusFilter";
import { IssueQuery } from "@/lib/definitions";
import Pagination from "@/components/Pagination";

interface Props {
  searchParams: IssueQuery;
}

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Issues List",
  description: "View all project issues",
};

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

  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;

  // take - is the number of records we want to fetch
  const issues = await prisma.issue.findMany({
    where: { status },
    orderBy,
    skip: (page - 1) * pageSize,
    take: pageSize,
  });

  const issueCount = await prisma.issue.count({
    where: { status },
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

      <Pagination
        itemCount={issueCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  );
};

export default IssuesListPage;
