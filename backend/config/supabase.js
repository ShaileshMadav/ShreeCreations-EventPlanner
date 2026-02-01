import dotenv from "dotenv";
dotenv.config(); // 👈 LOAD ENV HERE (IMPORTANT)

import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseKey) {
  console.error("SUPABASE_URL:", supabaseUrl);
  console.error(
    "SUPABASE_SERVICE_ROLE_KEY:",
    supabaseKey ? "LOADED" : "MISSING",
  );
  throw new Error("Supabase env variables missing");
}

const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
