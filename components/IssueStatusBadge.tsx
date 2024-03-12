import { Badge } from "@/components/ui/badge";

import { Status } from "@prisma/client";

const STATUS_MAP: Record<
  Status,
  { label: string; color: "info" | "danger" | "success" }
> = {
  OPEN: { label: "Open", color: "danger" },
  IN_PROGRESS: { label: "In Progress", color: "info" },
  CLOSED: { label: "Closed", color: "success" },
};

const IssueStatusBadge = ({ status }: { status: Status }) => {
  return (
    <Badge variant={STATUS_MAP[status].color}>{STATUS_MAP[status].label}</Badge>
  );
};

export default IssueStatusBadge;
