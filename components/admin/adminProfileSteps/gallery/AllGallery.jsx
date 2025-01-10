import useGetExpertiseUser from "@/hooks/useExpertiseUser";
import GalleryItem from "./GalleryItem";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import Modal from "@/components/Modal";
import { useState } from "react";
import ChangeOrderGallery from "./ChangeOrderGallery";

export default function AllGallery({ user }) {
    const { data, isLoading: isGetGallery } = useGetExpertiseUser(user?.unique_url_id);
    const { gallery } = data?.user || {};
    const [open, setOpen] = useState(false);
    const sortedGallery = !isGetGallery && gallery.sort((a, b) => Number(a.ord) - Number(b.ord));

    if (isGetGallery) return null;

    return (
        <div className="w-full">
            <div className='w-full flex items-end justify-between mb-7 pb-1'>
                <button
                    onClick={() => setOpen(!open)}
                    className='btn btn--primary px-3 flex justify-between items-center'>
                    <span>{open ? "تایید" : "ویرایش ترتیب نمایش"}</span>
                </button>
            </div>
            {
                open ?
                    <ChangeOrderGallery onClose={() => setOpen(false)} gallery={sortedGallery} />
                    :
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:grid-cols-4">
                        {sortedGallery?.map((item, index) => (
                            <GalleryItem
                                key={index}
                                data={item}
                            />
                        ))}
                    </div>
            }
        </div>
    )
}
