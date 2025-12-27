import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import type { Session } from "@supabase/supabase-js";
import { AuthProvider, useAuth } from "./authContext";

vi.mock("./supabaseClient", () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } },
      })),
    },
  },
}));

function TestComponent() {
  const { user, session, loading, error } = useAuth();
  return (
    <div>
      <div data-testid="loading">{loading ? "loading" : "not-loading"}</div>
      <div data-testid="user">{user ? user.id : "no-user"}</div>
      <div data-testid="session">{session ? "has-session" : "no-session"}</div>
      <div data-testid="error">{error ? error.message : "no-error"}</div>
    </div>
  );
}

describe("AuthProvider", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("provides loading state initially", async () => {
    const { supabase } = await import("./supabaseClient");
    const mockGetSession = vi.mocked(supabase.auth.getSession);
    mockGetSession.mockImplementation(
      () =>
        new Promise(() => {
          // Never resolves to keep loading state
        })
    );

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByTestId("loading")).toHaveTextContent("loading");
  });

  it("provides user and session when authenticated", async () => {
    const { supabase } = await import("./supabaseClient");
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
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("not-loading");
    });

    expect(screen.getByTestId("user")).toHaveTextContent("user-123");
    expect(screen.getByTestId("session")).toHaveTextContent("has-session");
  });

  it("provides null user when not authenticated", async () => {
    const { supabase } = await import("./supabaseClient");
    const mockGetSession = vi.mocked(supabase.auth.getSession);
    mockGetSession.mockResolvedValue({
      data: { session: null },
      error: null,
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("not-loading");
    });

    expect(screen.getByTestId("user")).toHaveTextContent("no-user");
    expect(screen.getByTestId("session")).toHaveTextContent("no-session");
  });

  it("provides error when session fetch fails", async () => {
    const { supabase } = await import("./supabaseClient");
    const mockGetSession = vi.mocked(supabase.auth.getSession);
    const error = new Error("Session fetch failed");
    mockGetSession.mockResolvedValue({
      data: { session: null },
      error,
    });

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByTestId("loading")).toHaveTextContent("not-loading");
    });

    expect(screen.getByTestId("error")).toHaveTextContent(
      "Session fetch failed"
    );
  });

  it("throws error when useAuth is used outside provider", () => {
    const consoleError = vi
      .spyOn(console, "error")
      .mockImplementation(() => {});
    expect(() => {
      render(<TestComponent />);
    }).toThrow("useAuth must be used within an AuthProvider");
    consoleError.mockRestore();
  });
});
