import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";

import prisma from "@/lib/db";
import IssueStatusBadge from "@/components/IssueStatusBadge";

const LatestIssues = async () => {
  const issues = await prisma.issue.findMany({
    orderBy: { createdAt: "desc" },
    take: 5,
    include: { user: true },
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle>Latest Issues</CardTitle>
      </CardHeader>
      <CardContent>
        <Table>
          <TableBody>
            {issues.map((issue) => (
              <TableRow key={issue.id}>
                <TableCell>
                  <div className="flex items-center justify-between">
                    <div className="space-y-2">
                      <Link
                        href={`/issues/${issue.id}`}
                        className="block transition hover:text-purple-500 hover:underline"
                      >
                        {issue.title}
                      </Link>
                      <IssueStatusBadge status={issue.status} />
                    </div>

                    {issue.user && (
                      <Avatar>
                        <AvatarImage
                          src={
                            issue.user.image ||
                            "/images/profile-pic-placeholder.png"
                          }
                          alt={issue.user.name || "Assigned user"}
                        />
                        <AvatarFallback>
                          {issue.user.name?.charAt(0).toUpperCase()}
                        </AvatarFallback>
                      </Avatar>
                    )}
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
};

export default LatestIssues;
