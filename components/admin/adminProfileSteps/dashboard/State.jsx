

const data = [
    {
        title: "محبوبیت",
        value: "209 امتیاز (3261 نظر)"
    },
    {
        title: "بازدید کل",
        value: "244"
    },
    {
        title: "خدمات موفق",
        value: "444"
    },
    {
        title: "مجموع درخواست‌ها",
        value: "6022"
    },
    {
        title: "در امد کل",
        value: "510000 تومان"
    },
    {
        title: "دنبال کننده",
        value: "133"
    },
    {
        title: "دنبال شده",
        value: "75"
    },
];

export default function State({ otherData = [], summaryData }) {

    const toPersianLabel = (key) => {
        switch (key) {
            case "follower": return "دنبال کنندگان"
            case "following": return "دنبال شوندگان"
            case "popularity": return "محبوبیت"
            case "successful_services": return "خدمات موفق"
            case "total_income": return "درامد کل"
            case "total_requests": return "مجموع درخواست‌ها"
            case "total_views": return "بازدید کل"
        }
    }
    return (
        <div className="w-full bg-white shadow-lg dark:shadow-darkLg p-5 rounded-md">
            <ul className="w-full h-full flex flex-col gap-4 justify-between">
                {summaryData && Object.keys(summaryData).map((item, index) => (
                    <li key={index} className="flex items-center text-sm font-medium">
                        <span className="inline-block w-3 h-3 bg-secondary-01"></span>
                        <div className="mr-4 ml-1 text-slate-800">
                            {toPersianLabel(item)}
                        </div>
                        <div className="text-secondary-01">
                            {summaryData[item]}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )


}
