
export default function CourseTeacher({ teacher }) {
    return (
        <div className="w-full bg-white p-4 rounded-xl lg:shadow-2xl">
            <div className="text-lg font-bold text-primary-01 pb-6">
                مدرس دوره
            </div>
            <div className="flex items-center justifybetween gap-4">
                <div className="w-16 h-16 overflow-hidden ring ring-slate-200 rounded-full">
                    <img src={teacher?.avatar.length > 0 ? teacher?.avatar[0]?.path : "/images/user.png"} alt="" className="rounded-full w-full h-full object-cover object-center" />
                </div>
                <div className="flex flex-col gap-1">
                    <div className="font-bold text-slate-700">
                        {teacher?.name || "---"} {teacher?.lastname || "---"}
                    </div>
                    <div className="text-sm text-slate-500">
                        {teacher?.expertises.map((item, index) => (
                            <div key={index} className="group">
                                {item.subject}
                                <span className="group-last:hidden">،</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
