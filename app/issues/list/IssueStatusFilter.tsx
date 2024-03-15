"use client";

import { useRouter, useSearchParams } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Status } from "@prisma/client";

const STATUSES: { label: string; value?: Status }[] = [
  { label: "All" },
  { label: "Open", value: "OPEN" },
  { label: "In Progress", value: "IN_PROGRESS" },
  { label: "Closed", value: "CLOSED" },
];

const IssueStatusFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleChange = (status: string) => {
    const params = new URLSearchParams();

    if (status) {
      params.append("status", status);
    }

    if (searchParams.get("orderBy")) {
      params.append("orderBy", searchParams.get("orderBy")!);
    }

    const query = params.size ? `?${params.toString()}` : "";

    router.push(`/issues/list${query}`);
  };

  return (
    <Select
      defaultValue={searchParams.get("status") || ""}
      onValueChange={handleChange}
    >
      <SelectTrigger className="w-[180px]">
        <SelectValue placeholder="Filter by status" />
      </SelectTrigger>
      <SelectContent>
        {STATUSES.map((status) => (
          <SelectItem
            key={status.value + "-IssueStatusFilter"}
            value={status.value || "ALL"}
          >
            {status.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default IssueStatusFilter;
