import Header from "@/components/Header";
import Desktop from "@/components/product/Desktop";
import Mobile from "@/components/product/Mobile";
import http from "@/services/httpService";
import Loading from "@/tools/Loading";
import { useEffect, useState } from "react";

export default function product({ productData }) {
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);


    if (isLoading) return (
        <div className="w-full h-screen flex items-center justify-center">
            <Loading customeColor="#0693a4" />
        </div>
    )

    return (
        <>
            <Header />
            <Mobile product={productData} />
            <Desktop product={productData} />
        </>
    )
}


export async function getServerSideProps(ctx) {
    const { query, req } = ctx;

    try {
        const { data: { data } } = await http.get(`/api/v1/product/${query.id}`);

        if (!data) {
            return {
                notFound: true,
            };
        }

        return {
            props: {
                productData: data,
            },
        };
    } catch (error) {
        return {
            notFound: true,
        };
    }
}
