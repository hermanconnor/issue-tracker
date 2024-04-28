import type { Metadata } from "next";
import { notFound, redirect } from "next/navigation";
import dynamic from "next/dynamic";
import { getServerSession } from "next-auth";

import prisma from "@/lib/db";
import EditFormSkeleton from "./EditFormSkeleton";
import authOptions from "@/app/api/auth/authOptions";

export const metadata: Metadata = {
  title: "Edit Issue",
  description: "Edit Issue",
};

const IssueForm = dynamic(() => import("@/components/issueForm/IssueForm"), {
  ssr: false,
  loading: () => <EditFormSkeleton />,
});

interface Props {
  params: { id: string };
}

const EditIssuePage = async ({ params: { id } }: Props) => {
  if (isNaN(Number(id))) notFound();

  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect(`/sign-in`);
  }

  const issue = await prisma.issue.findUnique({
    where: { id: Number(id) },
  });

  if (!issue) notFound();

  return <IssueForm issue={issue} />;
};

export default EditIssuePage;
