import TabGroup from "@/tools/TabGroup";
import ApplicantItem from "./ApplicantItem";
import { useState } from "react";

export default function ApplicantsList({ list }) {
    const [tabFilter, setTabFilter] = useState(0);

    let filteredList = [];
    
    if (tabFilter === 0) {
        filteredList = list;
    }

    if (tabFilter === 1) {
        filteredList = list.filter((l) => l.created_at === l.updated_at);
    }

    if (tabFilter === 2) {
        filteredList = list.filter((l) => l.status === "0");
    }

    if (tabFilter === 3) {
        filteredList = list.filter((l) => l.status === "1");
    }

    if (tabFilter === 4) {
        filteredList = list.filter((l) => l.status === "2");
    }

    if (tabFilter === 5) {
        filteredList = list.filter((l) => l.status === "3");
    }

    const tabs = [
        { label: "همه متقاضیان" },
        { label: "جدید" },
        { label: "بررسی نشده" },
        { label: "تایید موقت" },
        { label: "رد شده" },
        { label: "تایید نهایی" },
    ];

    return (
        <div className="w-full mt-6 bg-slate-100 rounded-lg p-4">
            <TabGroup tabs={tabs} onIndex={(e) => setTabFilter(e)}>
                {tabs.map((tab, index) => (
                    <TabGroup.Item key={tab}>
                        <div className="flex flex-col gap-4">
                            {filteredList.map((item, index) => (
                                <ApplicantItem
                                    key={index}
                                    applicant={item?.user}
                                    createdAt={item.created_at}
                                    id={item.id}
                                />
                            ))}
                        </div>
                    </TabGroup.Item>
                ))}
            </TabGroup>
        </div>
    )
}
