import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://placeholder-url.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'placeholder-anon-key';

export const isSupabaseConfigured = (): boolean => {
  return (
    Boolean(import.meta.env.VITE_SUPABASE_URL) &&
    Boolean(import.meta.env.VITE_SUPABASE_ANON_KEY) &&
    !import.meta.env.VITE_SUPABASE_URL.includes('placeholder')
  );
};

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
  },
});

export interface SupabaseHealthReport {
  isConfigured: boolean;
  maskedUrl: string | null;
  status: 'connected' | 'not_configured' | 'tables_missing' | 'error';
  message: string;
  tableNameTested?: string;
  rowCount?: number;
}

export async function checkSupabaseConnection(): Promise<SupabaseHealthReport> {
  if (!isSupabaseConfigured()) {
    return {
      isConfigured: false,
      maskedUrl: null,
      status: 'not_configured',
      message: 'VITE_SUPABASE_URL or VITE_SUPABASE_ANON_KEY environment variables are missing in this build.',
    };
  }

  // Mask the URL for safe display
  let maskedUrl = 'Configured';
  try {
    const parsed = new URL(supabaseUrl);
    maskedUrl = parsed.origin;
  } catch {
    maskedUrl = 'Valid URL';
  }

  try {
    // Attempt pinging exercises table
    const { data, error, count } = await supabase
      .from('exercises')
      .select('id', { count: 'exact' })
      .limit(1);

    if (error) {
      if (error.code === '42P01' || error.message?.includes('relation "exercises" does not exist')) {
        return {
          isConfigured: true,
          maskedUrl,
          status: 'tables_missing',
          message:
            'Connected to Supabase, but database tables do not exist yet. Run the SQL file in supabase/migrations/ via your Supabase SQL Editor.',
        };
      }
      return {
        isConfigured: true,
        maskedUrl,
        status: 'error',
        message: `Supabase returned an error: ${error.message} (Code: ${error.code || 'unknown'})`,
      };
    }

    return {
      isConfigured: true,
      maskedUrl,
      status: 'connected',
      message: `Successfully connected to Supabase database! Found active table "exercises".`,
      tableNameTested: 'exercises',
      rowCount: count ?? data?.length ?? 0,
    };
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : String(err);
    return {
      isConfigured: true,
      maskedUrl,
      status: 'error',
      message: `Failed to reach Supabase: ${errorMsg}`,
    };
  }
}
