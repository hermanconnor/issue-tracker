import IssuesChart from "./IssuesChart";
import prisma from "@/lib/db";

const DashboardPage = async () => {
  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
      <div className="flex flex-col gap-5">
        <div>Issue Summary</div>
        <IssuesChart open={open} inProgress={inProgress} closed={closed} />
      </div>

      <div>Latest Issues</div>
    </div>
  );
};

export default DashboardPage;
