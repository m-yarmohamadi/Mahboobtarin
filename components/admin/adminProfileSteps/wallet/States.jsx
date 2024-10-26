export default function States() {
    return (
        <div className="w-full grid grid-cols-1 gap-4 pt-4 pb-7 sm:grid-cols-3">
            <State title={'اعتبار شارژی'} value={'0'} color="blue"/>
            <State title={'اعتبار هدیه'} value={'0'} color="green"/>
            <State title={'مبلغ قابل برداشت'} value={'0'} color="yellow"/>
        </div>
    )
}

function State({ title, value, color = "primary" }) {
    const colorType = {
        "primary": "text-primary-01",
        "blue": "text-blue-600",
        "green": "text-green-500",
        "yellow": "text-yellow-500",
        "red": "text-red-500"
    }

    return (
        <div className="border border-slate-300 dark:border-slate-400 rounded-xl p-4">
            <div className="flex flex-col gap-3 font-medium">
                <div className={`${colorType[color]} text-sm`}>
                    {title}
                </div>
                <div className="text-lg text-slate-700">
                    {value} تومان
                </div>
            </div>
        </div>
    )
}