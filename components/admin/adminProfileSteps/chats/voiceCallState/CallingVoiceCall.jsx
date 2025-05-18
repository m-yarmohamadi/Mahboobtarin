import Loading from "@/tools/Loading";
import { MdCallEnd } from "react-icons/md";

export default function CallingVoiceCall({ receiverUser, end, callLoad }) {
    return (
        <div className={`w-full h-full fixed top-0 right-0 bg-slate-200 z-[60]`}>
            <div className="w-full h-full flex items-center justify-between flex-col py-20">
                <div className="flex flex-col gap-7 items-center">
                    <div className={`text-lg font-medium duration-300 text-red-600 ${callLoad ? "opacity-100" : "opacity-30"}`}>
                        در حال تماس ...
                    </div>
                    <div className={`flex items-center flex-col gap-4`}>
                        <div className={`w-20 h-20 flex items-center justify-center rounded-full overflow-hidden border-4 border-primary-01`}>
                            <img
                                className={"object-cover w-full h-full"}
                                src={receiverUser?.avatar || "/images/user.png"}
                                alt=''
                            />
                        </div>
                        <div className="text-slate-900 font-bold">
                            {receiverUser?.name} {receiverUser?.lastname}
                        </div>
                    </div>
                </div>
                <div>
                    <Loading width={50} customeColor={'#dc2626 '} />
                </div>
                <div className="flex flex-col items-center gap-7">
                    <button onClick={end} className='btn btn--danger !w-20 !h-12 !p-2 !rounded-xl'>
                        <MdCallEnd className='w-6 h-6' />
                    </button>
                </div>
            </div>
        </div>
    )
}
