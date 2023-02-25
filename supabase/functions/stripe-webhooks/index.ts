// deploy using the --no-jwt-verify flag:
// $ supabase functions deploy --no-verify-jwt stripe-webhooks
import { corsHeaders } from "./../_shared/corst.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { cryptoProvider, stripe } from "../_utils/stripe.ts";

console.log("Hello from Functions!");

const endpointSecret: string = Deno.env.get("ENDPOINT_SECRET");

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: { ...corsHeaders },
      status: 200,
    });
  }
  try {
    const sig = req.headers.get("stripe-signature");
    if (!sig) {
      throw new Error("Missing stripe signature");
    }

    const body = await req.text();
    // need to use custom crypto provider https://github.com/supabase/supabase/blob/master/examples/edge-functions/supabase/functions/stripe-webhooks/index.ts
    const event = await stripe.webhooks.constructEventAsync(
      body,
      sig,
      endpointSecret,
      undefined,
      cryptoProvider,
    );

    console.log(event);

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? "",
      {
        autoRefreshToken: false,
        persistSession: false,
      },
    );

    // change customers table to use email instead of stripe ID.
    // Can either store email in table (bad practice but easier and faster) - Chandler votes this one for simplicity
    // Or just use the user_id and then do a separate query to get the email (good practice but annoying and slow)

    switch (event.type) {
      case "checkout.session.completed":
        //set subscription status to pro in customers table
        // const session = event.data.object;
        // this is for free trials
        console.log(`🔔  Payment received!`);
        break;
      case "invoice.paid":
        console.log(`🔔  Invoice paid!`);
        const invoice = event.data.object;
        const { customer } = invoice;
        const email = invoice?.customer_email;
        const lines = invoice.lines.data;
        console.log(lines);
        const subscription_id = lines?.[0]?.subscription;
        const end_time = lines?.[0]?.period.end;
        const expire_date = new Date(end_time * 1000);

        const { data: customerData, error: customerError } =
          await supabaseClient
            .from("customers")
            .select()
            .eq("stripe_id", customer)
            .limit(1);

        if (customerError) {
          throw customerError;
        }

        const data = customerData?.[0]?.subscribed_on
          ? {
            subscription: "pro",
            last_paid: new Date(),
            subscription_id,
            expire_date,
          }
          : {
            subscription: "pro",
            last_paid: new Date(),
            subscribed_on: new Date(),
            stripe_id: customer,
            email,
            subscription_id,
            expire_date,
          };

        const { error } = await supabaseClient
          .from("customers")
          .upsert(data)
          .eq("stripe_id", customer);

        if (error) {
          throw error;
        }

        break;
      case "invoice.payment_failed":
        console.log(`🔔  Invoice payment failed!`);
        // set subscription status to cancelled in customers table

        break;
      default:
        throw new Error(`Unhandled event type: ${event.type}`);
    }

    return new Response(
      JSON.stringify({ status: "ok" }),
      { headers: { "Content-Type": "application/json" } },
    );
  } catch (error) {
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});

// To invoke:
// curl -i --location --request POST 'http://localhost:54321/functions/v1/' \
//   --header 'Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0' \
//   --header 'Content-Type: application/json' \
//   --data '{"name":"Functions"}'
