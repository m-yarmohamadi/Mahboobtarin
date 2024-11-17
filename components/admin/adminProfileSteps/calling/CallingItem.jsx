import { deleteRequest } from "@/services/expertDashboardService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { HiOutlineTrash } from "react-icons/hi";

export default function CallingItem({ data, isDelete = false }) {

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
        <div className="flex flex-col p-4 bg-slate-200 border border-slate-300 rounded-xl relative">
            <div className="aspect-w-16 aspect-h-11 rounded-lg overflow-hidden mb-4">
                <img src={data?.picture} alt="" className="w-full h-full object-cover object-center" />
            </div>

            {isDelete &&
                <button onClick={() => deleteRequestHandler(data.id)} className='btn btn--danger absolute top-6 left-6 !p-2'>
                    <HiOutlineTrash className='w-5 h-5' />
                </button>
            }

            <div className="">
                <h4 className="text-slate-800 font-bold pb-1">
                    {data?.title}
                </h4>
                <span className="text-xs text-slate-500">
                    {data?.category}
                </span>
                <p className="text-sm font-medium text-slate-700 pt-2 leading-6">
                    {data?.description}
                </p>
            </div>
        </div>
    )
}
