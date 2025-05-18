import { MdCallEnd } from "react-icons/md";

export default function VoiceCall({ receiverUser, end }) {
    return (
        <div className={`w-full h-full fixed top-0 right-0 bg-slate-200 z-[60]`}>
            <div className="w-full h-full flex items-center justify-between flex-col py-20">

                <div className="flex items-center flex-col gap-4">
                    <div className="text-lg font-medium text-slate-900">

                    </div>
                    <div className={`flex items-center flex-col gap-4`}>

                        <div className="relative flex items-center justify-center">
                            <div className="absolute top-0 right-0">
                                <div className="spinner">
                                    <div className="spinner1"></div>
                                </div>
                            </div>
                            <img
                                className={"w-20 h-20 relative z-10 rounded-full  border-4 border-primary-01"}
                                src={receiverUser?.avatar || "/images/user.png"}
                                alt=''
                            />
                        </div>
                        <div className="text-slate-900 font-bold">
                            {receiverUser?.name} {receiverUser?.lastname}
                        </div>
                    </div>
                </div>
                <div className="flex flex-col items-center gap-7">
                    <button onClick={end} className='btn btn--danger !h-12 gap-3 !rounded-xl'>
                        <MdCallEnd className='w-6 h-6' /> پایان تماس
                    </button>
                </div>
            </div>
        </div>
    )
}
