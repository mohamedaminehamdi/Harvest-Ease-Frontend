"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect } from "react";

import { useAuthStore } from "@/state/useAuthStore";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export function AuthStoreSync() {
  const { isLoaded, isSignedIn, getToken } = useAuth();
  const { user: clerkUser } = useUser();
  const { setClerkAuth, setBackendToken, setUser, setIsLoading, setError, resetAuth } = useAuthStore();

  useEffect(() => {
    setClerkAuth({
      clerkUserId: clerkUser?.id ?? null,
      clerkEmail: clerkUser?.primaryEmailAddress?.emailAddress ?? null,
      isSignedIn: Boolean(isSignedIn),
    });
  }, [isSignedIn, setClerkAuth, clerkUser?.id, clerkUser?.primaryEmailAddress?.emailAddress]);

  // Sync Clerk user with backend
  useEffect(() => {
    if (!isLoaded) return;

    const email = clerkUser?.primaryEmailAddress?.emailAddress;
    if (!isSignedIn || !email) {
      resetAuth();
      return;
    }

    // Reuse the persisted session only if it belongs to the signed-in Clerk user
    const { backendToken, user } = useAuthStore.getState();
    if (backendToken && user?.email === email) return;

    const syncWithBackend = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Send the Clerk session JWT so the backend can verify who is signing in
        const clerkToken = await getToken();
        const response = await fetch(`${BACKEND_URL}/auth/sync-user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${clerkToken}`,
          },
          body: JSON.stringify({
            email,
            name: clerkUser.fullName || email.split("@")[0],
          }),
        });

        if (!response.ok) {
          throw new Error("Backend authentication failed");
        }

        const data = await response.json();
        if (data.success) {
          setBackendToken(data.token);
          setUser(data.user);
        } else {
          setError(data.message || "Authentication failed");
        }
      } catch (error) {
        console.error("Auth sync error:", error);
        setError(error instanceof Error ? error.message : "Authentication failed");
      } finally {
        setIsLoading(false);
      }
    };

    syncWithBackend();
  }, [isLoaded, isSignedIn, getToken, clerkUser?.primaryEmailAddress?.emailAddress, clerkUser?.fullName, setBackendToken, setUser, setIsLoading, setError, resetAuth]);

  return null;
}
