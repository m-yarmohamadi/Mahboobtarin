import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useState } from "react";
import { IoReorderThree } from "react-icons/io5";
import { FaVoicemail } from "react-icons/fa6";
import { addGallery } from "@/services/expertApi/galleryService";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function ChangeOrderGallery({ onClose, gallery }) {
    const [orderGallery, setOrderGallery] = useState(gallery || []);
    const { mutateAsync: mutateChangeOrder } = useMutation({ mutationFn: addGallery });
    const queryClient = useQueryClient();

    const handleDragEnd = async (result) => {
        if (!result.destination) return;
        const reorderedItems = Array.from(orderGallery);
        const [movedItem] = reorderedItems.splice(result.source.index, 1);
        reorderedItems.splice(result.destination.index, 0, movedItem);
        const updateOrder = reorderedItems.map((item, index) => ({
            ...item,
            ord: String(index),
        }));
        setOrderGallery(updateOrder)

        const formData = new FormData();

        if (movedItem.src) {
            formData.append("file", movedItem.src);
        } else {
            formData.append("script", movedItem.script);
        }

        formData.append("title", movedItem.title);
        formData.append("type", movedItem.type.split("-")[1]);
        formData.append("id", movedItem.id);
        formData.append("ord", String(result.destination.index));

        try {
            const { data } = await mutateChangeOrder(formData);

            if (data) {
                queryClient.invalidateQueries({ queryKey: ["get-expertise-user-by-id"] });
                toast.success("ترتیب نمایش ویرایش شد");
            }

        } catch (error) {
            if (error?.response?.status === 401) {
                window.location.reload();
            }
        }
    };

    return (
        <DragDropContext onDragEnd={handleDragEnd} >
            <Droppable droppableId="gallery">
                {(provided) => (
                    <div {...provided.droppableProps} ref={provided.innerRef} >
                        {orderGallery?.map((item, index) => (
                            <Draggable key={item.id} draggableId={String(item.id)} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                        className="pb-6"
                                    >
                                        <div className="flex items-center gap-3 bg-slate-200 border border-slate-300 dark:border-slate-400 rounded-lg p-4">
                                            <IoReorderThree className="w-6 h-6 text-slate-800" />
                                            <div>
                                                {item.type === 'gallery-image' && (
                                                    <div className='w-[130px] h-[70px] rounded-lg overflow-hidden'>
                                                        <img
                                                            src={item.path}
                                                            alt=''
                                                            className='w-full h-full object-cover'
                                                        />
                                                    </div>
                                                )}
                                                {item.type === 'gallery-video' && (
                                                    <div className='w-[130px] h-[70px] rounded-lg overflow-hidden'>
                                                        <video
                                                            controls
                                                            className='w-full h-full object-cover'>
                                                            <source
                                                                src={item.path}
                                                                type='video/mp4'
                                                            />
                                                        </video>
                                                    </div>
                                                )}
                                                {item.type === 'gallery-audio' && (
                                                    <div className='w-[130px] h-[70px] flex items-center justify-center bg-slate-300 rounded-lg overflow-hidden'>
                                                        <FaVoicemail className="w-6 h-6 text-slate-800" />
                                                    </div>
                                                )}
                                            </div>
                                            <div className="text-sm font-bold text-slate-900">
                                                {item.title}
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </div>
                )}
            </Droppable>
        </DragDropContext>
    )
}
