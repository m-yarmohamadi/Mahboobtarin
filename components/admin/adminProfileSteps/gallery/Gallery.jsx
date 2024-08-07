import Modal from "@/components/Modal";
import { useState } from "react";
import { MdAdd } from "react-icons/md";
import CreateGalleryForm from "./CreateGalleryForm";
import { HiOutlineTrash } from "react-icons/hi2";

export default function Gallery() {
    const [galleryList, setGalleryList] = useState([]);
    const [open, setOpen] = useState(false);

    const deleteHandler = (id) => {
        setGalleryList((pervList) => pervList.filter((g) => g.id !== id));
    }
    
    return (
        <div>
            <div className="w-full flex items-center justify-between mb-7 pb-4 border-b border-b-slate-300">
                <div className="text-2xl text-gray-800 font-semibold">
                    گالری
                </div>
                <button onClick={() => setOpen(true)} className="btn btn--primary px-6">
                    افزودن <MdAdd className="w-5 h-5" />
                </button>
            </div>
            <div className="w-full grid grid-cols-1 gap-4 md:grid-cols-2">
                {galleryList.map((item, index) => (
                    <GalleryItem key={index} data={item} onDelete={()=>deleteHandler(item.id)}/>
                ))}
            </div>

            <Modal open={open} onClose={() => setOpen(false)} title="ویدیو/تصویر جدید">
                <CreateGalleryForm
                    onClose={() => setOpen(false)}
                    setGallery={setGalleryList}
                />
            </Modal>
        </div>
    )
}

function GalleryItem({ data, onDelete }) {
    
    return (
        <div className="flex flex-col gap-2 relative">
            {
                data.src.type.split("/")[0] === "image" ?

                    <div className="aspect-video rounded-lg overflow-hidden">
                        <img
                            src={URL.createObjectURL(data.src)}
                            alt=""
                            className="w-full h-full object-cover"
                        />
                    </div>
                    :
                    <div className="aspect-video rounded-lg overflow-hidden">
                        <video controls className="w-full h-full object-cover">
                            <source src={URL.createObjectURL(data.src)} type="video/mp4" />
                        </video>
                    </div>
            }
            <h3 className="w-full text-xl text-gray-800 font-semibold">
                {data.title}
            </h3>
            <button onClick={onDelete} className="btn btn--danger absolute top-4 left-4 !p-3">
                <HiOutlineTrash className="w-5 h-5"/>
            </button>
        </div>
    )
}