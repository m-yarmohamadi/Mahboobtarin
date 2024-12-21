import { FaAngleDoubleDown } from "react-icons/fa";
import { FaAngleDown } from "react-icons/fa6";
import { FiMenu, FiSearch } from "react-icons/fi";
import { HiDotsVertical } from "react-icons/hi";

export default function ChatHeader() {
    return (
        <div className="w-full flex items-center justify-between gap-5">
            <div className="flex-1 lg:max-w-[50%] flex items-center gap-4">
                <button className="">
                    <FiMenu className="w-6 h-6 text-slate-800 hidden lg:block" />
                    <FaAngleDoubleDown className="w-6 h-6 text-primary-01 lg:hidden" />
                </button>
                <div className="flex-1 p-2 rounded-full hidden lg:flex items-center justify-between border border-primary-02 gap-2">
                    <div className="flex items-center gap-2">
                        <FiSearch className="text-primary-01 w-5 h-5" />
                    </div>
                    <input
                        type="text"
                        placeholder="جستجو"
                        className="w-auto appearance-none flex-1 bg-transparent border-0 outline-none text-sm font-medium text-slate-800 placeholder-primary-01"
                    />
                </div>
                <div className="flex items-center gap-1 text-xs lg:text-sm text-slate-800 font-semibold">
                    مرتب سازی:
                    <div className="font-normal flex items-center gap-1">
                        نزدیک ترین نوبت
                        <FaAngleDown className="w-4 h-4" />
                    </div>
                </div>
            </div>
            <div>
                <div className="flex lg:hidden items-center gap-3 text-slate-800">
                    <button>
                        <FiSearch className="w-6 h-6" />
                    </button>
                    <button>
                        <HiDotsVertical className="w-5 h-5" />
                    </button>
                </div>
                <div className="hidden lg:flex items-center gap-7">
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <span>
                            نوبت های تایید شده امروز
                        </span>
                        <span>
                            126
                        </span>
                    </div>
                    <div className="flex items-center gap-2 text-sm font-medium text-slate-700">
                        <span>
                            نوبت های تایید شده فردا
                        </span>
                        <span>
                            26
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}
