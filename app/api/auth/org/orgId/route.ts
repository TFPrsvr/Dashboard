// app/api/org/[orgId]/route.ts
import { NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: { orgId: string } }
) {
  const org = await prisma.organization.findUnique({
    where: { id: params.orgId },
  });
  return NextResponse.json(org);
}

export async function PUT(
  request: Request,
  { params }: { params: { orgId: string } }
) {
  const data = await request.json();
  const updated = await prisma.organization.update({
    where: { id: params.orgId },
    data,
  });
  return NextResponse.json(updated);
}
