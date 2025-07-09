import { NextResponse } from "next/server";
import stripe from "@/lib/stripe";
import prisma from "@/lib/prisma";

export async function GET(
  _request: Request,
  { params }: { params: { orgId: string } }
) {
  const org = await prisma.organization.findUnique({
    where: { id: params.orgId },
  });
  if (!org?.stripeAccountId) {
    const link = await stripe.accounts.createAccountLink({
      account: org!.stripeAccountId!,
      refresh_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/stripe`,
      return_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/stripe`,
      type: "account_onboarding",
    });
    return NextResponse.json({ connected: false, url: link.url });
  }
  return NextResponse.json({ connected: true });
}
