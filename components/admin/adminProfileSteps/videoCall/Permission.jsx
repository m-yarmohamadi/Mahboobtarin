import { MdOutlineKeyboardVoice } from "react-icons/md";
import ExpertDashboard from "../../ExpertDashboard";
import { BsFillCameraVideoFill } from "react-icons/bs";
import Input from "@/tools/Input";
import Loading from "@/tools/Loading";
import { HiOutlineVideoCamera, HiOutlineVideoCameraSlash } from "react-icons/hi2";
import { AiOutlineAudioMuted } from "react-icons/ai";

export default function Permission({ hidden, permission, toggleMic, toggleCamera, micOn, cameraOn, isConnection, idText, setIdText, children, myId, callUser }) {
    return (
        <div className={hidden ? "hidden" : "block"}>
            <ExpertDashboard>
                <div>
                    <div className="container">
                        <div className="mx-auto w-full relative  overflow-hidden max-w-lg h-[250px] sm:h-[300px] rounded-lg bg-slate-800">
                            {children}
                            <div className="w-full absolute bottom-0 right-0 flex items-center justify-center gap-4 p-4">
                                <button onClick={permission.mic ? () => toggleMic() : null} className={`!rounded-full btn btn--primary !w-8 !h-8 !p-0 ${!permission.mic && "bg-error"}`}>
                                    {micOn ? <MdOutlineKeyboardVoice className='w-5 h-5' /> : <AiOutlineAudioMuted className='w-5 h-5' />}
                                </button>
                                <button onClick={permission.video ? () => toggleCamera() : null} className={`!rounded-full btn btn--primary !w-8 !h-8 !p-0 ${!permission.video && "bg-error"}`}>
                                    {cameraOn ? <HiOutlineVideoCamera className='w-5 h-5' /> : <HiOutlineVideoCameraSlash className='w-5 h-5' />}
                                </button>
                            </div>
                        </div>

                        {!permission.mic && !permission.video &&
                            <p className="w-full text-sm font-bold text-slate-800 py-4 text-center">
                                برای برقراری تماس دسترسی به میکروفون و دوربین شما نیاز است
                            </p>
                        }
                        <div className="py-4 flex items-center justify-center">
                            {permission.mic && permission.video ?
                                <div>
                                    شناسه شما : {myId}
                                    <Input
                                        label={'شناسه کاربر را وارد کنید'}
                                        value={idText}
                                        onChange={(e) => setIdText(e.target.value)}
                                    />
                                    {
                                        idText ?
                                            !isConnection ?
                                                <button onClick={callUser} className="btn btn--primary">
                                                    شروع تماس
                                                </button>
                                                :
                                                <Loading />
                                            :
                                            null
                                    }
                                </div>
                                :
                                <button onClick={() => window.location.reload()} className="btn btn--danger">
                                    دسترسی دوربین و میکروفون
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </ExpertDashboard>
        </div>
    )
}
