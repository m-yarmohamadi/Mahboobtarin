import { ChatMessageBox, ChatMessageTypeChat } from "@/components/admin/adminProfileSteps/chats/ChatMessageBox";
import ChatMessageInput from "@/components/admin/adminProfileSteps/chats/ChatMessageInput";
import LayoutChats from "@/components/admin/adminProfileSteps/chats/LayoutChats";
import Header from "@/components/Header";
import useChat from "@/hooks/useChat";
import useProfile from "@/hooks/useProfile";
import { useEffect, useRef } from "react";
import { FaArrowRight } from "react-icons/fa6";
import { FiSearch } from "react-icons/fi";
import { HiDotsVertical } from "react-icons/hi";
import { HiOutlineVideoCamera } from "react-icons/hi2";
import { IoCallOutline, IoChatbubbleEllipsesOutline } from "react-icons/io5";

export default function ChatSingle() {
    const { messages } = useChat();
    const { user } = useProfile();
    const messagesRef = useRef(null);

    useEffect(() => {
        if (messagesRef.current) {
            messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
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
                                <button>
                                    <FaArrowRight className="w-5 h-5 text-slate-800" />
                                </button>
                                <div className="flex items-center gap-2">
                                    <div className="relative">
                                        <div className="w-9 h-9">
                                            <img src="/images/user.png" alt="user" className="w-full h-full object-cover object-center rounded-full" />
                                        </div>
                                        <div className="absolute w-2 h-2 rounded-full bg-green-600 border border-white bottom-0.5 left-0.5"></div>
                                    </div>
                                    <div className="flex flex-col">
                                        <span className="text-sm font-bold text-slate-800 truncate">
                                            نام کاربر
                                        </span>
                                        <span className="text-xs text-slate-600">
                                            آنلاین
                                        </span>
                                    </div>

                                </div>
                            </div>
                            <div className="flex items-center gap-3 text-slate-800">
                                <button>
                                    <HiOutlineVideoCamera className="w-5 h-5" />
                                </button>
                                <button>
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
                        {messages.length > 0 ?
                            <div ref={messagesRef} className="flex-1 flex flex-col items-start overflow-y-auto gap-3 px-2 py-4">
                                {messages.map((item, index) => (
                                    <ChatMessageBox
                                        key={index}
                                        data={item}
                                        typeUser={Number(item?.user?.id) === user?.id || Number(item?.user_id) === user?.id ? "user" : ""}
                                    />
                                ))}
                                {/* <ChatMessageTypeChat /> */}
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
                <LayoutChats>
                    <div className="w-full h-full relative">
                        <div className="w-full h-full absolute top-0 right-0 bg-[url('/images/chat-bg.png')] bg-cover bg-center opacity-10"></div>

                        <div className="w-auto bg-white flex items-center justify-end p-3 gap-6 whitespace-nowrap fixed top-[126px] left-0">
                            <div className="flex items-center gap-2">
                                <div className="flex flex-col items-end">
                                    <span className="text-sm font-bold text-slate-800">
                                        نام کاربر
                                    </span>
                                    <span className="text-xs text-slate-600">
                                        آنلاین
                                    </span>
                                </div>
                                <div className="relative">
                                    <div className="w-9 h-9">
                                        <img src="/images/user.png" alt="user" className="w-full h-full object-cover object-center rounded-full" />
                                    </div>
                                    <div className="absolute w-2 h-2 rounded-full bg-green-600 border border-white bottom-0.5 left-0.5"></div>
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

                        <div className="w-full h-full flex flex-col">
                            {messages.length > 0 ?
                                <div ref={messagesRef} className="w-full flex-1 flex flex-col items-start overflow-y-auto p-4 gap-4 relative z-10">
                                    {messages.map((item, index) => (
                                        <ChatMessageBox
                                            key={index}
                                            data={item}
                                            typeUser={Number(item?.user?.id) === user?.id || Number(item?.user_id) === user?.id ? "user" : ""}
                                        />
                                    ))}
                                    {/* <ChatMessageTypeChat /> */}
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
