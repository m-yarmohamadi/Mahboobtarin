import { NextResponse } from "next/server";

export async function middleware(req){
    const url = req.url;
    const pathname = req.nextUrl.pathname;

    if(pathname.startsWith("/profile")) {
        // if(!user) return NextResponse.redirect(new URL("/auth", url));
    }
}

export const config = {
    matcher : ["/admin/:path*", "/profile/:path*", "/users/:path*"]
}