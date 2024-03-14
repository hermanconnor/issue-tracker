import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Pencil2Icon } from "@radix-ui/react-icons";

const EditIssueButton = ({ issueId }: { issueId: number }) => {
  return (
    <Button asChild variant="primary">
      <Link href={`/issues/edit/${issueId}`}>
        <Pencil2Icon className="mr-2 h-4 w-4" /> Edit Issue
      </Link>
    </Button>
  );
};

export default EditIssueButton;
