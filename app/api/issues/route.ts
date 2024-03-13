import { NextRequest, NextResponse } from "next/server";

import prisma from "@/lib/db";
import { IssueSchema } from "@/app/validation";

export async function POST(request: NextRequest) {
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
