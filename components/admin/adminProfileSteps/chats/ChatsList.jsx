import useChat from "@/hooks/useChat"
import Link from "next/link"
import { AiOutlineUser } from "react-icons/ai"
import { FaCheck } from "react-icons/fa6"
import { FiUserCheck } from "react-icons/fi"
import { MdClose } from "react-icons/md"

export default function ChatsList({ className }) {
    const { getOnlineUsers } = useChat();

    const userTest = { user_id: 5891, name: "test", lastname: "testiii" }

    return (
        <div className={`bg-white w-full min-h-[calc(100vh-53px-74px-33px)] lg:min-h-[calc(100vh-120px-68px)] xl:min-h-[calc(100vh-120px-72px)] overflow-y-auto col-span-3 ${className}`}>
            <div className="w-full h-full">
                {getOnlineUsers?.map((item, index) => (
                    <ChatItem type={"info"} data={item} />
                ))}
                <ChatItem type={"danger"} data={userTest} />
                {/* <ChatItem type={"danger"} />
                <ChatItem type={"info"} />
                <ChatItem type={"default"} /> */}
            </div>
        </div>
    )
}

function ChatItem({ type, data }) {

    const chatStatus = {
        "success": {
            classNames: "bg-green-600/20 text-green-600",
            icon: <FaCheck />,
        },
        "danger": {
            classNames: "bg-red-600/20 text-red-600",
            icon: <MdClose className="w-5 h-5" />,
        },
        "info": {
            classNames: "bg-cyan-600/20 text-cyan-600",
            icon: <FiUserCheck className="w-5 h-5" />,
        },
        "default": {
            classNames: "bg-fuchsia-600/20 text-fuchsia-600",
            icon: <AiOutlineUser className="w-5 h-5" />,
        },
    }

    return (
        <Link href={`/admin/chats/${data?.user_id}`} className="w-full flex items-center gap-4 px-4">
            <div className="relative">
                <div className="w-12 h-12">
                    <img src="/images/user.png" alt="user" className="w-full h-full object-cover object-center rounded-full" />
                </div>
                <div className="absolute w-2.5 h-2.5 rounded-full bg-green-600 border border-white bottom-0.5 left-0.5"></div>
            </div>

            <div className="flex-1 border-b border-b-slate-300 py-4">
                <div className="w-full flex items-center justify-between mb-4">
                    <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900">
                            {data?.name} {data?.lastname}
                        </h4>
                        <div className={`${chatStatus[type].classNames} w-7 h-7 rounded-full flex items-center justify-center`}>
                            {chatStatus[type].icon}
                        </div>
                    </div>
                    <span className="text-[10px] text-slate-600">
                        30 آذر
                    </span>
                </div>

                <div className="w-full flex items-center justify-between">
                    <span className="text-[10px] text-slate-600 font-semibold">
                        مشاوره صوتی | 5 دقیقه
                    </span>
                    <span className="text-xs text-slate-600 font-semibold">
                        00:02:50:25
                    </span>
                </div>
            </div>
        </Link>
    )
}