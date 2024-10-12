import numberWithCommas from "@/utils/numberWithCommas";
import Link from "next/link";

export default function CourseCard({ course }) {
    const addDiscount = (item, discount) => {
        return item - ((item * discount) / 100)
    }

    return (
        <Link href={`/academy/${course?.slug}`} className="block border border-gray-300 p-2 rounded-lg">
            <div className="mb-2">
                <div className="aspect-w-16 aspect-h-10">
                    <img src={course?.photos[0]?.path} alt={course?.title} className="w-full h-full object-cover object-center rounded-md" />
                </div>
            </div>

            <div className="space-y-2">
                <h2 className="text-gray-800 font-semibold">
                    {course?.title}
                </h2>
                <div className="text-sm font-medium text-gray-500">
                    مدرس:
                    <span>
                        {course?.teacher}
                    </span>
                </div>
            </div>

            <div className="mt-3 flex items-center justify-between">
                <div className="text-sm text-gray-800 font-bold">
                    {course?.numOfStudents || 0}
                    <span className="text-gray-400 font-normal">
                        دانشجو
                    </span>
                </div>
                <div className="w-14 h-14 flex items-center justify-center rounded-full overflow-hidden">
                    <img
                        className={"object-cover w-full h-full"}
                        src={course?.teacherPic || "/images/user.png"}
                        alt=''
                    />
                </div>
            </div>

            <div className="mt-5 flex items-center gap-1 justify-between p-1 rounded-md bg-slate-200">
                <div className="flex items-center gap-1">
                    {course?.discount_price &&
                        <>
                            <span className='text-sm text-white bg-error px-2 py-1 rounded-md'>{course?.discount_price} %</span>
                            <p className='line-through  text-gray-400'>{numberWithCommas(course?.price)}</p>
                        </>
                    }
                </div>
                <div className="text-gray-800 font-semibold ">
                    {numberWithCommas(course?.discount_price ? addDiscount(course?.price, course?.discount_price) : course?.price)}
                    <span className="text-xs font-normal">
                        تومان
                    </span>
                </div>
            </div>
        </Link>
    )
}
