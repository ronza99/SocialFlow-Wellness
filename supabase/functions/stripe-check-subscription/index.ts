import "jsr:@supabase/functions-js/edge-runtime.d.ts";
import { createClient } from "npm:@supabase/supabase-js@2";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

interface StripeSubscription {
  id: string;
  status: string;
  current_period_end: number;
  items: {
    data: {
      price: {
        unit_amount: number;
        currency: string;
        recurring: { interval: string } | null;
        product: string;
      };
    }[];
  };
}

interface StripeCustomer {
  id: string;
  email: string;
  created: number;
}

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { status: 200, headers: corsHeaders });
  }

  try {
    const stripeKey = Deno.env.get("STRIPE_SECRET_KEY");
    if (!stripeKey) {
      return new Response(
        JSON.stringify({ error: "Stripe non configurato. Aggiungi STRIPE_SECRET_KEY nei segreti." }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseServiceKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const supabase = createClient(supabaseUrl, supabaseServiceKey);

    const body = await req.json();
    const { lead_id, email, stripe_customer_id, selected_customer_id } = body;

    if (!lead_id || !email) {
      return new Response(
        JSON.stringify({ error: "lead_id e email sono obbligatori" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const stripeHeaders = {
      Authorization: `Bearer ${stripeKey}`,
      "Content-Type": "application/x-www-form-urlencoded",
    };

    let customerId = selected_customer_id || stripe_customer_id;
    let multipleCustomers: StripeCustomer[] = [];

    if (!customerId) {
      const searchRes = await fetch(
        `https://api.stripe.com/v1/customers?email=${encodeURIComponent(email)}&limit=10`,
        { headers: stripeHeaders }
      );
      const searchData = await searchRes.json();

      if (!searchRes.ok) {
        return new Response(
          JSON.stringify({ error: searchData.error?.message || "Errore Stripe" }),
          { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      const customers: StripeCustomer[] = searchData.data || [];

      if (customers.length === 0) {
        await supabase.from("quote_requests").update({
          stripe_last_check: new Date().toISOString(),
          stripe_last_check_result: "not_found",
          stripe_subscription_data: null,
        }).eq("id", lead_id);

        return new Response(
          JSON.stringify({ result: "not_found" }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      if (customers.length > 1 && !selected_customer_id) {
        return new Response(
          JSON.stringify({
            result: "multiple_found",
            customers: customers.map((c) => ({ id: c.id, email: c.email, created: c.created })),
          }),
          { headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }

      customerId = customers[0].id;
    }

    const subsRes = await fetch(
      `https://api.stripe.com/v1/subscriptions?customer=${customerId}&limit=5&status=all`,
      { headers: stripeHeaders }
    );
    const subsData = await subsRes.json();

    if (!subsRes.ok) {
      return new Response(
        JSON.stringify({ error: subsData.error?.message || "Errore Stripe subscriptions" }),
        { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const subscriptions: StripeSubscription[] = subsData.data || [];
    const active = subscriptions.find((s) => ["active", "trialing", "past_due"].includes(s.status));
    const sub = active || subscriptions[0] || null;

    let productName: string | null = null;
    if (sub) {
      const priceItem = sub.items?.data?.[0];
      if (priceItem?.price?.product) {
        const prodRes = await fetch(
          `https://api.stripe.com/v1/products/${priceItem.price.product}`,
          { headers: stripeHeaders }
        );
        if (prodRes.ok) {
          const prodData = await prodRes.json();
          productName = prodData.name || null;
        }
      }
    }

    const result = sub ? sub.status : "not_found";

    const subscriptionData = sub
      ? {
          subscription_id: sub.id,
          status: sub.status,
          current_period_end: sub.current_period_end,
          amount: sub.items?.data?.[0]?.price?.unit_amount ?? null,
          currency: sub.items?.data?.[0]?.price?.currency ?? null,
          interval: sub.items?.data?.[0]?.price?.recurring?.interval ?? null,
          product_name: productName,
          customer_id: customerId,
        }
      : null;

    await supabase.from("quote_requests").update({
      stripe_customer_id: customerId,
      stripe_last_check: new Date().toISOString(),
      stripe_last_check_result: result,
      stripe_subscription_data: subscriptionData,
    }).eq("id", lead_id);

    return new Response(
      JSON.stringify({
        result,
        customer_id: customerId,
        subscription: subscriptionData,
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (err) {
    return new Response(
      JSON.stringify({ error: String(err) }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
