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
            </div>
        </LayoutChats>
    )
}
