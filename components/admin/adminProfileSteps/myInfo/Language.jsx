import Select from "@/tools/Select";
import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import { IoMdAdd } from "react-icons/io";

const language = [
    { id: 0, label: 'یک گزینه را انتخاب کنید', value: '' },
    { id: 1, label: 'ترکی', value: 'torki' },
    { id: 2, label: 'کردی', value: 'kordi' },
    { id: 3, label: 'لری', value: 'lori' },
    { id: 4, label: 'تالشی', value: 'taleshi' },
    { id: 5, label: 'عربی', value: 'arabic' },
    { id: 6, label: 'بلوچ', value: 'baloochi' },
];
const proficiency = [
    { id: 0, label: 'یک گزینه را انتخاب کنید', value: '' },
    { id: 1, label: 'خیلی ضعیف', value: 'VeryWeak' },
    { id: 2, label: 'ضعیف', value: 'weak' },
    { id: 3, label: 'متوسط', value: 'medium' },
    { id: 4, label: 'خوب', value: 'good' },
    { id: 5, label: 'خیلی خوب', value: 'veryGood' },
    { id: 6, label: 'عالی', value: 'Excellent' },
];

export default function Language({ languageData }) {
    const [list, setList] = useState(languageData || []);
    const [selected, setSelected] = useState({ title: 0, subject: 0 });

    const addLanguage = () => {
        if (selected.title !== 0 && selected.subject !== 0) {
            setList((pervList) => [
                ...pervList,
                { title: selected.title, subject: selected.subject }
            ]);
            setSelected({ title: 0, subject: 0 });
        }
    }

    const removeLanguage = (value) => {
        setList((pervList) => pervList.filter((i) => list.indexOf(i) !== list.indexOf(value)))
    }

    return (
        <div className="lg:col-span-2">
            <div className="flex items-end gap-4">
                <div className="flex-1 flex flex-col lg:flex-row gap-4">
                    <Select
                        label="زبان خارجی"
                        options={language}
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
