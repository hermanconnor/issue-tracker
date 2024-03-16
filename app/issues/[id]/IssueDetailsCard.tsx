import Markdown from "react-markdown";
import { Separator } from "@/components/ui/separator";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Issue } from "@prisma/client";
import IssueStatusBadge from "@/components/IssueStatusBadge";

interface Props {
  issue: Issue;
}

const IssueDetailsCard = ({ issue }: Props) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="md:text-lg">{issue.title}</CardTitle>
      </CardHeader>
      <Separator className="mb-3" />
      <CardContent className="space-y-3">
        <div className="flex items-center gap-2">
          <IssueStatusBadge status={issue.status} />
          <time dateTime={issue.createdAt.toISOString()}>
            {issue.createdAt.toDateString()}
          </time>
        </div>

        <Markdown>{issue.description}</Markdown>
      </CardContent>
    </Card>
  );
};

export default IssueDetailsCard;
