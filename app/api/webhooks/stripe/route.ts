import { headers } from "next/headers";
import { NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/supabase-server";
import Stripe from "stripe";

export const dynamic = 'force-dynamic';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2023-10-16",
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

export async function POST(req: Request) {
  const body = await req.text();
  const signature = (await headers()).get("stripe-signature")!;

  let event: Stripe.Event;

  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    return NextResponse.json(
      { error: `Webhook Error: ${err}` },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  switch (event.type) {
    case "payment_intent.succeeded":
      const paymentIntent = event.data.object as Stripe.PaymentIntent;

      // Update donation status
      await supabase
        .from("donations")
        .update({ status: "succeeded" })
        .eq("stripe_payment_intent_id", paymentIntent.id);

      // Get donation details to update cause raised amount
      const { data: donation } = await supabase
        .from("donations")
        .select("cause_id, amount")
        .eq("stripe_payment_intent_id", paymentIntent.id)
        .single();

      if (donation?.cause_id) {
        // Update cause raised amount
        const { data: cause } = await supabase
          .from("causes")
          .select("raised_amount")
          .eq("id", donation.cause_id)
          .single();

        if (cause) {
          await supabase
            .from("causes")
            .update({ raised_amount: cause.raised_amount + donation.amount })
            .eq("id", donation.cause_id);
        }
      }
      break;

    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;
      
      // Handle donation checkouts if needed
      if (session.mode === 'payment' && session.metadata?.donation_id) {
        // Update donation record with session details
        await supabase
          .from("donations")
          .update({ 
            stripe_session_id: session.id,
            status: "completed"
          })
          .eq("id", session.metadata.donation_id);
      }
      break;

    case "invoice.payment_succeeded":
      const invoice = event.data.object as Stripe.Invoice;

      // Create invoice record
      await supabase.from("invoices").insert({
        organization_id: invoice.metadata?.organization_id,
        stripe_invoice_id: invoice.id,
        amount: invoice.amount_paid / 100,
        currency: invoice.currency,
        status: "paid",
        pdf_url: invoice.invoice_pdf,
      });
      break;
  }

  return NextResponse.json({ received: true });
}
