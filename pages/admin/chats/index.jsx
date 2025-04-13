import ChatsGroup from "@/components/admin/adminProfileSteps/chats/ChatsGroup";
import ChatsList from "@/components/admin/adminProfileSteps/chats/ChatsList";
import LayoutChats from "@/components/admin/adminProfileSteps/chats/LayoutChats";

export default function Chats() {
    return (
        <LayoutChats>
            <div className="w-full lg:hidden">
                <div className="w-full bg-white pr-4">
                    <ChatsGroup />
                </div>
                <div>
                    <ChatsList />
                </div>
            </div>

            <div className="w-full h-full relative hidden lg:block">
                <div className="w-full h-full absolute top-0 right-0 bg-[url('/images/chat-bg.png')] bg-cover bg-center opacity-10"></div>
                <div className="absolute top-0 right-0 w-full h-full flex flex-col items-center justify-center">
                    <p className="text-sm font-medium text-slate-800 rounded-full py-1.5 px-4 bg-gray-800/20">
                        یک چت را انتخاب کنید!
                    </p>
                </div>
            </div>
        </LayoutChats>
    )
}
