import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || '';

if (!supabaseUrl) {
  console.error('Supabase URL is missing');
}

if (!supabaseServiceKey) {
  console.error('Supabase service role key is missing');
}

// Create a Supabase client with service role powers for server-side operations
export const supabaseAdmin = createClient<Database>(
  supabaseUrl,
  supabaseServiceKey
); 