const SUPABASE_URL_KEY = "NEXT_PUBLIC_SUPABASE_URL";
const SUPABASE_ANON_KEY_KEY = "NEXT_PUBLIC_SUPABASE_ANON_KEY";

// Default local Supabase values (used when running with Supabase CLI)
const LOCAL_SUPABASE_URL = "http://127.0.0.1:54321";
const LOCAL_SUPABASE_ANON_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0";

function getEnvVar(key: string, defaultValue?: string): string {
  const value = process.env[key];
  if (value) {
    return value;
  }
  if (defaultValue) {
    return defaultValue;
  }
  throw new Error(`Missing required environment variable: ${key}`);
}

export function getSupabaseUrl(): string {
  // Use local defaults in development
  const isDevelopment = process.env.NODE_ENV === "development";
  return getEnvVar(
    SUPABASE_URL_KEY,
    isDevelopment ? LOCAL_SUPABASE_URL : undefined
  );
}

export function getSupabaseAnonKey(): string {
  // Use local defaults in development
  const isDevelopment = process.env.NODE_ENV === "development";
  return getEnvVar(
    SUPABASE_ANON_KEY_KEY,
    isDevelopment ? LOCAL_SUPABASE_ANON_KEY : undefined
  );
}

export function validateSupabaseEnv(): void {
  getSupabaseUrl();
  getSupabaseAnonKey();
}
