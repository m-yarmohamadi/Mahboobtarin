export default function TeacherDetails() {
    return (
        <div className="w-full bg-white border border-slate-200 dark:border-slate-500 rounded-lg p-6">
            <h2 className="font-bold text-primary-01 mb-7">
                اطلاعات مدرس دوره
            </h2>
            <div className="flex items-center gap-3">
                <div className="w-16 h-16">
                    <img
                        src={"/images/user.png"}
                        alt=""
                        className="w-full h-full object-cover object-center rounded-full"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <h4 className="text-slate-900 font-semibold">
                        نام مدرس
                    </h4>
                    <span className="text-slate-800 text-sm">
                        تخصص
                    </span>
                </div>
            </div>
        </div>
    )
}
