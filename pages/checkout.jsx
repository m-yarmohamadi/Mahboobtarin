import { FailedVerify, SuccessVerify } from "@/components/cart/Verfiy";
import Header from "@/components/Header";
import useProfile from "@/hooks/useProfile";
import { verifyShopApi } from "@/services/paymentService";
import Loading from "@/tools/Loading";
import { useMutation } from "@tanstack/react-query";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { FiCheckCircle } from "react-icons/fi";

export default function Checkout() {
    const { user, isLoading } = useProfile();
    const { mutateAsync: mutateVerify, isPending } = useMutation({ mutationFn: verifyShopApi });
    const searchParams = useSearchParams();
    const router = useRouter();
    const authority = searchParams.get("Authority");
    const [result, setResult] = useState();

    useEffect(() => {
        async function verifyPaymentHandler() {
            try {
                const { data } = await mutateVerify({ gateway: "zarinpal", authority });
                if (data) {
                    setResult({ status: 200, message: data?.message?.[0] });
                }
            } catch (error) {
                setResult({ status: 500, message: error?.response?.data?.message?.[0] || "خطایی رخ داده است" });
            }
        }

        if (authority) {
            verifyPaymentHandler();
        }
    }, [authority]);

    useEffect(() => {
        if (!isLoading && !user) {
            router.replace("/");
        }
    }, [isLoading, user])

    return (
        <div className="w-full">
            <Header />
            {
                result && user ?
                    result.status === 200 ?
                        <SuccessVerify msg={result.message} />
                        :
                        <FailedVerify msg={result.message} />
                    :
                    <div className="w-full fixed top-1/2 -translate-y-1/2 right-0 h-screen flex flex-col items-center justify-center">
                        <Loading />
                    </div>
            }
        </div>
    )
}
