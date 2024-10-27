export default function InvatedList() {
    return (
        <div>
            <h2 className="text-textDefault font-medium pb-3">
                کاربران دعوت شده از طرف شما
            </h2>
            <div className="w-full grid grid-cols-1 sm:grid-cols-2 gap-4">
                {Array(3).fill({}).map((item, index) => (
                    <div key={index} className="w-full flex items-center gap-2 p-4 bg-slate-300 dark:bg-slate-400 rounded-lg">
                        <div className="text-slate-800">
                            نام کاربر
                        </div>
                        <div className="text-slate-800">
                            -
                        </div>
                        <div className="text-slate-700 text-sm">
                            تاریخ عضویت
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}
