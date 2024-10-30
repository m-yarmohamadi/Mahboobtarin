import IncomeChart from "../dashboard/IncomeChart";
import ServicesChart from "../dashboard/ServicesChart";
import State from "../dashboard/State";
import VisitChart from "../dashboard/VisitChart";

const stateData = [
    {
        title: "تعداد پیام ها",
        value: "20"
    },
    {
        title: "تعداد نظرات",
        value: "6"
    },
    {
        title: "گالری",
        value: "44"
    },
    {
        title: "لینک ها",
        value: "10"
    },
];

export default function StatisticsList() {
    return (
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
            <div className="w-full xl:col-span-2">
                <State otherData={stateData} />
            </div>
            <VisitChart />
            <ServicesChart />
            <IncomeChart />
        </div>
    )
}
