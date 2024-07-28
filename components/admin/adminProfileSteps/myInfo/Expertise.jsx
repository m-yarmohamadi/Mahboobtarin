import Input from "@/tools/Input";
import Select from "@/tools/Select";
import { useEffect, useState } from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import { IoMdAdd } from "react-icons/io";


const expertise = [
    { id: 0, label: 'یک گزینه را انتخاب کنید', value: '' },
    { id: 1, label: 'پزشکی', value: 'medical' },
    { id: 2, label: 'سینما', value: 'cinema' },
    { id: 3, label: 'نقاشی', value: 'Painting' },
    { id: 4, label: 'معماری', value: 'architecture' },
];

export default function Expertise({ formik }) {
    const [list, setList] = useState(formik.values.expertise || []);
    const [selected, setSelected] = useState({ title: 0, subject: "" });

    const addExpertise = () => {
        if (selected.title !== 0 && selected.subject !== 0) {
            formik.setFieldValue("expertise", [...formik.values.expertise, { title: selected.title, subject: selected.subject }]);
            setSelected({ title: 0, subject: "" });
            // formik.setFieldValue("expertise", list);
        }
    }

    const removeExpertise = (value) => {
        formik.setFieldValue("expertise", formik.values.expertise.filter((i) => formik.values.expertise.indexOf(i) !== formik.values.expertise.indexOf(value)));
    }

    return (
        <div className="lg:col-span-2">
            <div className="flex items-end gap-4">
                <div className="flex-1 flex flex-col lg:flex-row gap-4">
                    <Select
                        label="تخصص"
                        options={expertise}
                        value={selected.title}
                        onChange={(e) => setSelected((perv) => ({ ...perv, title: e.target.value }))}
                    />
                    <Input
                        label="عنوان تخصص"
                        value={selected.subject}
                        onChange={(e) => setSelected((perv) => ({ ...perv, subject: e.target.value }))}
                    />
                </div>
                <button onClick={addExpertise} type="button" className="btn btn--outline !p-2 !rounded-full mb-1">
                    <IoMdAdd className="w-6 h-6" />
                </button>
            </div>
            {formik.values.expertise.length !== 0 && formik.values.expertise &&
                <div className="w-full border border-slate-300 rounded-md mt-3">
                    {formik.values.expertise.map((item, index) => (
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
                            <button onClick={() => removeExpertise(item)} type="button" >
                                <HiOutlineTrash className="w-5 h-5 text-red-600" />
                            </button>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}
