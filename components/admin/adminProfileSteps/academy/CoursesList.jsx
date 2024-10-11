import Link from "next/link";

export default function CoursesList() {
    return (
        <div>
            <div className='w-full flex items-end justify-between mb-7 pb-4 border-b border-b-slate-300'>
                <div className='text-xl text-gray-800 font-semibold'>آموزشگاه</div>
                <Link href="/admin/academy/create" className='btn btn--primary !px-5'>
                    <span>افزودن دوره جدید</span>
                </Link>
            </div>
        </div>
    )
}
