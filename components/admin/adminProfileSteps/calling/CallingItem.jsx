import useMainPage from "@/hooks/useMainPage";
import Link from "next/link";
import { HiOutlineTrash } from "react-icons/hi";

export default function CallingItem({ data, isDelete = false }) {
    const { categories, isLoading } = useMainPage();
    const categoryLabel = !isLoading && categories.filter((c) => Number(c.id) === Number(data.category))[0]?.name;


    return (
        <div className="flex flex-col p-4 bg-slate-200 border border-slate-300 rounded-xl relative">
            <Link href={`/requests/${data.id}`} className="aspect-w-16 aspect-h-11 rounded-lg overflow-hidden mb-4">
                <img src={data?.photos[0]?.path} alt="" className="w-full h-full object-cover object-center" />
            </Link>

            {isDelete &&
                <button onClick={() => deleteRequestHandler(data.id)} className='btn btn--danger absolute top-6 left-6 !p-2'>
                    <HiOutlineTrash className='w-5 h-5' />
                </button>
            }

            <Link href={`/requests/${data.id}`}>
                <h4 className="text-slate-800 font-bold pb-1">
                    {data?.title}
                </h4>
                <span className="text-xs text-slate-500">
                    {categoryLabel}
                </span>
                <p className="text-sm font-medium text-slate-700 pt-2 leading-6">
                    {data?.description}
                </p>
            </Link>
        </div>
    )
}
