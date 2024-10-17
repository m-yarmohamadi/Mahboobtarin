


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
        title: "مجموع درخواست ها",
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

export default function State() {
    return (
        <div className="w-full bg-white shadow-lg dark:shadow-darkLg p-5 rounded-md">
            <ul className="w-full h-full flex flex-col gap-4 justify-between">
                {data.map((item, index) => (
                    <li key={index} className="flex items-center text-sm font-medium">
                        <span className="inline-block w-3 h-3 bg-secondary-01"></span>
                        <div className="mr-4 ml-1 text-slate-800">
                            {item.title}
                        </div>
                        <div className="text-secondary-01">
                            {item.value}
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}
