import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "@radix-ui/react-icons";

import prisma from "@/lib/db";
import IssueTable from "./IssueTable";

const IssuesListPage = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "asc" },
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>Select goes here</div>

        <Button asChild variant="primary">
          <Link href="/issues/new">New Issue</Link>
        </Button>
      </div>

      <IssueTable issues={issues} />
    </div>
  );
};

export default IssuesListPage;
