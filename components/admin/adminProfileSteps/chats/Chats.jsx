import { ChatMessageBox, ChatMessageTypeChat } from "@/components/admin/adminProfileSteps/chats/ChatMessageBox";
import ChatMessageInput from "@/components/admin/adminProfileSteps/chats/ChatMessageInput";
import LayoutChats from "@/components/admin/adminProfileSteps/chats/LayoutChats";
import Header from "@/components/Header";
import { useChatContext } from "@/context/ChatContext";
import { useGetProvinces } from "@/hooks/useCity";
import useProfile from "@/hooks/useProfile";
import { useParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { HiDotsVertical } from "react-icons/hi";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { IoCallOutline, IoChatbubbleEllipsesOutline } from "react-icons/io5";

export default function Chats() {
    const { messages, getOnlineUsers, startVoiceCall } = useChatContext();
    const { user } = useProfile();
    const messagesRefMobile = useRef(null);
    const messagesRefDesktop = useRef(null);
    const params = useParams();
    const getReciverUser = getOnlineUsers.filter((u) => Number(u.id) === Number(params.chatId))[0]
    const { transformProvinces } = useGetProvinces();
    const messagesData = [...getReciverUser?.orders || [], ...messages];
    
    useEffect(() => {
        if (messagesRefMobile.current) {
            messagesRefMobile.current.scrollTop = messagesRefMobile.current.scrollHeight;
        }
        if (messagesRefDesktop.current) {
            messagesRefDesktop.current.scrollTop = messagesRefDesktop.current.scrollHeight;
        }
    }, [messages]);

    return (
        <>
            <div className="lg:hidden -mb-20">
                <Header isShowMobileMenu={false} />
                <div className="w-full h-[calc(100vh-64px)] relative">
                    <div className="w-full h-full absolute top-0 right-0 bg-[url('/images/chat-bg.png')] bg-cover bg-center opacity-10"></div>
                    <div className="w-full h-full flex flex-col relative z-10">

                        {/* user data */}
                        <div className="w-full flex items-center justify-between p-4 bg-white shadow">
                            <div className="flex items-center gap-4">
                                <button onClick={() => window.history.back()}>
                                    <FaArrowRight className="w-5 h-5 text-slate-800" />
                                </button>
                                <div className="flex items-center gap-2">
                                    <div className="relative">
                                        <div className="w-9 h-9">
                                            <img src={getReciverUser?.avatar || "/images/user.png"} alt="user" className="w-full h-full object-cover object-center rounded-full" />
                                        </div>
                                        {/* <div className="absolute w-2 h-2 rounded-full bg-green-600 border border-white bottom-0.5 left-0.5"></div> */}
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-slate-800 truncate">
                                            {getReciverUser?.name} {getReciverUser?.lastname}
                                        </span>
                                        <span className="text-xs text-slate-600">
                                            آخرین بازدید به تازگی
                                        </span>
                                    </div>

                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-slate-800">
                                <button>
                                    <HiOutlineVideoCamera className="w-5 h-5" />
                                </button>
                                <button onClick={() => startVoiceCall(getReciverUser?.id)}>
                                    <IoCallOutline className="w-5 h-5" />
                                </button>
                                <button>
                                    <FiSearch className="w-5 h-5" />
                                </button>
                                <button>
                                    <HiDotsVertical className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* chat */}
                        {messagesData.length ?
                            <div ref={messagesRefMobile} className="flex-1 flex flex-col items-start overflow-y-auto gap-3 px-2 py-4">
                                {messagesData.map((item, index) => (
                                    item?.order_id ?
                                        <ChatMessageTypeChat
                                            key={index}
                                            user={getReciverUser}
                                            order={item}
                                            provinces={transformProvinces}
                                        />
                                        :
                                        <ChatMessageBox
                                            key={index}
                                            data={item}
                                            isOwnMessage={item.isOwnMessage}
                                        />
                                ))}
                            </div>
                            :
                            <div className="flex-1 flex flex-col gap-4 items-center justify-center">
                                <IoChatbubbleEllipsesOutline className="text-slate-500 w-10 h-10" />
                                <p className="text-sm font-medium text-slate-500">
                                    اولین پیام را ارسال کنید!
                                </p>
                            </div>
                        }


                        {/* message input */}
                        <ChatMessageInput />
                    </div>

                </div>
            </div>


            <div className="hidden lg:block">
                <LayoutChats reciverDetails={getReciverUser}>
                    <div className="w-full h-full relative">
                        <div className="w-full h-full absolute top-0 right-0 bg-[url('/images/chat-bg.png')] bg-cover bg-center opacity-10"></div>

                        <div className="w-full h-full flex flex-col">
                            {messagesData.length > 0 ?
                                <div ref={messagesRefDesktop} className="w-full flex-1 flex flex-col items-start overflow-y-auto p-4 gap-4 relative z-10">
                                    {messagesData.map((item, index) => (
                                        item?.order_id ?
                                            <ChatMessageTypeChat
                                                key={index}
                                                user={getReciverUser}
                                                order={item}
                                                provinces={transformProvinces}
                                            />
                                            :
                                            <ChatMessageBox
                                                key={index}
                                                data={item}
                                                isOwnMessage={item.isOwnMessage}
                                            />
                                    ))}
                                </div>
                                :
                                <div className="flex-1 flex flex-col gap-4 items-center justify-center">
                                    <IoChatbubbleEllipsesOutline className="text-slate-500 w-10 h-10" />
                                    <p className="text-sm font-medium text-slate-500">
                                        اولین پیام را ارسال کنید!
                                    </p>
                                </div>
                            }


                            <ChatMessageInput />
                        </div>
                    </div>
                </LayoutChats>
            </div>
        </>
    )
}
