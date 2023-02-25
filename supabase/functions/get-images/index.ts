// Follow this setup guide to integrate the Deno language server with your editor:
// https://deno.land/manual/getting_started/setup_your_environment
// This enables autocomplete, go to definition, etc.
import { corsHeaders } from "./../_shared/corst.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import type { Database } from "../../../types/database.types.ts";
console.log("Hello from Functions!");

serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", {
      headers: { ...corsHeaders },
      status: 200,
    });
  }
  try {
    // Create a Supabase client with the Auth context of the logged in user.
    const supabaseClient = createClient<Database>(
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

    const { uuid } = await req.json();

    if (!user) {
      const { data, error } = await supabaseClient
        .from("image_links")
        .select("link, width, height")
        .eq("image", uuid)
        .or("height.eq.1280,width.eq.1280,width.eq.1920,height.eq.1920")
        .order("height", { ascending: true })
        .order("width", { ascending: true })
        .limit(2);

      if (error) {
        throw error;
      }

      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
        status: 200,
      });
    }

    // query the customers table to see if the user already has a customer
    const { data: customers, error: customerError } = await supabaseClient
      .from("customers")
      .select("*")
      .eq("email", user.email)
      .limit(1);

    if (customerError) {
      console.error(customerError);
      throw customerError;
    }

    let isActive = false;

    if (customers.length > 0) {
      // check to see if their subscription is active
      // if their last paid was greater than 31 days ago, they are not active
      const { expire_date } = customers[0];
      const expireDate = new Date(expire_date);
      const now = new Date();
      isActive = expireDate >= now;
    }

    let or = "height.eq.1280,width.eq.1280,width.eq.1920,height.eq.1920";
    if (isActive) {
      or += ",height.eq.2560,width.eq.2560,height.eq.3840,width.eq.3840";
    }

    const { data, error } = await supabaseClient
      .from("image_links")
      .select("link, width, height")
      .eq("image", uuid)
      .or(or)
      .order("height", { ascending: true })
      .order("width", { ascending: true })
      .limit(4);

    if (error) {
      throw error;
    }

    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
      status: 200,
    });
  } catch (error) {
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
