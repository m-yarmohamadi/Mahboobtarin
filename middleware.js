import { NextResponse } from "next/server";

export async function middleware(req) {
  const url = req.url;
  const pathname = req.nextUrl.pathname;
  const cookie = `Bearer ${req.cookies.get("accessToken")?.value}`;
  const API_URL = "https://mahboobtarin.mostafaomrani.ir/api/v1/user";
  let isAuth;
  let userRole;

  if (pathname.startsWith("/profile")) {
    let expertData;

    await fetch(
      `https://mahboobtarin.mostafaomrani.ir/api/v1/users/expertise/list/${
        pathname.split("/")[2]
      }`,
      {
        headers: {
          Authorization: cookie,
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data && data?.message !== "User not found") {
          expertData = data;
        }
      })
      .catch((error) => {
        if (error) expertData = null;
      });

    if (!expertData) return NextResponse.redirect(new URL("/", url));
  }

  if (pathname.startsWith("/admin")) {
    await fetch(API_URL, {
      headers: {
        Authorization: cookie,
      },
    })
      .then((res) => res.json())
      .then(({ user }) => {
        if (user) {
          isAuth = true;
          userRole = user.type;
        }
      })
      .catch((error) => {
        if (error) isAuth = false;
      });

    if (!isAuth) return NextResponse.redirect(new URL("/auth", url));
    if (isAuth && userRole !== "motekhases") {
      return NextResponse.redirect(new URL("/", url));
    }
  }

  if (pathname.startsWith("/user")) {
    await fetch(API_URL, {
      headers: {
        Authorization: cookie,
      },
    })
      .then((res) => res.json())
      .then(({ user }) => {
        if (user) {
          isAuth = true;
          userRole = user.type;
        }
      })
      .catch((error) => {
        if (error) isAuth = false;
      });

    if (!isAuth) return NextResponse.redirect(new URL("/auth", url));
    if (isAuth && userRole !== "user") {
      return NextResponse.redirect(new URL("/", url));
    }
  }

  if (pathname.startsWith("/auth")) {
    await fetch(API_URL, {
      headers: {
        Authorization: cookie,
      },
    })
      .then((res) => res.json())
      .then(({ user }) => {
        if (user) isAuth = true;
      })
      .catch((error) => {
        if (error) isAuth = false;
      });

    if (isAuth) return NextResponse.redirect(new URL("/admin/dashboard", url));
  }
}

export const config = {
  matcher: ["/admin/:path*", "/profile/:path*", "/auth", "/user/:path*"],
};
