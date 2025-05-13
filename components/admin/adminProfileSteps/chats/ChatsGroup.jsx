import TabGroup from "@/tools/TabGroup";
import { FiSearch } from "react-icons/fi";
import { HiDotsVertical } from "react-icons/hi";

export default function ChatsGroup({ userChat }) {
    const tabs = [
        { label: "همه موارد" },
        { label: "تایید نهایی" },
        { label: "درانتظار تایید" },
        { label: "تایید اولیه" },
        { label: "انجام شده" },
    ]

    return (
        <div className="w-full flex items-center justify-between">
            <TabGroup tabs={tabs} className={"!gap-0"}>

            </TabGroup>
        </div>
    )
}
