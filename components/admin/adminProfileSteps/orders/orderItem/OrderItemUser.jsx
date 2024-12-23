export default function OrderItemUser() {
    return (
        <div className="flex items-center gap-2">
            <div className="relative">
                <div className="w-12 h-12">
                    <img src="/images/user.png" alt="user" className="w-full h-full object-cover object-center rounded-full" />
                </div>
            </div>
            <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-800 truncate">
                    محمدرضا فرامرزی
                </span>
                <span className="text-xs text-slate-600">
                    @username
                </span>
                <span className="text-xs text-slate-600">
                   برنامه نویس
                </span>
            </div>
        </div>
    )
}
