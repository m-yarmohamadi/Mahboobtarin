import useMainPage from "@/hooks/useMainPage";
import Input from "@/tools/Input";
import Select from "@/tools/Select";
import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import { IoMdAdd } from "react-icons/io";

export default function Expertise({ formik }) {
    const [list, setList] = useState(formik.values.expertise || []);
    const [selected, setSelected] = useState({ title: 0, subject: "" });
    const { transformCategories, isLoading: isGetCategories } = useMainPage();

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
                        label="حوزه تخصصی"
                        smallDesc="بعد از وارد کردن اطلاعات بر روی گزینه بعلاوه کلیک کنید"
                        options={!isGetCategories ? [{ id: -1, value: "", label: "موضوع تخصص را انتخاب کنید" }, ...transformCategories] : [{ id: -1, value: "", label: "موضوع تخصص را انتخاب کنید" }]}
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
                <div className="w-full border border-slate-400 rounded-md mt-3">
                    {formik.values.expertise.map((item, index) => (
                        <div key={index} className="flex items-center justify-between gap-4 p-3 border-b border-slate-400 last:border-0">
                            <div className="flex-1 flex items-center gap-1 text-textDefault">
                                <p className="text-sm font-medium">
                                    {transformCategories?.filter((i) => Number(i.value) === Number(item.title))[0].label}
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
