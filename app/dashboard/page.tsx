import IssuesSummary from "./IssuesSummary";
import IssuesChart from "./IssuesChart";
import prisma from "@/lib/db";

const DashboardPage = async () => {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });

  return (
    <div className="space-y-6">
      <IssuesSummary open={open} inProgress={inProgress} closed={closed} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <IssuesChart open={open} inProgress={inProgress} closed={closed} />
        <div>Latest Issues</div>
      </div>
    </div>
  );
};

export default DashboardPage;
