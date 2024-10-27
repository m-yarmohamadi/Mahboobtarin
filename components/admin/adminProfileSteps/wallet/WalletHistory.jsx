import TabGroup from "@/tools/TabGroup";

export default function WalletHistory() {
    const tabs = [
        { label: "درصف واریز"},
        { label: "فهرست تراکنش ها"}
    ];

    return (
        <div>
            <TabGroup tabs={tabs}>
                    <TabGroup.Item>
                        <InProgressList />
                    </TabGroup.Item>
                    <TabGroup.Item>
                        <TransactionList />
                    </TabGroup.Item>
                </TabGroup>
        </div>
    )
}

function InProgressList(){
    return(
        <div></div>
    )
}

function TransactionList(){
    return(
        <div></div>
    )
}