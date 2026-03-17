import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error("DEBUG: Faltan variables de entorno para Supabase en supabaseClient.js");
  console.log("CWD:", process.cwd());
  process.exit(1);
}

// Usamos la Service Role Key para saltar RLS desde el servidor
export const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});
