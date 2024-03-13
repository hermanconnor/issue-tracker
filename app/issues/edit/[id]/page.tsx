import { notFound } from "next/navigation";
import dynamic from "next/dynamic";

import prisma from "@/lib/db";
import EditFormSkeleton from "./EditFormSkeleton";

const IssueForm = dynamic(() => import("@/components/issueForm/IssueForm"), {
  ssr: false,
  loading: () => <EditFormSkeleton />,
});

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params: { id } }: Props) => {
  const issue = await prisma.issue.findUnique({
    where: { id: Number(id) },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
