import Link from "next/link";

export default function RequestsList() {
    return (
        <div className='flex flex-col justify-between items-center w-full h-full'>
            <div className='w-full'>
                <div className='w-full flex items-end justify-between mb-7 pb-4 border-b border-b-slate-300 dark:border-b-slate-400'>
                    <div className='text-xl text-slate-800 font-semibold'>درخواست های شما</div>
                    <Link href="/admin/request_services/create" className='btn btn--primary !px-5'>
                        <span>درخواست خدمت جدید</span>
                    </Link>
                </div>

                <div>

                 
                </div>
            </div>
        </div>
    )
}
