import { auth } from "@/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const { pathname } = req.nextUrl;

  // Define your public routes (accessible without login)
  const publicRoutes = ["/signin", "/about", "/pricing", "/contact"];

  const isPublicRoute =
    publicRoutes.includes(pathname) || pathname.startsWith("/api/auth");

  // Redirect to signin if not logged in and trying to access protected route
  if (!isLoggedIn && !isPublicRoute) {
    const signInUrl = new URL("/signin", req.nextUrl.origin);
    // Preserve the page they were trying to access
    signInUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(signInUrl);
  }

  // Redirect to dashboard if logged in and trying to access signin page
  if (isLoggedIn && pathname === "/signin") {
    return NextResponse.redirect(new URL("/", req.nextUrl.origin));
  }

  return NextResponse.next();
});

// Add runtime config to use Node.js runtime instead of Edge
export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt|.*\\..*|_next).*)",
  ],
  // This is the important part - force Node.js runtime
  runtime: "nodejs",
};
