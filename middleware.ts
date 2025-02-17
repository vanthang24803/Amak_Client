import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { Role } from "./utils/role";
import * as JWT from "jose";

export const config = {
  runtime: "nodejs",
  matcher: ["/profile/:path*", "/dashboard/:path*", "/posts/:path*"],
};

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("ac_token")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  try {
    const decodedToken = JWT.decodeJwt(token) as {
      [key: string]: any;
      Role: string[];
    };

    const roleArray = decodedToken[Role];

    if (
      (request.nextUrl.pathname.startsWith("/dashboard") ||
        request.nextUrl.pathname.startsWith("/posts")) &&
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
