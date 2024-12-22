import { FaRegFaceSmile } from "react-icons/fa6";
import { FiPaperclip } from "react-icons/fi";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { IoCallOutline } from "react-icons/io5";
import { MdOutlineKeyboardVoice } from "react-icons/md";

export default function ChatMessageInput() {
    return (
        <div className="w-full flex items-center gap-3 p-3 bg-white border-t border-t-slate-300 relative z-10">
            <button>
                <MdOutlineKeyboardVoice className="w-6 h-6 text-slate-700 lg:w-7 lg:h-7" />
            </button>

            <div className="w-full flex items-center gap-3 p-2 border border-slate-300 rounded-lg lg:ml-6 lg:p-2.5">
                <button>
                    <FiPaperclip className="w-5 h-5 lg:w-6 lg:h-6 text-slate-500" />
                </button>
                <input
                    type="text"
                    placeholder="پیام ..."
                    className="w-auto appearance-none flex-1 bg-transparent border-0 outline-none text-sm font-medium text-slate-800 placeholder-primary-01"
                />
                <button>
                    <FaRegFaceSmile className="w-5 h-5 lg:w-6 lg:h-6 text-slate-500" />
                </button>
            </div>

            <div className="hidden lg:flex items-center gap-4">
                <button>
                    <HiOutlineVideoCamera className="w-6 h-6 text-slate-700" />
                </button>
                <button>
                    <IoCallOutline className="w-6 h-6 text-slate-700" />
                </button>
                <button className="btn btn--primary !p-2 !px-4">
                    پایان
                </button>
            </div>
        </div>
    )
}
