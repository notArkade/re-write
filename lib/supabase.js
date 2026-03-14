import { createClient } from "@supabase/supabase-js";

const supabaseUrl = (
  process.env.SUPABASE_URL || "https://placeholder.supabase.co"
).trim();
const supabaseAnonKey = (process.env.SUPABASE_ANON_KEY || "placeholder").trim();

if (!process.env.SUPABASE_URL || !process.env.SUPABASE_ANON_KEY) {
  console.warn("Missing Supabase environment variables");
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
