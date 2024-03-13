"use client";

import { useRouter } from "next/navigation";
import axios from "axios";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";

import { Issue, Status } from "@prisma/client";
import { IssueSchema, IssueFormType } from "@/app/validation";

interface Props {
  issue?: Issue;
}

const IssueForm = ({ issue }: Props) => {
  const router = useRouter();

  const form = useForm<IssueFormType>({
    resolver: zodResolver(IssueSchema),
    defaultValues: {
      title: "",
      description: "",
    },
  });

  const onSubmit = async (values: IssueFormType) => {
    try {
      if (issue) {
        await axios.patch(`/api/issues/${issue.id}`, values);
      } else {
        await axios.post("/api/issues", values);
      }

      router.push("/issues/list");
      router.refresh();
    } catch (error) {
      toast.error("An unexpected error occurred");
    }
  };

  return (
    <div className="mx-auto max-w-xl py-4">
      <Form {...form}>
        <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input
                    type="text"
                    placeholder="Title"
                    defaultValue={issue?.title}
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <SimpleMDE
                    defaultValue={issue?.description}
                    placeholder="Descrption"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* <Controller
            defaultValue={issue?.description}
            name="description"
            control={form.control}
            render={({ field }) => (
              <SimpleMDE placeholder="Descrption" {...field} />
            )}
          />
          <p className="text-[0.8rem] font-medium text-destructive">
            {form.formState.errors.description?.message}
          </p> */}

          <Button
            disabled={form.formState.isSubmitting}
            variant="primary"
            type="submit"
            className="w-full"
          >
            {form.formState.isSubmitting && (
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            )}
            {issue ? "Update Issue" : "Submit New Issue"}
          </Button>
        </form>
      </Form>
    </div>
  );
};

export default IssueForm;
