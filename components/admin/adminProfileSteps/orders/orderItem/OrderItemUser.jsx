export default function OrderItemUser({ user }) {
    return (
        <div className="flex items-center gap-2">
            <div className="relative">
                <div className="w-12 h-12">
                    <img src={user.avatar.length > 0 ? user.avatar[0].path : "/images/user.png"} alt="user" className="w-full h-full object-cover object-center rounded-full" />
                </div>
            </div>
            <div className="flex flex-col">
                <span className="text-sm font-bold text-slate-800 truncate">
                    {user?.name} {user?.lastname}
                </span>
                <span className="text-xs text-slate-600">
                    @{user.unique_url_id}
                </span>
                {/* <span className="text-xs text-slate-600">
                    برنامه نویس
                </span> */}
            </div>
        </div>
    )
}
