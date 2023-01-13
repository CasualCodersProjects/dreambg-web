import { createClient } from "@supabase/supabase-js";
import type { Database } from "@/types/database.types";
const supabaseUrl = "https://zvzfhpnaemagutabottd.supabase.co";
const supabaseAnonKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inp2emZocG5hZW1hZ3V0YWJvdHRkIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjM4ODgwMjgsImV4cCI6MTk3OTQ2NDAyOH0.5S7C_OvTNeMWYk8XIUGEUr6RaurT7rnoBeG_NdSGJVM";

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);
