import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import IssuesSummary from "./IssuesSummary";
import IssuesChart from "./IssuesChart";
import LatestIssues from "./LatestIssues";
import prisma from "@/lib/db";
import authOptions from "../api/auth/authOptions";

const DashboardPage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/sign-in?callbackUrl=/dashboard");
  }

  const open = await prisma.issue.count({ where: { status: "OPEN" } });
  const closed = await prisma.issue.count({ where: { status: "CLOSED" } });
  const inProgress = await prisma.issue.count({
    where: { status: "IN_PROGRESS" },
  });

  return (
    <div className="space-y-6 py-4">
      <IssuesSummary open={open} inProgress={inProgress} closed={closed} />
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
        <IssuesChart open={open} inProgress={inProgress} closed={closed} />
        <LatestIssues />
      </div>
    </div>
  );
};

export default DashboardPage;
