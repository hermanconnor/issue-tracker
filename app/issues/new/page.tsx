import type { Metadata } from "next";
import { redirect } from "next/navigation";
import dynamic from "next/dynamic";
import { getServerSession } from "next-auth";
import IssueFormSkeleton from "@/components/issueForm/IssueFormSkeleton";
import authOptions from "@/app/api/auth/authOptions";

export const metadata: Metadata = {
  title: "Create New Issue",
  description: "Create and submit a new issue",
};

const IssueForm = dynamic(() => import("@/components/issueForm/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const NewIssuePage = async () => {
  const session = await getServerSession(authOptions);

  if (!session?.user) {
    redirect("/sign-in");
  }

  return <IssueForm />;
};

export default NewIssuePage;
