import Link from "next/link";
import CallingItem from "./CallingItem";

export default function CallingList() {

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
                    <CallingItem />
                    <CallingItem />
                    <CallingItem />
                    <CallingItem />
                    <CallingItem />
                </div>
            </div>
        </div>
    )
}
