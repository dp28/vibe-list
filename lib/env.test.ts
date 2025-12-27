import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { getSupabaseUrl, getSupabaseAnonKey, validateSupabaseEnv } from "./env";

describe("env", () => {
  const originalEnv = process.env;
  const originalNodeEnv = process.env.NODE_ENV;

  beforeEach(() => {
    vi.resetModules();
    process.env = { ...originalEnv };
    process.env.NODE_ENV = originalNodeEnv || "test";
  });

  afterEach(() => {
    process.env = originalEnv;
    process.env.NODE_ENV = originalNodeEnv;
  });

  describe("getSupabaseUrl", () => {
    it("returns the Supabase URL from environment", () => {
      const testUrl = "https://test.supabase.co";
      process.env.NEXT_PUBLIC_SUPABASE_URL = testUrl;

      expect(getSupabaseUrl()).toBe(testUrl);
    });

    it("uses local default in development mode when URL is missing", () => {
      delete process.env.NEXT_PUBLIC_SUPABASE_URL;
      process.env.NODE_ENV = "development";

      expect(getSupabaseUrl()).toBe("http://127.0.0.1:54321");
    });

    it("throws error when URL is missing in production", () => {
      delete process.env.NEXT_PUBLIC_SUPABASE_URL;
      process.env.NODE_ENV = "production";

      expect(() => getSupabaseUrl()).toThrow(
        "Missing required environment variable: NEXT_PUBLIC_SUPABASE_URL"
      );
    });
  });

  describe("getSupabaseAnonKey", () => {
    it("returns the Supabase anon key from environment", () => {
      const testKey = "test-anon-key";
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = testKey;

      expect(getSupabaseAnonKey()).toBe(testKey);
    });

    it("uses local default in development mode when key is missing", () => {
      delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      process.env.NODE_ENV = "development";

      const key = getSupabaseAnonKey();
      expect(key).toBe(
        "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZS1kZW1vIiwicm9sZSI6ImFub24iLCJleHAiOjE5ODM4MTI5OTZ9.CRXP1A7WOeoJeXxjNni43kdQwgnWNReilDMblYTn_I0"
      );
    });

    it("throws error when key is missing in production", () => {
      delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      process.env.NODE_ENV = "production";

      expect(() => getSupabaseAnonKey()).toThrow(
        "Missing required environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY"
      );
    });
  });

  describe("validateSupabaseEnv", () => {
    it("does not throw when all environment variables are present", () => {
      process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.supabase.co";
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-key";

      expect(() => validateSupabaseEnv()).not.toThrow();
    });

    it("does not throw in development mode with defaults", () => {
      delete process.env.NEXT_PUBLIC_SUPABASE_URL;
      delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      process.env.NODE_ENV = "development";

      expect(() => validateSupabaseEnv()).not.toThrow();
    });

    it("throws error when URL is missing in production", () => {
      delete process.env.NEXT_PUBLIC_SUPABASE_URL;
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "test-key";
      process.env.NODE_ENV = "production";

      expect(() => validateSupabaseEnv()).toThrow(
        "Missing required environment variable: NEXT_PUBLIC_SUPABASE_URL"
      );
    });

    it("throws error when anon key is missing in production", () => {
      process.env.NEXT_PUBLIC_SUPABASE_URL = "https://test.supabase.co";
      delete process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
      process.env.NODE_ENV = "production";

      expect(() => validateSupabaseEnv()).toThrow(
        "Missing required environment variable: NEXT_PUBLIC_SUPABASE_ANON_KEY"
      );
    });
  });
});
