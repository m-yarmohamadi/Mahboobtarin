import useMainPage from "@/hooks/useMainPage"

export default function RequestDetails({ request }) {
    const { category, collaboration, work_history, gender, salary_amount, payment_method, time_work, insurance, age } = request
    const { categories, isLoading } = useMainPage();
    const categoryLabel = !isLoading && categories.filter((c) => Number(c.id) === Number(category))[0]?.name;

    const details = [
        { value: categoryLabel || "", label: "دسته بندی" },
        { value: collaboration || "", label: "نوع همکاری" },
        { value: work_history || "", label: "تجربه کاری" },
        { value: age || "", label: "سن" },
        { value: gender || "", label: "جنسیت" },
        { value: salary_amount || "", label: "دستمزد" },
        { value: payment_method || "", label: "شیوه پرداخت" },
        { value: time_work || "", label: "ساعت کاری" },
        { value: insurance || "", label: "بیمه" },
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
