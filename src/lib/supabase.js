import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL =
  import.meta.env.VITE_SUPABASE_URL ||
  "https://yeeflbcxicnxsoywtgzo.supabase.co";

const SUPABASE_ANON_KEY =
  import.meta.env.VITE_SUPABASE_ANON_KEY ||
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InllZWZsYmN4aWNueHNveXd0Z3pvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODkzNTkzNjMsImV4cCI6MjEwNDkzNTM2M30.GLWudCN-fXSiZVJn15jhmkBNvwQe8WXAmJUVoON1JmU";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});

export const isSupabaseConfigured = () => {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
};

export default supabase;

