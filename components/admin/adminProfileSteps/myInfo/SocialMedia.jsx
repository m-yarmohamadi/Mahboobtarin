import { SocialMedias } from "@/data/SocialMedias";
import Input from "@/tools/Input";
import Select from "@/tools/Select";
import Link from "next/link";
import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import { IoMdAdd } from "react-icons/io";

export default function SocialMedia() {
    const [list, setList] = useState([]);
    const [selected, setSelected] = useState({ title: 0, subject: "" });

    const addSocialmedia = () => {
        if (selected.title !== 0 && selected.subject !== 0) {
            setList((pervList) => [
                ...pervList,
                { title: selected.title, subject: selected.subject }
            ]);
            setSelected({ title: 0, subject: "" });
        }
    }

    const removeSocialmedia = (value) => {
        setList((pervList) => pervList.filter((i) => list.indexOf(i) !== list.indexOf(value)))
    }

    return (
        <div className="lg:col-span-2">
            <div className="flex items-end gap-4">
                <div className="flex-1 flex flex-col lg:flex-row gap-4">
                    <Select
                        label="شبکه های اجتماعی"
                        smallDesc="بعد از وارد کردن اطلاعات بر روی گزینه بعلاوه کلیک کنید"
                        options={[{id:0, value:"", label:"یک گزینه را انتخاب کنید"}, ...SocialMedias]}
                        value={selected.title}
                        onChange={(e) => setSelected((perv) => ({ ...perv, title: e.target.value }))}
                    />
                    <Input
                        label="آدرس صفحه"
                        value={selected.subject}
                        onChange={(e) => setSelected((perv) => ({ ...perv, subject: e.target.value }))}
                    />
                </div>
                <button onClick={addSocialmedia} type="button" className="btn btn--outline !p-2 !rounded-full mb-1">
                    <IoMdAdd className="w-6 h-6" />
                </button>
            </div>
            {list.length !== 0 &&
                <div className="w-full border border-slate-300 rounded-md mt-3">
                    {list.map((item, index) => (
                        <div key={index} className="flex items-center justify-between gap-4 p-3 border-b border-slate-300 last:border-0">
                            <div className="flex-1 flex items-center gap-1">
                                <p className="text-sm font-medium">
                                    {item.title}
                                </p>
                                -
                                <Link href={item.subject} target="_blank" className="text-xs">
                                    {item.subject}
                                </Link>
                            </div>
                            <button onClick={() => removeSocialmedia(item)} type="button" >
                                <HiOutlineTrash className="w-5 h-5 text-red-600" />
                            </button>
                        </div>
                    ))}
                </div>
            }
        </div>
    )

}
