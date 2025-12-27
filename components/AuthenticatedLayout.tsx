"use client";

import { useAuth } from "@/lib/authContext";
import { signOut } from "@/lib/authActions";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export function AuthenticatedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading, error } = useAuth();
  const router = useRouter();
  const [signingOut, setSigningOut] = useState(false);

  useEffect(() => {
    if (!loading && !user && !error) {
      router.push("/sign-in");
    }
  }, [user, loading, error, router]);

  async function handleSignOut() {
    setSigningOut(true);
    try {
      await signOut();
      router.push("/sign-in");
    } catch {
      setSigningOut(false);
    }
  }

  if (loading) {
    return (
      <main>
        <p>Loading...</p>
      </main>
    );
  }

  if (error) {
    return (
      <main>
        <p role="alert">Error: {error.message}</p>
      </main>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <>
      <header>
        <nav>
          <button onClick={handleSignOut} disabled={signingOut}>
            {signingOut ? "Signing out..." : "Sign out"}
          </button>
        </nav>
      </header>
      {children}
    </>
  );
}
