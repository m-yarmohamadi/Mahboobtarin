import Link from "next/link";
import { FaInstagram, FaLink, FaTelegram, FaTwitter } from "react-icons/fa6";

export default function Share() {
    return (
        <div className="w-full flex flex-col gap-6 sm:flex-row-reverse items-center justify-between py-4 my-4 border-y border-y-slate-400">
            <div className="flex flex-row-reverse items-center gap-3">
                <button className="btn bg-slate-700 !p-0 !rounded-none text-slate-100 truncate">
                    <span className="p-2">
                        لینک کوتاه
                    </span>
                    <span className="bg-yellow-500 p-2">
                        <FaLink className="w-5 h-5" />
                    </span>
                </button>
                <div className="btn border border-slate-400 !p-2 !rounded-none">
                    test.ir/2352
                </div>
                <button className="btn btn--primary !py-2 !px-4 !rounded-none !bg-yellow-500 truncate">
                    کپی لینک
                </button>
            </div>

            <div className=" flex justify-start items-center text-3xl gap-4 text-slate-500">
                <button className={`hover:cursor-pointer`}>
                    <FaInstagram className="w-6 h-6 text-primary-02" />
                </button>
                <button className={`hover:cursor-pointer`}>
                    <FaTelegram className="w-6 h-6 text-primary-02" />
                </button>
                <button className={`hover:cursor-pointer`} >
                    <FaTwitter className="w-6 h-6 text-primary-02" />
                </button>
            </div>

        </div>
    )
}
