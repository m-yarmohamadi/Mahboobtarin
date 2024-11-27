export default function RequestDetails() {
    const details = [
        { value: "بازیگر", label: "دسته بندی" },
        { value: "تمام وقت", label: "نوع همکاری" },
        { value: "حداقل 1 سال", label: "تجربه کاری" },
        { value: "از 10 سال", label: "سن" },
        { value: "فرقی ندارد", label: "جنسیت" },
        { value: "از 20 میلیون", label: "دستمزد" },
        { value: "ماهانه", label: "شیوه پرداخت" },
        { value: "از 11 تا 19", label: "ساعت کاری" },
        { value: "دارد", label: "بیمه" },
    ]

    return (
        <div className="pt-5 lg:pt-0">
            <ul className="w-full flex flex-col">
                {details.map((item, index) => (
                    <li key={index} className="w-full flex items-center justify-between py-4 border-b border-b-slate-300 dark:border-b-slate-400 last:border-b-0">
                        <span className="text-xs text-slate-700">
                            {item.label}
                        </span>
                        <span className="text-sm font-medium text-slate-900">
                            {item.value}
                        </span>
                    </li>
                ))}
            </ul>
        </div>
    )
}
