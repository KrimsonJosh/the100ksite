import { createClient } from "@supabase/supabase-js";

// Create a server-side Supabase client using the service role key.
// Fail fast with a descriptive error when required env vars are missing or left as placeholders.
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
    throw new Error(
        "Missing Supabase URL. Set `NEXT_PUBLIC_SUPABASE_URL` or `SUPABASE_URL` in your environment (.env.local)"
    );
}

if (!supabaseServiceKey || supabaseServiceKey === "your-service-role-key-here") {
    throw new Error(
        "Missing or placeholder `SUPABASE_SERVICE_ROLE_KEY`. Set the service role key from your Supabase project settings in `.env.local` as `SUPABASE_SERVICE_ROLE_KEY`"
    );
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey, {
    // Server-side usage; do not persist sessions
    auth: { persistSession: false },
});