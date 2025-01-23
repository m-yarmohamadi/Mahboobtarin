import { useGetRequests } from "@/hooks/expertHooks/useCalling";
import CallingItem from "./CallingItem";
import Loading from "@/tools/Loading";
import { MdEdit } from "react-icons/md";
import Link from "next/link";
import { HiOutlineTrash } from "react-icons/hi";
import useMainPage from "@/hooks/useMainPage";
import { toPersianDateLong } from "@/utils/toPersianDate";
import { deleteRequest } from "@/services/expertApi/callingService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function AddedCalling() {
    const { requests, isGetRequests } = useGetRequests();

    if (isGetRequests) return (
        <div className='w-full h-full flex items-center justify-center'>
            <Loading customeColor="#0693a4" />
        </div>
    )

    return (
        <div className="w-full grid grid-cols-1 gap-3 md:grid-cols-2">
            {requests?.registered?.map((item) => (
                <CallingRegisteredItem key={item.id} data={item} />
            ))}
        </div>
    )
}

function CallingRegisteredItem({ data }) {
    const { categories, isLoading } = useMainPage();
    const categoryLabel = !isLoading && categories.filter((c) => Number(c.id) === Number(data.category))[0]?.name;

    const { mutateAsync } = useMutation({ mutationFn: deleteRequest });
    const queryClient = useQueryClient();

    const deleteRequestHandler = async (id) => {
        try {
            const data = await mutateAsync(id.toString());

            if (data) {
                toast.success("فراخوان مورد نظر حذف شد");
                queryClient.invalidateQueries({ queryKey: ['get-requests'] });
            }

        } catch (error) {
            console.log(error);

            if (error?.response?.status === 401) {
                toast.error("لطفا وارد حساب کاربری خود شوید");
                window.location.reload();
            } else {
                toast.error("پیدا نشد!");
            }
        }
    }

    return (
        <div className="flex flex-col p-2 bg-slate-200 border border-slate-300 rounded-xl relative">
            <Link href={`/requests/${data.id}`} className="aspect-w-16 aspect-h-11 rounded-lg overflow-hidden mb-4">
                <img src={data?.photos[0]?.path} alt="" className="w-full h-full object-cover object-center" />
            </Link>

            <div className="absolute top-6 left-6 space-y-2">
                <button onClick={() => deleteRequestHandler(data.id)} className='btn btn--danger !p-2'>
                    <HiOutlineTrash className='w-5 h-5' />
                </button>
                <Link href={`/admin/calling/edit/${data.id}`} className='btn btn--danger !bg-secondary-01 !p-2'>
                    <MdEdit className='w-5 h-5' />
                </Link>
            </div>

            <div>
                <Link href={`/requests/${data.id}`}>
                    <h4 className="text-slate-800 font-bold pb-1">
                        {data?.title}
                    </h4>
                </Link>
                <span className="text-xs text-slate-500">
                    {categoryLabel}
                </span>
                <div className="w-full flex flex-col min-[430px]:flex-row gap-4 min-[430px]:items-center justify-between mt-6">
                    <div className="grid grid-cols-2 gap-x-4 gap-y-2 flex-1 truncate">
                        <div className="flex items-center gap-1 text-xs text-slate-800">
                            <span className="font-medium">
                                تاریخ ثبت:
                            </span>
                            <span className="text-primary-01">
                                {toPersianDateLong(data.created_at)}
                            </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-800">
                            <span className="font-medium">
                                کل متقاضیان:
                            </span>
                            <span className="text-primary-01">
                                150
                            </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-800">
                            <span className="font-medium">
                                تاریخ انتشار:
                            </span>
                            <span className="text-primary-01">
                                {toPersianDateLong(data.updated_at)}
                            </span>
                        </div>
                        <div className="flex items-center gap-1 text-xs text-slate-800">
                            <span className="font-medium">
                                متقاضیان جدید:
                            </span>
                            <span className="text-yellow-400">
                                150
                            </span>
                        </div>
                    </div>

                    <div className="self-end">
                        <Link href={`/admin/calling/applicants/${data.id}`} className="btn btn--primary !text-xs !p-1 mb-2">
                            لیست متقاضیان
                        </Link>
                        <div className="btn btn--secondary !text-xs !p-1">
                            وضعیت : {data?.status === "1" ? "فعال" : "غیر فعال"}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
