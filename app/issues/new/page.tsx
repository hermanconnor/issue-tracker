import dynamic from "next/dynamic";

const IssueForm = dynamic(() => import("@/components/issueForm/IssueForm"), {
  ssr: false,
});

const NewIssuePage = () => {
  return <IssueForm />;
};

export default NewIssuePage;
