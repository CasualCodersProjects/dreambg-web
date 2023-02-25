import { corsHeaders } from "./../_shared/corst.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { stripe } from "../_utils/stripe.ts";

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: { ...corsHeaders },
      status: 200,
    });
  }
  try {
    // Create a Supabase client with the Auth context of the logged in user.
    const supabaseClient = createClient(
      // Supabase API URL - env var exported by default.
      Deno.env.get("SUPABASE_URL") ?? "",
      // Supabase anon key - env var exported by default.
      Deno.env.get("SUPABASE_ANON_KEY") ?? "",
      // Create client with Auth context of the user that called the function.
      // This way your row-level-security (RLS) policies are applied.
      {
        global: {
          headers: { Authorization: req.headers.get("Authorization")! },
        },
      },
    );

    // Now we can get the session or user object
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    if (!user) {
      console.error("User not found");
      throw new Error("User not found");
    }

    // query the customers table to see if the user already has a customer
    const { data: customers, error: customerError } = await supabaseClient
      .from("customers")
      .select("*")
      .eq("user_id", user.id)
      .limit(1);

    if (customerError) {
      console.error(customerError);
      throw customerError;
    }

    if (customers.length === 0) {
      // customer does not exist, return 404
      return new Response(JSON.stringify({ status: "not found" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 404,
      });
    } else {
      // get the customer's Stripe ID, and delete their data from the customers table
      const { stripe_id } = customers[0];

      const stripeResp = await stripe.customers.del(stripe_id);
      if (!stripeResp.deleted) {
        throw new Error("Stripe customer not deleted");
      }

      const { error: deleteError } = await supabaseClient
        .from("customers")
        .delete()
        .eq("stripe_id", stripe_id);

      if (deleteError) {
        throw deleteError;
      }

      return new Response(JSON.stringify({ status: "ok" }), {
        status: 200,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
