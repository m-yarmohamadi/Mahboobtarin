import TabGroup from "@/tools/TabGroup";

export default function ChatsGroup() {
    const tabs = [
        { label: "همه موارد" },
        { label: "تایید نهایی" },
        { label: "درانتظار تایید" },
        { label: "تایید اولیه" },
        { label: "انجام شده" },
    ]

    return (
        <TabGroup tabs={tabs} onIndex={(e) => console.log(e)} className={"!gap-0"}>

        </TabGroup>
    )
}
