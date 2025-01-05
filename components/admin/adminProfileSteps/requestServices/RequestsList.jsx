import { getRequestService } from "@/services/expertApi/requestExpertService";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function RequestsList() {
    const [requests, setReuests] = useState([]);
    console.log(requests);

    useEffect(() => {
        async function fetchHandler() {
            try {
                const { data } = await getRequestService();
                if (data && data.length) {
                    setReuests(data);
                }
            } catch (error) {
                setReuests([]);
            }
        }

        fetchHandler();
    }, [])

    return (
        <div className='flex flex-col justify-between items-center w-full h-full'>
            <div className='w-full'>
                <div className='w-full flex items-end justify-between mb-7 pb-4 border-b border-b-slate-300 dark:border-b-slate-400'>
                    <div className='text-xl text-slate-800 font-semibold'>درخواست های شما</div>
                    <Link href="/admin/request_services/create" className='btn btn--primary !px-5'>
                        <span>درخواست خدمت جدید</span>
                    </Link>
                </div>

                <div className="border border-slate-300 dark:border-slate-400 rounded-lg">
                    {requests.map((item, index) => (
                        <div
                            key={index}
                            className='flex items-center justify-between gap-4 p-3 border-b border-slate-300 dark:border-slate-400 last:border-0'
                        >
                            <div className='flex items-center gap-2'>
                                <p className='text-sm font-medium text-textDefault'>{item.service}</p>
                                <span className="text-textDefault">
                                    -
                                </span>
                                <span className=' text-xs flex justify-between items-center text-slate-700'>
                                    {item.theme}
                                </span>
                                <span className="text-textDefault">
                                    -
                                </span>
                                <span className=' text-xs flex justify-between items-center text-error'>
                                    در حال بررسی
                                </span>
                            </div>
                            <div className="flex items-center gap-2">

                                {/* <button
                                    onClick={() => deleteServiceHandler(item.id)}
                                    type='button'>
                                    <HiOutlineTrash className='w-5 h-5 text-red-600' />
                                </button> */}
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </div>
    )
}
