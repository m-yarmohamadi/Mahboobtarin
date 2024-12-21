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
        </LayoutChats>
    )
}
