"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

interface Props {
  issueId: number;
}

const DeleteIssueButton = ({ issueId }: Props) => {
  const [isDeleting, setIsDeleting] = useState(false);

  const router = useRouter();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      await axios.delete(`/api/issues/${issueId}`);
      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      setIsDeleting(false);
      toast.error("This issue could not be deleted");
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button disabled={isDeleting} variant="destructive">
          {isDeleting && <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />}
          Delete Issue
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            issue.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction
            className="bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90"
            onClick={handleDelete}
          >
            Delete
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteIssueButton;
