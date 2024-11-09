import { SocialMedias } from "@/data/SocialMedias";
import Input from "@/tools/Input";
import Select from "@/tools/Select";
import Link from "next/link";
import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import { IoMdAdd } from "react-icons/io";

export default function SocialMedia({ formik }) {
    const [list, setList] = useState([]);
    const [selected, setSelected] = useState({ title: 0, subject: "" });
    const { socialmedia } = formik.values;

    const addSocialmedia = () => {
        if (selected.title !== 0 && selected.subject !== "") {
            formik.setFieldValue("socialmedia", [...socialmedia, { title: selected.title, subject: selected.subject }]);
            setSelected({ title: 0, subject: "" });
        }
    }

    const removeSocialmedia = (value) => {
        formik.setFieldValue("socialmedia", socialmedia.filter((i) => socialmedia.indexOf(i) !== socialmedia.indexOf(value)))
    }

    return (
        <div className="lg:col-span-2">
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                    <Select
                        label="شبکه های اجتماعی"
                        smallDesc="بعد از وارد کردن اطلاعات بر روی گزینه بعلاوه کلیک کنید"
                        options={[{ id: 0, value: "", label: "یک گزینه را انتخاب کنید" }, ...SocialMedias]}
                        value={selected.title}
                        onChange={(e) => setSelected((perv) => ({ ...perv, title: e.target.value }))}
                    />
                </div>
                <div className="flex-1 flex items-end gap-4">
                    <Input
                        label="آدرس صفحه"
                        value={selected.subject}
                        onChange={(e) => setSelected((perv) => ({ ...perv, subject: e.target.value }))}
                    />

                    <button onClick={addSocialmedia} type="button" className="btn btn--outline !p-2 !rounded-full mb-3">
                        <IoMdAdd className="w-6 h-6" />
                    </button>
                </div>
            </div>
            {socialmedia.length !== 0 &&
                <div className="w-full border border-slate-300 dark:border-slate-400 rounded-md mt-3">
                    {socialmedia.map((item, index) => (
                        <div key={index} className="flex items-center justify-between gap-4 p-3 border-b border-slate-300 dark:border-slate-400 last:border-0">
                            <div className="flex-1 flex items-center gap-1 text-textDefault">
                                <p className="text-sm font-medium">
                                    {[...SocialMedias].filter((s) => s.value === item.title)[0].label}
                                </p>
                                -
                                <span className="text-xs">
                                    {item.subject}
                                </span>
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
