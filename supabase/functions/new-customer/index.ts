import { corsHeaders } from "./../_shared/corst.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { stripe } from "../_utils/stripe.ts";

serve(async (req: Request) => {
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
      }
    );

    // Now we can get the session or user object
    const {
      data: { user },
    } = await supabaseClient.auth.getUser();

    if (!user) {
      console.log("User not found");
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
      // create a new customer in Stripe
      const customer = await stripe.customers.create({
        email: user.email,
      });
      // insert a new row in the customers table
      const { error } = await supabaseClient
        .from("customers")
        .insert([{ user_id: user.id, stripe_id: customer.id }]);

      if (error) {
        console.error(error);
        throw error;
      }

      return new Response(JSON.stringify({ status: "ok" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 201,
      });
    } else {
      return new Response(JSON.stringify({ status: "already exists" }), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 400,
    });
  }
});
