import numberWithCommas from "@/utils/numberWithCommas";
import Link from "next/link";

export default function CourseCard({ course }) {
    return (
        <Link href={'/academy/1'} className="block border border-gray-300 p-2 rounded-lg">
            <div className="mb-2">
                <div className="aspect-w-16 aspect-h-10">
                    <img src={course.img} alt="" className="w-full h-full object-cover object-center rounded-md"/>
                </div>
            </div>

            <div className="space-y-2">
                <h2 className="text-gray-800 font-semibold">
                    {course.title}
                </h2>
                <div className="text-sm font-medium text-gray-500">
                    مدرس: 
                    <span>
                        {course.teacher}
                    </span>
                </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
                <div className="text-sm text-gray-800 font-bold">
                    {course.numOfStudents}
                    <span className="text-gray-400 font-normal">
                        دانشجو
                    </span>
                </div>
                <div className="w-14 h-14 rounded-full overflow-hidden">
                    <img src={course.teacherPic} alt="" className="w-full h-full"/>
                </div>
            </div>

            <div className="mt-5 text-gray-800 font-semibold flex items-center gap-1 justify-end p-1 rounded-md bg-slate-200">
                {numberWithCommas(course.price)}
                <span className="text-xs font-normal">
                    تومان
                </span>
            </div>
        </Link>
    )
}
