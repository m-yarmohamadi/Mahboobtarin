import Header from "@/components/Header";
import Head from "next/head";
import { useParams } from "next/navigation"

export default function LinkdoniPage() {
    const params = useParams();
    console.log(params);

    return (
        <>
            <Header />
            
        </>
    )
}
