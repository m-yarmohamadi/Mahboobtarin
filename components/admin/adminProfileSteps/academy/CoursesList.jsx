import CourseCard from "@/components/academy/CourseCard";
import { useDashboardAcademy } from "@/hooks/useAcademy";
import Loading from "@/tools/Loading";
import PaginationComponent from "@/tools/PaginationComponent";
import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function CoursesList() {
    const searchParams = useSearchParams();
    const qs = searchParams.get('page') ? `page=${searchParams.get('page')}` : '';
    const { academy, isLoading } = useDashboardAcademy(qs);

    if (isLoading) {
        return (
            <div className='w-full h-full flex items-center justify-center'>
                <Loading customeColor="#0693a4" />
            </div>
        )
    }

    return (
        <div>
            <div className='w-full flex items-end justify-between mb-7 pb-4 border-b border-b-slate-300 dark:border-b-slate-400'>
                <div className='text-xl text-slate-800 font-semibold'>آموزشگاه</div>
                <Link href="/admin/academy/create" className='btn btn--primary !px-5'>
                    <span>افزودن دوره جدید</span>
                </Link>
            </div>

            <div className="w-full flex flex-col gap-10 items-center">
                {
                    academy?.data && academy?.data?.length ?
                        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                            {academy?.data?.map((course) => (
                                <CourseCard key={course?.id} course={course} />
                            ))}
                        </div>
                        :
                        <div className="flex justify-center py-8 w-full text-slate-500">
                            دوره ای موجود نیست!
                        </div>
                }

                <PaginationComponent totalPages={academy?.total} page={academy?.current_page} />
            </div>
        </div>
    )
}
