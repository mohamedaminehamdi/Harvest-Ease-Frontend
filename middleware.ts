import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/",
  "/sign-in(.*)",
  "/sign-up(.*)",
  "/api/public(.*)",
]);

const isProtectedRoute = createRouteMatcher([
  "/dashboard(.*)",
  "/settings(.*)",
  "/forum(.*)",
  "/scheduler(.*)",
  "/resources(.*)",
  "/health(.*)",
  "/api/protected(.*)",
]);

const isAdminRoute = createRouteMatcher([
  "/admin(.*)",
  "/api/admin(.*)",
]);

export default clerkMiddleware(async (auth, req) => {
  const path = req.nextUrl.pathname;

  // Redirect signed-in users away from auth pages
  if (isPublicRoute(req)) {
    const { userId } = await auth();
    if (userId && (path === "/sign-in" || path === "/sign-up" || path === "/")) {
      return Response.redirect(new URL("/dashboard", req.url));
    }
  }

  // Protect dashboard, settings, and feature routes
  if (isProtectedRoute(req)) {
    const { userId } = await auth.protect();
    
    // For API routes, verify auth token exists
    if (path.startsWith("/api/protected")) {
      const authHeader = req.headers.get("authorization");
      const token = authHeader?.replace("Bearer ", "");
      
      if (!token) {
        return NextResponse.json(
          { success: false, message: "Unauthorized" },
          { status: 401 }
        );
      }
    }
  }

  // Protect admin routes with role verification
  if (isAdminRoute(req)) {
    const { userId, sessionClaims } = await auth.protect();
    
    if (!userId) {
      return NextResponse.redirect(new URL("/sign-in", req.url));
    }
    
    const userRole = sessionClaims?.metadata?.role || "farmer";
    if (userRole !== "admin" && userRole !== "expert") {
      return NextResponse.redirect(new URL("/dashboard", req.url));
    }
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};
