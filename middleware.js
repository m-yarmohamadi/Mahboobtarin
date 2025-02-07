import { NextResponse } from "next/server";

export async function middleware(req) {
  const url = req.url;
  const pathname = req.nextUrl.pathname;
  const cookie = `Bearer ${req.cookies.get("accessToken")?.value}`;
  const API_URL = "https://api.mahbubtarin.com//api/v1/user";
  let isAuth;
  let userRole;
  let userLevel = null;

  try {
    const res = await fetch(API_URL, {
      headers: { Authorization: cookie },
    });
    const { user } = await res.json();

    if (user) {
      isAuth = true;
      userRole = user.type;
      userLevel = user.user_level;
    }
  } catch (error) {
    isAuth = false;
  }

  const accessControl = {
    Bronze: [
      "chats",
      "orders",
      "requests_client",
      "calling",
      "services",
      "products",
      "academy",
      "gallery",
      "linkdin",
      "comments",
    ],
    Silver: ["calling", "gallery", "linkdin"],
    Gold: [],
  };

  if (pathname.startsWith("/admin")) {
    if (!isAuth) return NextResponse.redirect(new URL("/auth", url));
    if (isAuth && userRole !== "motekhases") {
      return NextResponse.redirect(new URL("/", url));
    }

    if (
      accessControl[userLevel].some((path) =>
        pathname.startsWith(`/admin/${path}`)
      )
    ) {
      return NextResponse.redirect(new URL("/admin/dashboard", url));
    }
  }

  if (pathname.startsWith("/user")) {
    if (!isAuth) return NextResponse.redirect(new URL("/auth", url));
    if (isAuth && userRole !== "user") {
      return NextResponse.redirect(new URL("/", url));
    }
  }

  if (pathname.startsWith("/auth")) {
    if (isAuth) return NextResponse.redirect(new URL("/admin/dashboard", url));
  }

  if (pathname.startsWith("/checkout")) {
    if (!req.nextUrl.searchParams.get("Authority")) {
      return NextResponse.redirect(new URL("/", url));
    }
  }
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/profile/:path*",
    "/auth",
    "/user/:path*",
    "/checkout",
  ],
};
