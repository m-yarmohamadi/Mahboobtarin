export default function RequestsUsersItemStatus({ status }) {
    const statusType = {
        0: { className: "bg-red-500/10 text-red-500", label: "لغو شده توسط کاربر" },
        1: { className: "bg-primary-01 text-[#fff]", label: "تایید نهایی" },
        2: { className: "bg-red-500 text-[#fff]", label: "رد شده توسط عرضه کننده" },
        3: { className: "bg-gray-800 text-[#fff]", label: "انجام شده" },
        4: { className: "bg-secondary-03 text-[#fff]", label: "در انتظار تایید عرضه کننده" },
        5: { className: "bg-green-600/30 text-green-600", label: "تایید اولیه" },
    }

    return (
        <div className="w-full flex items-center gap-4">
            <div className="text-sm font-bold text-slate-800">
                وضعیت
            </div>
            <div className={`${statusType[status].className} rounded-xl flex-1 text-sm text-center font-semibold p-2`}>
                {statusType[status].label}
            </div>
        </div>
    )

}
