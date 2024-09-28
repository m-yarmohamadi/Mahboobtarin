import Input from "@/tools/Input";
import { useState } from "react"
import { HiOutlineTrash } from "react-icons/hi2";
import CreateInterestForm from "./CreateInterestForm";
import { FaCheck } from "react-icons/fa6";
import { MdOutlineModeEdit } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { useGetFavorites } from "@/hooks/useDashboard";
import Loading from "@/tools/Loading";

const initialList = [
    { id: 1, value: "", label: "رنگ", default: true },
    { id: 2, value: "", label: "تیم ورزشی", default: true },
    { id: 3, value: "", label: "شاعر", default: true },
    { id: 4, value: "", label: "رشته ورزشی", default: true },
    { id: 5, value: "", label: "مرکز خرید", default: true },
    { id: 6, value: "", label: "پاتوق", default: true },
]

export default function Mahbobtarin() {
    const [list, setList] = useState(initialList);
    const [newInterest, setNewInterest] = useState(false);
    const { favorites, isGetFavorites } = useGetFavorites();

    const editHandler = (newItem, newValue) => {
        setList((prevList) =>
            prevList.map((i) =>
                i.id === newItem.id
                    ? { ...i, value: newValue }
                    : i
            )
        );

    }

    const deleteHandler = (id) => {
        setList((prev) => prev.filter((m) => Number(m.id) !== Number(id)));
    }

    if (isGetFavorites) return (
        <div className='w-full h-full flex items-center justify-center'>
            <Loading customeColor="#0693a4" />
        </div>
    )

    return (
        <div>
            <div className='flex flex-col justify-center items-center gap-3 py-4 border-b border-slate-300'>
                <h1 className='text-lg text-gray-800 font-bold'>محبوب ترین های شما</h1>
                <p className='text-sm text-gray-600'>
                    محبوب ترین های خود را در این بخش اضافه کنید
                </p>
            </div>

            <div className="py-7">
                <button onClick={() => setNewInterest(true)} className="btn btn--primary">
                    ایجاد علاقه جدید
                </button>
            </div>

            <div className="w-full grid grid-cols-1 md:grid-cols-2 gap-6">
                {!isGetFavorites && favorites.map((item, index) => (
                    <MahbobtarinItem
                        key={index}
                        item={item}
                        onDelete={deleteHandler}
                        onEdit={editHandler}
                    />
                ))}
            </div>

            <CreateInterestForm setList={setList} open={newInterest} onClose={() => setNewInterest(false)} />
        </div>
    )
}

function MahbobtarinItem({ item, onDelete, onEdit }) {
    const [edit, setEdit] = useState(false);
    const [text, setText] = useState(item.value || "");

    return (
        <div className="flex flex-col gap-2">
            <label className='text-sm font-bold px-2 inline-block text-slate-800'>
                {item?.popularname?.name}
            </label>
            <div className="w-full flex items-center bg-transparent text-gray-700 border  border-primary-01 border-opacity-25 rounded-md">
                {
                    edit ?
                        <input
                            className='text-sm appearance-none border-none outline-none flex-1 bg-transparent py-2 px-4'
                            onChange={(e) => setText(e.target.value)}
                            value={text}
                            placeholder={'علاقه خود را وارد کنید'}
                        />
                        :
                        <div className="text-sm flex-1 py-2 px-4 !h-10">
                            {item?.value}
                        </div>
                }
                {/* {
                    edit &&
                    <div className="flex items-center">
                        <button
                            onClick={() => {
                                onEdit(item, text);
                                setEdit(false);
                                setText(item.value)
                            }}
                            type="button"
                            className="btn !p-2 border-r !rounded-s-none border-primary-01 border-opacity-25"
                        >
                            <FaCheck className="w-5 h-5 text-green-500" />
                        </button>
                        <button onClick={() => setEdit(false)} type="button" className="btn !p-2 border-r !rounded-s-none border-primary-01 border-opacity-25">
                            <IoCloseSharp className="w-5 h-5 text-red-600" />
                        </button>
                    </div>
                } */}
                {/* {
                    !edit &&
                    <button onClick={() => setEdit(true)} type="button" className="btn !p-2 border-r !rounded-s-none border-primary-01 border-opacity-25">
                        <MdOutlineModeEdit className="w-5 h-5" />
                    </button>
                }
                {
                    !item.default &&
                    <button onClick={() => onDelete(item.id)} type="button" className="btn !p-2 border-r !rounded-s-none border-primary-01 border-opacity-25">
                        <HiOutlineTrash className="w-5 h-5 text-red-600" />
                    </button>
                } */}
            </div>
        </div>
    )
}
