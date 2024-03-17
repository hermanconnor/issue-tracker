import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import { Status } from "@prisma/client";

interface Props {
  open: number;
  inProgress: number;
  closed: number;
}

const IssuesSummary = ({ open, inProgress, closed }: Props) => {
  const STATUSES: { label: string; value: number; status: Status }[] = [
    { label: "Open Issues", value: open, status: "OPEN" },
    { label: "In-progress Issues", value: inProgress, status: "IN_PROGRESS" },
    { label: "Closed Issues", value: closed, status: "CLOSED" },
  ];

  return (
    <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
      {STATUSES.map((item) => (
        <Card key={item.label} className="">
          <CardHeader>
            <CardTitle className="text-purple-500 transition-colors hover:text-purple-600">
              <Link href={`/issues/list?status=${item.status}`}>
                {item.label}
              </Link>
            </CardTitle>
          </CardHeader>

          <CardContent>
            <p className="text-lg">{item.value}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default IssuesSummary;
