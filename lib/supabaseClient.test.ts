import { describe, it, expect, vi } from "vitest";

const mockUrl = "https://test.supabase.co";
const mockKey = "test-anon-key";

vi.mock("./env", () => ({
  getSupabaseUrl: vi.fn(() => mockUrl),
  getSupabaseAnonKey: vi.fn(() => mockKey),
}));

describe("createSupabaseClient", () => {
  it("creates a Supabase client with environment variables", async () => {
    const { createSupabaseClient } = await import("./supabaseClient");
    const env = await import("./env");

    const client = createSupabaseClient();

    expect(client).toBeDefined();
    expect(env.getSupabaseUrl).toHaveBeenCalled();
    expect(env.getSupabaseAnonKey).toHaveBeenCalled();
  });
});
