import { NextRequest, NextResponse } from "next/server";
import { getServerSession } from "next-auth";

import prisma from "@/lib/db";
import { IssueSchema } from "@/app/validation";
import authOptions from "../auth/authOptions";

export async function POST(request: NextRequest) {
  const session = await getServerSession(authOptions);

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const body = await request.json();

  const parsedData = IssueSchema.safeParse(body);

  if (!parsedData.success) {
    return NextResponse.json(
      { error: parsedData.error.flatten().fieldErrors },
      {
        status: 400,
      },
    );
  }

  const issue = await prisma.issue.create({
    data: {
      title: parsedData.data.title,
      description: parsedData.data.description,
    },
  });

  return NextResponse.json(issue, { status: 201 });
}
