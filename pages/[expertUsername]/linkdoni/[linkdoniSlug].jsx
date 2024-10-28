import Header from "@/components/Header";
import Loading from "@/tools/Loading";
import Head from "next/head";
import { useSearchParams } from "next/navigation"
import { useEffect, useState } from "react";

export default function LinkdoniPage() {
    const searchParams = useSearchParams();
    const targetUrl = searchParams.get("url");
    const [isLoading, setIsLoading] = useState(true);

    const formatUrl = (url) => {
        const protocolRegex = /^(http:\/\/|https:\/\/)/;
        return protocolRegex.test(url) ? url : `https://${url}`;
    };

    useEffect(()=>{
        setIsLoading(false);
    }, [])

    if(isLoading){
        <div className="w-full h-screen flex items-center justify-center">
            <Loading />
        </div>
    }

    return (
        <div className="relative h-screen">
            <Header />
            <iframe 
                src={formatUrl(targetUrl)} 
                className="absolute top-[53px] lg:top-[68px] left-0 w-full h-[calc(100vh-53px)] lg:h-[calc(100vh-68px)]  border-none"
                title="Website Display" 
            />
        </div>
    )
}
