import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

const isPublicRoute = createRouteMatcher([
  "/", // HomePage
  "/spaces(.*)", // all spaces routes are public (pages)
  "/sign-in(.*)", // Clerk sign-in
  "/sign-up(.*)", // Clerk sign-up
  "/verify-email", // email verification page
]);

export default clerkMiddleware(async (auth, req) => {
  // If the route is public, allow access without authentication
  if (isPublicRoute(req)) {
    return;
  }

  // For protected routes, check authentication
  const { userId } = await auth();
  
  // If the user is not authenticated, redirect to sign-in
  if (!userId) {
    const { redirectToSignIn } = await auth();
    return redirectToSignIn();
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
