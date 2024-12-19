import TabGroup from "@/tools/TabGroup";
import ApplicantItem from "./ApplicantItem";

export default function ApplicantsList() {
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
            <TabGroup tabs={tabs}>
                <TabGroup.Item>
                    <ApplicantItem />
                </TabGroup.Item>
            </TabGroup>
        </div>
    )
}
