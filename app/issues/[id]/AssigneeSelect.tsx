"use client";

import axios from "axios";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { UserWithoutPassword } from "@/lib/getUsers";
import { Issue } from "@prisma/client";

interface Props {
  users: UserWithoutPassword[];
  issue: Issue;
}

const AssigneeSelect = ({ users, issue }: Props) => {
  const handleChange = async (userId: string) => {
    try {
      await axios.patch(`/api/issues/${issue.id}`, {
        userId: userId === "unassigned" ? null : userId,
      });
    } catch (error) {
      toast.error("Changes could not be saved");
    }
  };

  return (
    <Select
      defaultValue={issue.userId || "unassigned"}
      onValueChange={handleChange}
    >
      <SelectTrigger>
        <SelectValue placeholder="Assign" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem value="unassigned">Unassigned</SelectItem>
        {users.map((user) => (
          <SelectItem key={user.id} value={user.id}>
            {user.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default AssigneeSelect;
