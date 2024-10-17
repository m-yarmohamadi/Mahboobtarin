import TabGroup from "@/tools/TabGroup";
import IncomingCalling from "./IncomingCalling";
import AddedCalling from "./AddedCalling";
import Link from "next/link";

export default function CallingList() {
    const tabs = [
        { label: "فراخوان های ثبت شده", name: "addedCalling", component: <AddedCalling /> },
        { label: "فراخوان های دریافتی", name: "incomingCalling", component: <IncomingCalling /> }
    ];

    return (
        <div className='flex flex-col justify-between items-center w-full h-full'>
            <div className='w-full pb-8'>
                <div className='w-full flex items-end justify-between mb-7 pb-4'>
                    <div className='text-xl text-slate-800 font-semibold'>فراخوان ها</div>
                    <Link href={'/admin/calling/create'} className="btn btn--primary">
                        افزودن فراخوان جدید
                    </Link>
                </div>

                <TabGroup tabs={tabs} />
            </div>
        </div>
    )
}
