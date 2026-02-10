/**
 * Supabase Client Configuration
 * Creates and exports the Supabase client for frontend usage.
 */
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Type-safe database types (generate with Supabase CLI)
 * Run: npx supabase gen types typescript --project-id YOUR_PROJECT_ID > src/lib/database.types.ts
 */
