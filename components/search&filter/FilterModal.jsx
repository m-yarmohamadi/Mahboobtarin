import { useState } from "react";
import Modal from "../Modal";
import { FaAngleDown } from "react-icons/fa";
import CheckBoxInput from "../CheckBoxInput";
import { useGetExpertisesList } from "@/hooks/useExpertiseUser";
import { LanguagesData } from "@/data/LanguagesData";
import useMainPage from "@/hooks/useMainPage";
import { FaAngleLeft } from "react-icons/fa6";
import ExpertiseFilter from "./ExpertieseFilter";
import { useGetProvinces } from "@/hooks/useCity";

export default function FilterModal({ open, onClose, searchValuesHandler, searchValues }) {
    const [openFilter, setOpenFilter] = useState();
    const { transformProvinces, isLoading: isGetProvinces } = useGetProvinces();
    const [search, setSearch] = useState({
        expert: searchValues.expert || [],
        service: searchValues.service || [],
        city: searchValues.city || [],
        gender: searchValues.gender || [],
        language: searchValues.language || []
    });


    const setSearchHandler = (name, value) => {
        if (search[name].some((i) => i === value)) {
            setSearch((prev) => ({ ...prev, [name]: prev[name].filter((i) => i !== value) }))
        } else {
            setSearch((prev) => ({ ...prev, [name]: [...prev[name], value] }))
        }
    }

    const submitFilter = () => {
        for (let i in search) {
            searchValuesHandler(i, search[i]);
        }
        onClose();
        setOpenFilter();
    }

    const clearFilter = () => {
        setSearch({
            expert: [],
            service: [],
            city: [],
            gender: [],
            language: []
        });

        for (let i in searchValues) {
            if (i !== "word") {
                searchValuesHandler(i, []);
            }
        }

        onClose();
        setOpenFilter();
    }

    return (
        <Modal title="فیلتر ها" open={open} onClose={onClose} className="!z-[9999]">
            <div className="max-h-[300px] overflow-y-auto pl-3">
                <ExpertiseFilter
                    show={openFilter}
                    setShow={setOpenFilter}
                    name="expert"
                    search={search}
                    onSelected={setSearchHandler}
                />
                <Filter
                    show={openFilter}
                    setShow={setOpenFilter}
                    name={'service'}
                    title={'نوع خدمت'}
                    search={search}
                    onSelected={setSearchHandler}
                />
                <Filter
                    show={openFilter}
                    setShow={setOpenFilter}
                    name={'city'}
                    title={'شهر'}
                    data={transformProvinces}
                    isLoading={isGetProvinces}
                    search={search}
                    onSelected={setSearchHandler}
                />
                <Filter
                    show={openFilter}
                    setShow={setOpenFilter}
                    name={'gender'}
                    title={'جنسیت'}
                    data={[{ label: "مرد", value: "man" }, { label: "زن", value: "woman" }]}
                    search={search}
                    onSelected={setSearchHandler}
                />
                <Filter
                    show={openFilter}
                    setShow={setOpenFilter}
                    name={'language'}
                    title={'زبان'}
                    data={LanguagesData}
                    search={search}
                    onSelected={setSearchHandler}
                />
            </div>
            <div className="flex items-center gap-4 mt-3">
                <button className="w-1/2 btn btn--primary" onClick={submitFilter}>
                    تایید
                </button>
                <button className="w-1/2 btn btn--outline" onClick={clearFilter}>
                    لغو
                </button>
            </div>
        </Modal>
    );
}

function Filter({ show, setShow, name, title, data = [], isLoading = false, onSelected, search }) {

    return (
        <div
            className={`w-full overflow-hidden ${show === name ? "my-3 rounded-t-lg" : "my-2 rounded-lg"}`}>
            <button
                onClick={() => setShow(show === name ? "" : name)}
                className="w-full flex items-center justify-between p-3 bg-slate-200 text-slate-800 font-semibold"
            >
                {title}
                <FaAngleDown
                    className={`w-4 h-4 duration-200 ${show === name && "rotate-180"}`}
                />
            </button>
            <div
                className={`w-full bg-slate-100 rounded-b-lg px-4 overflow-y-auto ${show === name ? "max-h-[200px]" : "max-h-0"
                    } duration-300 ease-in-out`}
            >
                {!isLoading && (
                    <ul>
                        {data.map((item, index) => (
                            <li
                                key={index}
                                className="w-full py-3 border-b border-b-slate-200 last:border-b-0"
                            >
                                <CheckBoxInput
                                    label={item.label}
                                    name={item.value}
                                    checked={search[name].some((i) => i.toString() === item.value.toString())}
                                    onChecked={(e) => onSelected(name, e.target.name)}
                                />
                            </li>
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

