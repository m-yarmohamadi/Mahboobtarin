import Input from "@/tools/Input";
import Select from "@/tools/Select";
import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import { IoMdAdd } from "react-icons/io";

const grade = [
    { id: 0, label: 'یک گزینه را انتخاب کنید', value: '' },
    { id: 1, label: 'زیر دیپلم', value: 'underDiploma' },
    { id: 2, label: 'دیپلم', value: 'diploma' },
    { id: 3, label: 'کاردانی', value: 'AssociateDegree' },
    { id: 4, label: 'کارشناسی', value: 'BS' },
    { id: 5, label: 'کارشناسی ارشد', value: 'MSc' },
    { id: 6, label: 'دکتری', value: 'P.H.D' },
];

export default function Grade() {
    const [list, setList] = useState([]);
    const [selected, setSelected] = useState({ title: 0, subject: "" });

    const addGrade = () => {
        if (selected.title !== 0 && selected.subject !== 0) {
            setList((pervList) => [
                ...pervList,
                { title: selected.title, subject: selected.subject }
            ]);
            setSelected({ title: 0, subject: "" });
        }
    }

    const removeGrade = (value) => {
        setList((pervList) => pervList.filter((i) => list.indexOf(i) !== list.indexOf(value)))
    }

    return (
        <div className="lg:col-span-2">
            <div className="flex items-end gap-4">
                <div className="flex-1 flex flex-col lg:flex-row gap-4">
                    <Select
                        label="مقطع تحصیلی"
                        options={grade}
                        value={selected.title}
                        onChange={(e) => setSelected((perv) => ({ ...perv, title: e.target.value }))}
                    />
                    <Input
                        label="نام محل تحصیل"
                        value={selected.subject}
                        onChange={(e) => setSelected((perv) => ({ ...perv, subject: e.target.value }))}
                    />
                </div>
                <button onClick={addGrade} type="button" className="btn btn--outline !p-2 !rounded-full mb-1">
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
                                <span className="text-xs">
                                    {item.subject}
                                </span>
                            </div>
                            <button onClick={() => removeGrade(item)} type="button" >
                                <HiOutlineTrash className="w-5 h-5 text-red-600" />
                            </button>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}
