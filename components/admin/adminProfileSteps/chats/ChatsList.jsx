import { useChatContext } from "@/context/ChatContext"
import Link from "next/link"
import { usePathname } from "next/navigation"
import Countdown from "react-countdown"
import { AiOutlineUser } from "react-icons/ai"
import { FaCheck } from "react-icons/fa6"
import { FiUserCheck } from "react-icons/fi"
import { MdClose } from "react-icons/md"
import moment from 'moment-jalaali';

export default function ChatsList({ className }) {
    const { getOnlineUsers, currentUser } = useChatContext();
    
    return (
        <div className={`bg-white w-full min-h-[calc(100vh-53px-74px-33px)] lg:min-h-[calc(100vh-120px-68px)] xl:min-h-[calc(100vh-120px-72px)]  ${!getOnlineUsers.length && "flex"} flex-col items-center justify-center lg:block overflow-y-auto col-span-3 ${className}`}>
            <div className="w-full h-full">
                {getOnlineUsers.length ?
                    getOnlineUsers?.map((item, index) => (
                        item.id !== currentUser?.id &&
                        <ChatItem key={index} type={"info"} data={item} />
                    ))
                    :
                    <div className="w-full h-full flex flex-col gap-4 items-center justify-center">
                        <p className="text-sm font-medium text-slate-800 rounded-full py-1.5 px-4 bg-gray-800/20">
                            مخاطبی وجود ندارد!
                        </p>
                    </div>
                }
                {/* <ChatItem type={"danger"} />
                <ChatItem type={"info"} />
                <ChatItem type={"default"} /> */}
            </div>
        </div>
    )
}

function ChatItem({ type, data }) {
    const pathname = usePathname();
    const pathnameFirst = pathname.split("/")[1];
    const lastOrder = data?.orders?.at(-1);
    const orderDate = JSON.parse(lastOrder?.json_data);
    const miladiDate = moment(orderDate?.date, 'jYYYY/jM/jD').toDate();
    const timestamp = miladiDate.valueOf();


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
        <Link href={`/${pathnameFirst}/chats/${data?.id}`} className="w-full flex items-center gap-4 px-4">
            <div className="relative" >
                <div className="w-12 h-12">
                    <img src={data?.avatar || "/images/user.png"} alt="user" className="w-full h-full object-cover object-center rounded-full" />
                </div>
                {/* <div className="absolute w-2.5 h-2.5 rounded-full bg-green-600 border border-white bottom-0.5 left-0.5"></div> */}
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
                        {new Date(lastOrder.created_at).toLocaleDateString("fa-IR", { day: "numeric", month: "long" })}
                    </span>
                </div>

                <div className="w-full flex items-center justify-between">
                    <span className="text-[10px] text-slate-600 font-semibold">
                        {lastOrder?.type}
                    </span>
                    <span className="text-xs text-slate-600 font-semibold">
                        {/* 00:02:50:25 */}
                        <Countdown date={timestamp} />
                    </span>
                </div>
            </div>
        </Link >
    )
}