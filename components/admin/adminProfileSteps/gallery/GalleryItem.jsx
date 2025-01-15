import { deleteGallery } from "@/services/expertApi/galleryService";
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
            {data.type === 'gallery-image' && (
                <div className='aspect-w-16 aspect-h-9 rounded-lg overflow-hidden'>
                    <img
                        src={data.path}
                        alt={data.title}
                        className='w-full h-full object-cover'
                    />
                </div>
            )}
            {data.type === 'gallery-video' && (
                <div className='aspect-w-16 aspect-h-9 rounded-lg overflow-hidden'>
                    {data.script !== "null" ?
                        <div dangerouslySetInnerHTML={{ __html: data.script }} className="!w-full !h-full !object-cover"></div>
                        :
                        <video
                            controls
                            className='w-full h-full object-cover'>
                            <source
                                src={data.path}
                                type='video/mp4'
                            />
                        </video>
                    }
                </div>
            )}
            {data.type === 'gallery-audio' && (
                <div className='aspect-w-16 aspect-h-9 rounded-lg overflow-hidden'>
                    {data.script !== "null" ?
                        <div dangerouslySetInnerHTML={{ __html: data.script }} className="!w-full !h-full !object-cover"></div>
                        :
                        <audio controls className="w-full">
                            <source src={data.path} type="audio/mpeg" />
                            مرورگر شما پخش صوت را پشتیبانی نمی‌کند.
                        </audio>
                    }
                </div>
            )}
            <h3 className='w-full text-md text-slate-800 font-bold px-2'>{data.title}</h3>
            <button onClick={() => deleteGalleryHandler(data.id)} className='btn btn--danger absolute top-2 left-2 !p-1'>
                <HiOutlineTrash className='w-5 h-5' />
            </button>
        </div>
    );
}
