import { FaRegBookmark } from "react-icons/fa6";
import { FiShare2 } from "react-icons/fi";

export default function ReqeustOptions() {
    return (
        <div className="w-full flex items-center justify-between lg:flex-col gap-4 lg:gap-7">
            <div className="lg:w-full text-xs lg:text-sm lg:text-center text-slate-700">
                2 روز پیش در تهران
            </div>
            <div className="lg:w-full flex items-center flex-1 justify-around">
                <button>
                    <FaRegBookmark className="w-5 h-5 lg:w-6 lg:h-6 text-primary-01"/>
                </button>
                <button>
                    <FiShare2 className="w-5 h-5 lg:w-6 lg:h-6 text-primary-01"/>
                </button>
            </div>
            <div className="lg:w-full">
                <button className="btn btn--primary w-full">
                    تایید فراخوان
                </button>
            </div>
        </div>
    )
}
