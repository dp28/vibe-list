import { describe, it, expect, vi, beforeEach } from "vitest";
import { signInWithGoogle, signOut } from "./authActions";

vi.mock("./supabaseClient", () => ({
  supabase: {
    auth: {
      signInWithOAuth: vi.fn(),
      signOut: vi.fn(),
    },
  },
}));

describe("authActions", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe("signInWithGoogle", () => {
    it("calls Supabase signInWithOAuth with Google provider", async () => {
      const { supabase } = await import("./supabaseClient");
      const mockSignIn = vi.mocked(supabase.auth.signInWithOAuth);
      mockSignIn.mockResolvedValue({ data: {}, error: null });

      const origin = "https://example.com";
      Object.defineProperty(window, "location", {
        value: { origin },
        writable: true,
      });

      await signInWithGoogle();

      expect(mockSignIn).toHaveBeenCalledWith({
        provider: "google",
        options: {
          redirectTo: `${origin}/auth/callback`,
        },
      });
    });

    it("throws error if sign in fails", async () => {
      const { supabase } = await import("./supabaseClient");
      const mockSignIn = vi.mocked(supabase.auth.signInWithOAuth);
      const error = new Error("Sign in failed");
      mockSignIn.mockResolvedValue({ data: {}, error });

      await expect(signInWithGoogle()).rejects.toThrow("Sign in failed");
    });
  });

  describe("signOut", () => {
    it("calls Supabase signOut", async () => {
      const { supabase } = await import("./supabaseClient");
      const mockSignOut = vi.mocked(supabase.auth.signOut);
      mockSignOut.mockResolvedValue({ error: null });

      await signOut();

      expect(mockSignOut).toHaveBeenCalled();
    });

    it("throws error if sign out fails", async () => {
      const { supabase } = await import("./supabaseClient");
      const mockSignOut = vi.mocked(supabase.auth.signOut);
      const error = new Error("Sign out failed");
      mockSignOut.mockResolvedValue({ error });

      await expect(signOut()).rejects.toThrow("Sign out failed");
    });
  });
});
