import dynamic from "next/dynamic";
import IssueFormSkeleton from "@/components/issueForm/IssueFormSkeleton";

const IssueForm = dynamic(() => import("@/components/issueForm/IssueForm"), {
  ssr: false,
  loading: () => <IssueFormSkeleton />,
});

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
