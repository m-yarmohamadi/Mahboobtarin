import Header from "@/components/Header";
import Desktop from "@/components/product/Desktop";
import Mobile from "@/components/product/Mobile";
import http from "@/services/httpService";
import Loading from "@/tools/Loading";
import { useEffect, useState } from "react";

export default function product({ productData }) {
    const [isLoading, setIsLoading] = useState(true);
    console.log(productData);
    
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
            <Mobile product={productData.data} relatedProducts={productData.relatedproducts} />
            <Desktop product={productData.data} relatedProducts={productData.relatedproducts} />
        </>
    )
}


export async function getServerSideProps(ctx) {
    const { query, req } = ctx;

    try {
        const { data } = await http.get(`/api/v1/product/${query.id}`);

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
