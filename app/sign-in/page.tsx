"use client";

import { useState } from "react";
import { signInWithGoogle } from "@/lib/authActions";

export default function SignInPage() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSignIn() {
    setLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to sign in");
      setLoading(false);
    }
  }

  return (
    <main>
      <h1>Sign In</h1>
      <p>Sign in with Google to access your shopping lists</p>
      {error && <p role="alert">Error: {error}</p>}
      <button onClick={handleSignIn} disabled={loading}>
        {loading ? "Signing in..." : "Sign in with Google"}
      </button>
    </main>
  );
}
