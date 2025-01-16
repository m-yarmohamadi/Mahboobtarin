import ExpertiseSelectMulit from "@/components/Register/steps/ExpertiseSelectMulit";
import useMainPage from "@/hooks/useMainPage";
import { getCategoryParents } from "@/services/mainPageService";
import Input from "@/tools/Input";
import Select from "@/tools/Select";
import { useState } from "react";
import { HiOutlineTrash } from "react-icons/hi2";
import { IoMdAdd } from "react-icons/io";

export default function Expertise({ formik }) {
    const [list, setList] = useState(formik.values.expertise || []);
    const [selected, setSelected] = useState({ title: 0, subject: "" });
    const { transformCategories, isLoading: isGetCategories } = useMainPage();

    const addExpertise = async () => {
        if (selected.title !== 0 && selected.subject !== "") {
            try {
                const { data } = await getCategoryParents(selected.title);
                let expertiseList = [];

                function recursiveAdd(parent) {
                    expertiseList.push({ title: parent.id, subject: "", childId: selected.title });
                    if (parent.parent_recursive) {
                        recursiveAdd(parent.parent_recursive);
                    }
                }

                if (data) {
                    if (data.parent_recursive) {
                        recursiveAdd(data.parent_recursive);
                    }
                    const newExpertises = [...formik.values.expertise, ...expertiseList, { title: selected.title, subject: selected.subject }];
                    const uniqueItems = [];
                    const seen = new Set();

                    newExpertises.forEach((item) => {
                        if (!seen.has(item.title)) {
                            seen.add(item.title);
                            uniqueItems.push(item);
                        }
                    });
                    formik.setFieldValue("expertise", uniqueItems);
                    expertiseList = [];
                }
            } catch (error) { }

            setSelected({ title: 0, subject: "" });
        }
    }

    const removeExpertise = (id) => {
        formik.setFieldValue(
            "expertise",
            formik.values.expertise.filter(
                (i) => Number(i.title) !== Number(id) && Number(i?.childId) !== Number(id)
            )
        );
    }

    return (
        <div className="lg:col-span-2">
            <div className="flex flex-col lg:flex-row gap-4">
                <div className="flex-1">
                    <ExpertiseSelectMulit
                        name={"title"}
                        label={"حوزه تخصصی"}
                        options={!isGetCategories ? transformCategories : []}
                        selected={selected.title}
                        onChange={(e) => setSelected((perv) => ({ ...perv, title: e }))}
                        smallDesc="بعد از وارد کردن اطلاعات بر روی گزینه بعلاوه کلیک کنید"
                    />
                </div>
                <div className="flex-1 flex items-end gap-4">
                    <Input
                        label="عنوان تخصص"
                        value={selected.subject}
                        onChange={(e) => setSelected((perv) => ({ ...perv, subject: e.target.value }))}
                    />

                    <button onClick={addExpertise} type="button" className="btn btn--outline !p-2 !rounded-full mb-3">
                        <IoMdAdd className="w-6 h-6" />
                    </button>
                </div>
            </div>
            {formik.values.expertise.length !== 0 && formik.values.expertise &&
                <div className="w-full border border-slate-400 rounded-md mt-3">
                    {formik.values.expertise.map((item, index) => (
                        item.subject &&
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
                            <button onClick={() => removeExpertise(item.title)} type="button" >
                                <HiOutlineTrash className="w-5 h-5 text-red-600" />
                            </button>
                        </div>
                    ))}
                </div>
            }
        </div>
    )
}
