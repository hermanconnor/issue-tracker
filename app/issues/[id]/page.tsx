import { notFound } from "next/navigation";

import IssueDetailsCard from "./IssueDetailsCard";
import EditIssueButton from "./EditIssueButton";
import DeleteIssueButton from "./DeleteIssueButton";
import AssigneeSelect from "./AssigneeSelect";
import prisma from "@/lib/db";
import { getUsers } from "@/lib/getUsers";

interface Props {
  params: { id: string };
}

const IssueDetailPage = async ({ params: { id } }: Props) => {
  if (isNaN(Number(id))) notFound();

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(id) },
  });

  if (!issue) notFound();

  const users = await getUsers();

  return (
    <div className="grid grid-cols-1 gap-5 md:grid-cols-5">
      <div className="md:col-span-4">
        <IssueDetailsCard issue={issue} />
      </div>

      <div className="mt-5 flex flex-col gap-4">
        <AssigneeSelect users={users} issue={issue} />
        <EditIssueButton issueId={issue.id} />
        <DeleteIssueButton issueId={issue.id} />
      </div>
    </div>
  );
};

export default IssueDetailPage;
