import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import type { Session } from "@supabase/supabase-js";
import Home from "./page";
import { AuthProvider } from "@/lib/authContext";

vi.mock("@/lib/supabaseClient", () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } },
      })),
    },
  },
}));

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
}));

describe("Home", () => {
  beforeEach(async () => {
    const { supabase } = await import("@/lib/supabaseClient");
    const mockGetSession = vi.mocked(supabase.auth.getSession);
    const mockUser = { id: "user-123", email: "test@example.com" };
    const mockSession = {
      user: mockUser,
      access_token: "token",
    } as Session;
    mockGetSession.mockResolvedValue({
      data: { session: mockSession },
      error: null,
    });
  });

  it("renders the homepage when authenticated", async () => {
    render(
      <AuthProvider>
        <Home />
      </AuthProvider>
    );
    await waitFor(() => {
      expect(screen.getByText("Vibe List")).toBeInTheDocument();
    });
    expect(
      screen.getByText("Shared shopping list web app")
    ).toBeInTheDocument();
  });
});
