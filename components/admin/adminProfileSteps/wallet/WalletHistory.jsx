import TabGroup from "@/tools/TabGroup";

export default function WalletHistory() {
    const tabs = [
        { label: "درصف واریز", name: "in_progress", component: <InProgressList/> },
        { label: "فهرست تراکنش ها", name: "transaction", component: <TransactionList/> }
    ];

    return (
        <div>
            <TabGroup tabs={tabs} />
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