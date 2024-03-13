import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/db";
import { EditIssueSchema } from "@/app/validation";

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } },
) {
  const body = await request.json();

  const parsedData = EditIssueSchema.safeParse(body);

  if (!parsedData.success) {
    return NextResponse.json(
      { error: parsedData.error.flatten().fieldErrors },
      {
        status: 400,
      },
    );
  }

  const { title, description, status, userId } = parsedData.data;

  if (userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      return NextResponse.json({ error: "Invalid user" }, { status: 400 });
    }
  }

  const issue = await prisma.issue.findUnique({
    where: { id: parseInt(params.id) },
  });

  if (!issue) {
    return NextResponse.json({ error: "Issue not found" }, { status: 404 });
  }

  const updatedIssue = await prisma.issue.update({
    where: { id: issue.id },
    data: {
      title,
      description,
      status,
      userId,
    },
  });

  return NextResponse.json(updatedIssue);
}
