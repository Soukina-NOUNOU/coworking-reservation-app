import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { NextResponse } from "next/server";

const isPublicRoute = createRouteMatcher([
  "/", // HomePage
  "/spaces(.*)", // all spaces routes are public (pages)
  "/sign-in(.*)", // Clerk sign-in
  "/sign-up(.*)", // Clerk sign-up
  "/verify-email", // email verification page
  "/unauthorized", // 401 page
  "/forbidden", // 403 page
  "/server-error", // 500 page
]);

const isAdminRoute = createRouteMatcher([
  "/admin(.*)", // Admin routes
]);

export default clerkMiddleware(async (auth, req) => {
  // If the route is public, allow access without authentication
  if (isPublicRoute(req)) {
    return;
  }

  // For protected routes, check authentication
  const { userId } = await auth();
  
  // If the user is not authenticated, redirect to unauthorized page
  if (!userId) {
    return NextResponse.redirect(new URL('/unauthorized', req.url));
  }

  // For admin routes, additional checks can be added here if needed
  if (isAdminRoute(req)) {
    // Additional admin validation could be added here
    // For now, i let the page component handle admin role verification
  }
  
  // If authenticated, allow access
  return;
});

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    // Always run for API routes
    '/(api|trpc)(.*)',
  ],
};
