import { BiSlider } from "react-icons/bi"
import { IoSearch } from "react-icons/io5"
import { MdAdd, MdClose } from "react-icons/md"

export default function ApplicantsFilter() {
    return (
        <div className="w-full bg-slate-200 rounded-xl p-3">
            <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-2 lg:gap-8">
                <div className="w-full flex-1 flex items-center gap-2">
                    <button className="text-primary-01 px-4 py-3 bg-slate-300 rounded-lg hidden lg:flex justify-center items-center text-sm font-bold gap-1">
                        <span className="rotate-90">
                            <BiSlider className="w-5 h-5" />
                        </span>
                        <span>فیلترها</span>
                    </button>
                    <div className="flex-1 bg-white py-2 pl-2 pr-4 lg:p-3 rounded-full flex items-center justify-between">
                        <input
                            type="text"
                            placeholder="جستجو"
                            className="w-auto appearance-none flex-1 bg-transparent border-0 outline-none text-sm font-medium text-slate-800 placeholder-primary-01"
                        />
                        <div className="flex items-center gap-2 lg:hidden">
                            <button>
                                <BiSlider className="w-5 h-5 text-primary-01 rotate-90" />
                            </button>
                            <IoSearch className="text-primary-01 w-5 h-5" />
                        </div>
                    </div>
                    <button className="text-primary-01 p-3 bg-slate-300 rounded-full hidden lg:flex justify-center items-center text-sm font-bold gap-1">
                        <IoSearch className="w-5 h-5" />
                    </button>
                </div>
                <div className="flex items-center justify-between gap-2 whitespace-nowrap">
                    <button className="btn btn--secondary !bg-white !text-xs !gap-1 !rounded-full !p-2">
                        <MdClose className="w-4 h-4" />
                        رد کردن همه
                    </button>
                    <button className="btn btn--secondary !bg-white !text-xs !gap-1 !rounded-full !p-2">
                        <MdAdd className="w-4 h-4" />
                        تایید همه
                    </button>
                </div>
            </div>
        </div>
    )
}
