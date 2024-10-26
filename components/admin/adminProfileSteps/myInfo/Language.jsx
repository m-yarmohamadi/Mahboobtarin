import { LanguagesData } from "@/data/LanguagesData";
import Select from "@/tools/Select";
import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import { IoMdAdd } from "react-icons/io";

const proficiency = [
    { id: 0, label: 'یک گزینه را انتخاب کنید', value: '' },
    { id: 1, label: 'خیلی ضعیف', value: 'VeryWeak' },
    { id: 2, label: 'ضعیف', value: 'weak' },
    { id: 3, label: 'متوسط', value: 'medium' },
    { id: 4, label: 'خوب', value: 'good' },
    { id: 5, label: 'خیلی خوب', value: 'veryGood' },
    { id: 6, label: 'عالی', value: 'Excellent' },
];

export default function Language({ formik }) {
    const [selected, setSelected] = useState({ title: "انگلیسی", subject: 0 });
    const { language } = formik.values;

    const addLanguage = () => {
        if (selected.title !== 0 && selected.subject !== 0) {
            formik.setFieldValue("language", [...language, { title: selected.title, subject: selected.subject }]);
            setSelected({ title: 0, subject: 0 });
        }
    }

    const removeLanguage = (value) => {
        formik.setFieldValue("language", language.filter((i) => language.indexOf(i) !== language.indexOf(value)))
    }

    return (
        <div className="lg:col-span-2">
            <div className="flex items-end gap-4">
                <div className="flex-1 flex flex-col lg:flex-row gap-4">
                    <Select
                        label="زبان و گویش"
                        options={LanguagesData}
                        smallDesc="بعد از وارد کردن اطلاعات بر روی گزینه بعلاوه کلیک کنید"
                        value={selected.title}
                        onChange={(e) => setSelected((perv) => ({ ...perv, title: e.target.value }))}
                    />
                    <Select
                        label="میزان تسلط"
                        options={proficiency}
                        value={selected.subject}
                        onChange={(e) => setSelected((perv) => ({ ...perv, subject: e.target.value }))}
                    />
                </div>
                <button onClick={addLanguage} type="button" className="btn btn--outline !p-2 !rounded-full mb-1">
                    <IoMdAdd className="w-6 h-6" />
                </button>
            </div>
            {language.length !== 0 &&
                <div className="w-full border border-slate-400 rounded-md mt-3">
                    {language.map((item, index) => (
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
                            <button onClick={() => removeLanguage(item)} type="button" >
                                <HiOutlineTrash className="w-5 h-5 text-red-600" />
                            </button>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}
