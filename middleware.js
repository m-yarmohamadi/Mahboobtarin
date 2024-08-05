import { NextResponse } from "next/server";

export async function middleware(req){
    const url = req.url;
    const pathname = req.nextUrl.pathname;
    const cookie = `Bearer ${req.cookies.get("accessToken")?.value}`;
    const API_URL = 'https://mahboobtarin.mostafaomrani.ir/api/v1/user';
    let isAuth;
    
    if(pathname.startsWith("/profile") || pathname.startsWith("/admin")) {
        await fetch(API_URL, {
            headers:{
                'Authorization':cookie 
            }
        })
        .then((res) => res.json())
        .then(({user}) => {
            if(user) isAuth = true;
        })
        .catch((error) => {
            if(error) isAuth = false;
        })

        if(!isAuth) return NextResponse.redirect(new URL("/auth", url));
    }

    if(pathname.startsWith("/auth")) {
        await fetch(API_URL, {
            headers:{
                'Authorization':cookie 
            }
        })
        .then((res) => res.json())
        .then(({user}) => {
            if(user) isAuth = true;
        })
        .catch((error) => {
            if(error) isAuth = false;
        })

        if(isAuth) return NextResponse.redirect(new URL("/admin/dashboard", url));
    }
}

export const config = {
    matcher : ["/admin/:path*", "/profile/:path*", "/auth"]
}