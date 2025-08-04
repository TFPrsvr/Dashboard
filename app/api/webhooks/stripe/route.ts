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
  const signature = headers().get("stripe-signature")!;

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

    case "customer.subscription.created":
    case "customer.subscription.updated":
      const subscription = event.data.object as Stripe.Subscription;
      
      // Get the organization ID from the subscription metadata or checkout session
      const organizationId = subscription.metadata?.organizationId;
      
      if (organizationId) {
        // Determine plan from price ID
        let plan = 'free';
        const priceId = subscription.items.data[0]?.price.id;
        if (priceId === process.env.STRIPE_PROFESSIONAL_PRICE_ID) {
          plan = 'professional';
        } else if (priceId === process.env.STRIPE_ENTERPRISE_PRICE_ID) {
          plan = 'enterprise';
        }

        // Update or create subscription record
        await supabase
          .from("subscriptions")
          .upsert({
            organization_id: organizationId,
            stripe_customer_id: subscription.customer as string,
            stripe_subscription_id: subscription.id,
            plan,
            status: subscription.status,
            current_period_start: new Date(subscription.current_period_start * 1000).toISOString(),
            current_period_end: new Date(subscription.current_period_end * 1000).toISOString(),
            cancel_at_period_end: subscription.cancel_at_period_end,
            updated_at: new Date().toISOString(),
          }, { 
            onConflict: 'organization_id' 
          });
      }
      break;

    case "customer.subscription.deleted":
      const deletedSubscription = event.data.object as Stripe.Subscription;
      
      // Update subscription to free plan
      await supabase
        .from("subscriptions")
        .update({
          plan: 'free',
          status: 'canceled',
          stripe_subscription_id: null,
          current_period_start: null,
          current_period_end: null,
          cancel_at_period_end: false,
          updated_at: new Date().toISOString(),
        })
        .eq("stripe_subscription_id", deletedSubscription.id);
      break;

    case "checkout.session.completed":
      const session = event.data.object as Stripe.Checkout.Session;
      
      if (session.mode === 'subscription' && session.client_reference_id) {
        // Get the subscription
        const subscription = await stripe.subscriptions.retrieve(session.subscription as string);
        
        // Update subscription metadata with organization ID
        await stripe.subscriptions.update(subscription.id, {
          metadata: {
            organizationId: session.client_reference_id,
          },
        });
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
