import { authMiddleware, redirectToSignIn } from "@clerk/nextjs";
import { NextResponse } from "next/server";
 
// See https://clerk.com/docs/references/nextjs/auth-middleware
// for more information about configuring your Middleware
export default authMiddleware({
  // Allow signed out users to access the specified routes:
  publicRoutes: ['/'],
  afterAuth(auth, req) {
    // If the user is authenticated and it's a public route
    if (auth.userId && auth.isPublicRoute) {
        let path = "/select-org"; // Default path for authenticated users with access to public routes

        // If the user is associated with an organization
        if (auth.orgId) {
            path = `/organization/${auth.orgId}`; // Set the path to the organization page
        }

        // Construct the URL for redirection
        const orgSelection = new URL(path, req.url);
        
        // Redirect to the constructed URL
        return NextResponse.redirect(orgSelection);
    }

    // If the user is not authenticated and it's not a public route
    if (!auth.userId && !auth.isPublicRoute) {
        // Redirect to the sign-in page with the returnBackUrl parameter set to the current URL
        return redirectToSignIn({ returnBackUrl: req.url });
    }

    // If the user is authenticated but not associated with any organization and not on the organization selection page
    if (auth.userId && !auth.orgId && req.nextUrl.pathname !== "/select-org") {
        // Redirect to the organization selection page
        const orgSelection = new URL("/select-org", req.url);
        return NextResponse.redirect(orgSelection);
    }
}
});
 
export const config = {
  matcher: [
    // Exclude files with a "." followed by an extension, which are typically static files.
    // Exclude files in the _next directory, which are Next.js internals.
    "/((?!.+\\.[\\w]+$|_next).*)",
    // Re-include any files in the api or trpc folders that might have an extension
    "/(api|trpc)(.*)"
  ]
};