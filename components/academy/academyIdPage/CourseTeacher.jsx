
export default function CourseTeacher({ teacher }) {
    return (
        <div className="w-full bg-white p-3 rounded-xl border border-slate-300 dark:border-slate-400 flex items-center justify-between">
            <div className="flex flex-col gap-1">
                <div className="text-sm text-slate-700">
                    {teacher?.name || "---"} {teacher?.lastname || "---"}
                </div>
                <p className="text-xs text-slate-500">
                    تخصص
                </p>
            </div>
            <div className="w-12 h-12 overflow-hidden ring ring-slate-200 rounded-full">
                <img src="/images/user.png" alt="" className="rounded-full w-full h-full object-cover object-center" />
            </div>
        </div>
    )
}
