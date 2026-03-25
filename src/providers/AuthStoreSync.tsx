"use client";

import { useAuth, useUser } from "@clerk/nextjs";
import { useEffect } from "react";

import { useAuthStore } from "@/state/useAuthStore";

const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export function AuthStoreSync() {
  const { isSignedIn } = useAuth();
  const { user: clerkUser } = useUser();
  const { setClerkAuth, setBackendToken, setUser, setIsLoading, setError } = useAuthStore();

  useEffect(() => {
    setClerkAuth({
      clerkUserId: clerkUser?.id ?? null,
      clerkEmail: clerkUser?.primaryEmailAddress?.emailAddress ?? null,
      isSignedIn: Boolean(isSignedIn),
    });
  }, [isSignedIn, setClerkAuth, clerkUser?.id, clerkUser?.primaryEmailAddress?.emailAddress]);

  // Sync Clerk user with backend
  useEffect(() => {
    if (!isSignedIn || !clerkUser?.primaryEmailAddress?.emailAddress) {
      setBackendToken(null);
      setUser(null);
      setError(null);
      return;
    }

    const syncWithBackend = async () => {
      try {
        setIsLoading(true);
        setError(null);

        // Try to restore from localStorage first
        const storedToken = localStorage.getItem("auth-store-token");
        const storedUser = localStorage.getItem("auth-store-user");

        if (storedToken && storedUser) {
          setBackendToken(storedToken);
          setUser(JSON.parse(storedUser));
          setIsLoading(false);
          return;
        }

        // Sync with backend using Clerk user data
        const response = await fetch(`${BACKEND_URL}/auth/sync-user`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: clerkUser.primaryEmailAddress.emailAddress,
            name: clerkUser.fullName || clerkUser.primaryEmailAddress.emailAddress.split("@")[0],
          }),
        });

        if (!response.ok) {
          throw new Error("Backend authentication failed");
        }

        const data = await response.json();
        if (data.success) {
          setBackendToken(data.token);
          setUser(data.user);
          localStorage.setItem("auth-store-token", data.token);
          localStorage.setItem("auth-store-user", JSON.stringify(data.user));
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
  }, [isSignedIn, clerkUser?.primaryEmailAddress?.emailAddress, clerkUser?.fullName, setBackendToken, setUser, setIsLoading, setError]);

  return null;
}
