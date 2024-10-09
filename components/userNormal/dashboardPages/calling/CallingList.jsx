import Link from "next/link";
import CallingItem from "./CallingItem";
import { useGetRequests } from "@/hooks/useDashboard";
import Loading from "@/tools/Loading";

export default function CallingList() {
    const { requests, isGetRequests } = useGetRequests();

    if (isGetRequests) return (
        <div className='w-full h-full flex items-center justify-center'>
            <Loading customeColor="#0693a4" />
        </div>
    )

    return (
        <div className='flex flex-col justify-between items-center w-full h-full'>
            <div className='w-full pb-8'>
                <div className='w-full flex items-end justify-between mb-7 pb-4 border-b border-b-slate-300'>
                    <div className='text-xl text-gray-800 font-semibold'>فراخوان ها</div>
                    <Link href={'/user/calling/create'} className="btn btn--primary">
                        افزودن فراخوان جدید
                    </Link>
                </div>

                <div className="w-full grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                    {requests?.registered?.map((item) => (
                        <CallingItem key={item.id} data={item} />
                    ))}
                </div>
            </div>
        </div>
    )
}
