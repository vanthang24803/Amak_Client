import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Role } from "./utils/role";
import jwt from "jsonwebtoken";

export const config = {
  runtime: "nodejs",
  matcher: ["/profile/:path*", "/dashboard/:path*", "/posts/:path*"],
};

export function middleware(request: NextRequest) {
  const token = request.cookies.get("ac_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const decodedToken = jwt.decode(token) as {
      [key: string]: any;
      Role: string[];
    };

    const roleArray = decodedToken[Role];

    if (
      request.nextUrl.pathname.startsWith("/dashboard") &&
      request.nextUrl.pathname.startsWith("/posts") &&
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
