import Input from "@/tools/Input";
import Select from "@/tools/Select";
import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import { IoMdAdd } from "react-icons/io";

const gradeOptions = [
    { id: 0, label: 'یک گزینه را انتخاب کنید', value: '' },
    { id: 1, label: 'زیر دیپلم', value: 'زیر دیپلم' },
    { id: 2, label: 'دیپلم', value: 'دیپلم' },
    { id: 3, label: 'کاردانی', value: 'کاردانی' },
    { id: 4, label: 'کارشناسی', value: 'کارشناسی' },
    { id: 5, label: 'کارشناسی ارشد', value: 'کارشناسی ارشد' },
    { id: 6, label: 'دکتری', value: 'دکتری' },
];

export default function Grade({ formik }) {
    const [selected, setSelected] = useState({ title: 0, subject: "" });
    const { grade } = formik.values;

    const addGrade = () => {
        if (selected.title !== 0 && selected.subject !== "") {
            formik.setFieldValue("grade", [...grade, { title: selected.title, subject: selected.subject }]);
            setSelected({ title: 0, subject: "" });
        }
    }

    const removeGrade = (value) => {
        formik.setFieldValue("grade", grade.filter((i) => grade.indexOf(i) !== grade.indexOf(value)))
    }

    return (
        <div className="lg:col-span-2">
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                    <Select
                        label="مقطع تحصیلی"
                        smallDesc="بعد از وارد کردن اطلاعات بر روی گزینه بعلاوه کلیک کنید"
                        options={gradeOptions}
                        value={selected.title}
                        onChange={(e) => setSelected((perv) => ({ ...perv, title: e.target.value }))}
                    />
                </div>
                <div className="flex-1 flex items-end gap-4">
                    <Input
                        label="نام محل تحصیل"
                        value={selected.subject}
                        onChange={(e) => setSelected((perv) => ({ ...perv, subject: e.target.value }))}
                    />

                    <button onClick={addGrade} type="button" className="btn btn--outline !p-2 !rounded-full mb-3">
                        <IoMdAdd className="w-6 h-6" />
                    </button>
                </div>
            </div>
            {grade.length !== 0 &&
                <div className="w-full border border-slate-400 rounded-md mt-3">
                    {grade.map((item, index) => (
                        <div key={index} className="flex items-center justify-between gap-4 p-3 border-b border-slate-400 last:border-0">
                            <div className="flex-1 flex items-center gap-1 text-textDefault">
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
