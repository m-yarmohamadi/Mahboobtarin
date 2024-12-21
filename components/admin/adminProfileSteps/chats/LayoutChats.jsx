"use client"
import Header from "@/components/Header";
import ChatHeader from "./ChatHeader";
import TabGroup from "@/tools/TabGroup";
import ChatsList from "./ChatsList";
import ChatsGroup from "./ChatsGroup";

export default function LayoutChats({ children }) {

    return (
        <>
            <Header isShowMobileMenu={false} />
            <div className="w-full lg:h-[calc(100vh-72px-120px)] flex flex-col 2xl:container -mb-20 lg:-mb-0">
                <div className="bg-white w-full">
                    <div className="w-full p-4 border-b-2 border-b-primary-01 lg:border-b-0 mb-4 lg:mb-0">
                        <ChatHeader />
                    </div>
                    <div className="px-4 pt-4 hidden lg:block">
                        <ChatsGroup />
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
