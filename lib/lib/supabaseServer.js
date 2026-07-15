import { createClient } from '@supabase/supabase-js';

// This client uses the service_role key, which has full database access.
// It must ONLY ever be imported into server-side code (API routes),
// never into a client component - that key should never reach the browser.
export function getSupabaseServerClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!url || !key) {
    throw new Error('Missing Supabase environment variables. Check Vercel project settings.');
  }
  return createClient(url, key);
}
