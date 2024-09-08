import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import jwt from "jsonwebtoken";

export const config = {
  runtime: "nodejs",
  matcher: ["/profile/:path*", "/dashboard/:path*", "/new-post"],
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get("ac_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const decodedToken = jwt.decode(token) as {
      [key: string]: any;
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role": string[];
    };

    const roleArray =
      decodedToken[
        "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
      ];

    if (
      request.nextUrl.pathname.startsWith("/dashboard") &&
      !roleArray.includes("ADMIN")
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch (error) {
    console.error("Token decoding failed:", error);
    return NextResponse.redirect(new URL("/", request.url));
  }

  return NextResponse.next();
}
