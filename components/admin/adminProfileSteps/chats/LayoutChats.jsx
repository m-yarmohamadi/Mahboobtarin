"use client"
import Header from "@/components/Header";
import ChatHeader from "./ChatHeader";
import TabGroup from "@/tools/TabGroup";
import ChatsList from "./ChatsList";
import ChatsGroup from "./ChatsGroup";
import { FiSearch } from "react-icons/fi";
import { HiDotsVertical } from "react-icons/hi";

export default function LayoutChats({ children, reciverDetails }) {

    return (
        <>
            <Header isShowMobileMenu={false} />
            <div className="w-full lg:h-[calc(100vh-72px-120px)] flex flex-col 2xl:container -mb-20 lg:-mb-0">
                <div className="bg-white w-full">
                    <div className="w-full p-4 border-b-2 border-b-primary-01 lg:border-b-0 mb-4 lg:mb-0">
                        <ChatHeader />
                    </div>
                    <div className="pr-4 pt-4 relative hidden lg:flex items-end justify-between border-b border-slate-300 dark:border-slate-400">
                        <ChatsGroup />
                        <ReciverDetails reciverDetails={reciverDetails} />
                    </div>
                </div>
                <div className="w-full flex-1 h-full grid grid-cols-12">
                    <ChatsList className={"hidden lg:block"} />
                    <div className="col-span-12 lg:col-span-9 w-full overflow-hidden lg:overflow-y-auto overflow-x-hidden">
                        {children}
                    </div>
                </div>
            </div>
        </>
    )
}

function ReciverDetails({ reciverDetails }) {
    if (reciverDetails) return (
        <div className="w-auto bg-white flex items-center justify-end p-3 gap-6 whitespace-nowrap absolute left-0 bottom-0">
            <div className="flex items-center gap-2">
                <div className="flex flex-col items-end">
                    <span className="text-sm font-bold text-slate-800">
                        {reciverDetails?.name} {reciverDetails?.lastname}
                    </span>
                    <span className="text-xs text-slate-600">
                        آخرین بازدید به تازگی
                    </span>
                </div>
                <div className="relative">
                    <div className="w-9 h-9">
                        <img src={reciverDetails?.avatar || "/images/user.png"} alt="user" className="w-full h-full object-cover object-center rounded-full" />
                    </div>
                    {/* <div className="absolute w-2 h-2 rounded-full bg-green-600 border border-white bottom-0.5 left-0.5"></div> */}
                </div>
            </div>
            <div className="flex items-center gap-3 text-slate-800">
                <button>
                    <FiSearch className="w-6 h-6" />
                </button>
                <button>
                    <HiDotsVertical className="w-5 h-5" />
                </button>
            </div>
        </div>
    )
}