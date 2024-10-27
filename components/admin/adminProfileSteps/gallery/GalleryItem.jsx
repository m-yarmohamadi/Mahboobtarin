import { deleteGallery } from "@/services/expertDashboardService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { HiOutlineTrash } from "react-icons/hi2";

export default function GalleryItem({ data }) {
    const { mutateAsync: mutateDeleteGallery } = useMutation({ mutationFn: deleteGallery });
    const queryClient = useQueryClient();

    const deleteGalleryHandler = async (id) => {
        const formData = new FormData();
        formData.append("id", id);

        try {
            const data = await mutateDeleteGallery(formData);

            if (data) {
                toast.success("فایل مورد نظر حذف شد");
                queryClient.invalidateQueries({ queryKey: ['get-expertise-user-by-id'] });
            }

        } catch (error) {
            if (error?.response?.status === 401) {
                toast.error("لطفا وارد حساب کاربری خود شوید");
                window.location.reload();
            } else {
                toast.error("پیدا نشد!");
            }
        }
    }

    return (
        <div className='flex flex-col gap-2 relative bg-primary-01 bg-opacity-05 rounded-lg p-1'>
            {data.type === 'gallery-image' ? (
                <div className='aspect-w-16 aspect-h-9 rounded-lg overflow-hidden'>
                    <img
                        src={data.path}
                        alt=''
                        className='w-full h-full object-cover'
                    />
                </div>
            ) : (
                <div className='aspect-w-16 aspect-h-9 rounded-lg overflow-hidden'>
                    <video
                        controls
                        className='w-full h-full object-cover'>
                        <source
                            src={data.path}
                            type='video/mp4'
                        />
                    </video>
                </div>
            )}
            <h3 className='w-full text-md text-slate-800 font-bold px-2'>{data.title}</h3>
            <button onClick={() => deleteGalleryHandler(data.id)} className='btn btn--danger absolute top-2 left-2 !p-1'>
                <HiOutlineTrash className='w-5 h-5' />
            </button>
        </div>
    );
}
