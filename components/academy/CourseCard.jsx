import { deleteAcademy } from "@/services/academyService";
import numberWithCommas from "@/utils/numberWithCommas";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import toast from "react-hot-toast";
import { HiTrash } from "react-icons/hi2";

export default function CourseCard({ course, isDelete = false }) {
    const { mutateAsync: mutateDeleteAcademy } = useMutation({ mutationFn: deleteAcademy });
    const queryClient = useQueryClient();

    const addDiscount = (item, discount) => {
        return item - ((item * discount) / 100)
    }

    const deleteAcademyHandler = async () => {
        try {
            const { data } = await mutateDeleteAcademy(course.id);
            if (data) {
                toast.success("دوره مورد نظر حذف شد");
                queryClient.invalidateQueries({ queryKey: ["get-dashboard-academy"] });
            }
        } catch (error) {
            if (error?.response?.status === 401) {
                window.location.reload();
                return;
            }

            toast.error("خطایی رخ داده است!");
        }
    }

    return (
        <div className="relative">
            {isDelete &&
                <div className="absolute top-5 left-5 z-10">
                    <button type="button" onClick={deleteAcademyHandler} className="btn btn--danger !p-2">
                        <HiTrash className="w-5 h-5" />
                    </button>
                </div>
            }

            <Link href={`/academy/${course?.slug}`} className="block  border border-slate-300 dark:border-slate-400 p-2 rounded-lg">
                <div className="mb-2">
                    <div className="aspect-w-16 aspect-h-10">
                        {course?.photos &&
                            <img src={course?.photos[0]?.path} alt={course?.title} className="w-full h-full object-cover object-center rounded-md" />
                        }
                    </div>
                </div>



                <div className="space-y-2">
                    <h2 className="text-slate-800 font-semibold">
                        {course?.title}
                    </h2>
                    <div className="text-sm font-medium text-slate-500 dark:text-slate-700">
                        مدرس:
                        <span>
                            {course?.teacher}
                        </span>
                    </div>
                </div>

                <div className="mt-3 flex items-center justify-between">
                    <div className="text-sm text-slate-800 font-bold flex items-center gap-1">
                        {course?.numOfStudents || 0}
                        <span className="text-slate-500 dark:text-slate-700 font-normal">
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

                <div className="mt-5 flex items-center gap-1 justify-between p-1 rounded-md">
                    <div className="flex items-center gap-1">
                        {course?.discount_price &&
                            <>
                                <span className='text-sm text-[#fff] bg-error px-2 py-1 rounded-md'>{course?.discount_price} %</span>
                                <p className='line-through  text-slate-500'>{numberWithCommas(course?.price)}</p>
                            </>
                        }
                    </div>
                    <div className="text-slate-800 font-semibold ">
                        {numberWithCommas(course?.discount_price ? addDiscount(course?.price, course?.discount_price) : course?.price)}
                        <span className="text-xs font-normal">
                            تومان
                        </span>
                    </div>
                </div>
            </Link>
        </div>
    )
}
