import { MdCall, MdCallEnd } from "react-icons/md";

export default function IncomingVoiceCall({ caller, end, answer }) {
    return (
        <div className={`w-full h-full fixed top-0 right-0 bg-slate-200 z-[60]`}>
            <div className="w-full h-full flex items-center justify-between flex-col py-20">
                <div className={`flex items-center flex-col gap-4`}>
                    <div className="w-20 h-20 flex items-center justify-center rounded-full overflow-hidden border-4 border-primary-01">
                        <img
                            className={"object-cover w-full h-full"}
                            src={caller?.from?.avatar || "/images/user.png"}
                            alt=''
                        />
                    </div>
                    <div className="text-slate-900 font-bold">
                        تماس از {caller?.from?.name} {caller?.from?.lastname}
                    </div>
                </div>
                <div className="flex items-center justify-center gap-16">
                    <button className='btn btn--danger !w-20 !h-12 !p-2 !rounded-xl'>
                        <MdCallEnd onClick={end} className='w-6 h-6' />
                    </button>
                    <button className='btn btn--primary !w-20 !h-12 !p-2 !rounded-xl'>
                        <MdCall onClick={answer} className='w-6 h-6' />
                    </button>
                </div>
            </div>
        </div>
    )
}
