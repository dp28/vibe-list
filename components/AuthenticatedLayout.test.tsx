import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import type { Session } from "@supabase/supabase-js";
import { AuthenticatedLayout } from "./AuthenticatedLayout";
import { AuthProvider } from "@/lib/authContext";

vi.mock("@/lib/supabaseClient", () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } },
      })),
      signOut: vi.fn(),
    },
  },
}));

const mockPush = vi.fn();
vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: mockPush,
  }),
}));

describe("AuthenticatedLayout", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    mockPush.mockClear();
  });

  it("shows loading state while auth initialises", async () => {
    const { supabase } = await import("@/lib/supabaseClient");
    const mockGetSession = vi.mocked(supabase.auth.getSession);
    mockGetSession.mockImplementation(
      () =>
        new Promise(() => {
          // Never resolves to keep loading state
        })
    );

    render(
      <AuthProvider>
        <AuthenticatedLayout>
          <div>Protected content</div>
        </AuthenticatedLayout>
      </AuthProvider>
    );

    expect(screen.getByText("Loading...")).toBeInTheDocument();
  });

  it("shows error state when auth fails", async () => {
    const { supabase } = await import("@/lib/supabaseClient");
    const mockGetSession = vi.mocked(supabase.auth.getSession);
    const error = new Error("Auth failed");
    mockGetSession.mockResolvedValue({
      data: { session: null },
      error,
    });

    render(
      <AuthProvider>
        <AuthenticatedLayout>
          <div>Protected content</div>
        </AuthenticatedLayout>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Error: Auth failed/)).toBeInTheDocument();
    });
  });

  it("renders children when authenticated", async () => {
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

    render(
      <AuthProvider>
        <AuthenticatedLayout>
          <div>Protected content</div>
        </AuthenticatedLayout>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText("Protected content")).toBeInTheDocument();
    });
  });

  it("redirects to sign-in when not authenticated", async () => {
    mockPush.mockClear();
    const { supabase } = await import("@/lib/supabaseClient");
    const mockGetSession = vi.mocked(supabase.auth.getSession);
    mockGetSession.mockResolvedValue({
      data: { session: null },
      error: null,
    });

    render(
      <AuthProvider>
        <AuthenticatedLayout>
          <div>Protected content</div>
        </AuthenticatedLayout>
      </AuthProvider>
    );

    await waitFor(() => {
      expect(mockPush).toHaveBeenCalledWith("/sign-in");
    });
  });
});
