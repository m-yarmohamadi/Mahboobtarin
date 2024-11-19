import { useState } from "react";
import { FaAngleDown } from "react-icons/fa";
import CheckBoxInput from "../CheckBoxInput";
import useMainPage from "@/hooks/useMainPage";
import { FaAngleLeft } from "react-icons/fa6";

export default function ExpertiseFilter({ show, setShow, name, onSelected, search }) {
    const { transformCategories, isLoading } = useMainPage();

    return (
        <div
            className={`w-full overflow-hidden ${show === name ? "my-3 rounded-t-lg" : "my-2 rounded-lg"
                }`}
        >
            <button
                onClick={() => setShow(show === name ? "" : name)}
                className="w-full flex items-center justify-between p-3 bg-slate-200 text-slate-800 font-semibold"
            >
                حوزه تخصصی
                <FaAngleDown
                    className={`w-4 h-4 duration-200 ${show === name && "rotate-180"}`}
                />
            </button>
            <div
                className={`w-full bg-slate-100 rounded-b-lg px-4 overflow-y-auto ${show === name ? "max-h-[250px]" : "max-h-0"
                    } duration-300 ease-in-out`}
            >
                {!isLoading && (
                    <ul>
                        {transformCategories?.filter((o) => o.parent_id === 0).map((item, index) => (
                            <ExpertiseFilterItem
                                key={index}
                                optionsChildren={item?.children_recursive}
                                value={item.value}
                                label={item.label}
                                selectedValue={search[name].some((i) => i.toString() === item.value.toString())}
                                onChange={(e) => onSelected(name, e.target.name)}
                            />
                        ))}
                    </ul>
                )}
            </div>
        </div>
    );
}

function ExpertiseFilterItem({ label, value, optionsChildren, onChange, selectedValue }) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div>
            <div className="w-full flex items-center justify-between py-3 border-b border-b-slate-200">
                <div className="w-auto">
                    <CheckBoxInput
                        label={label}
                        name={value}
                        checked={selectedValue}
                        onChecked={onChange}
                    />
                </div>
                <div onClick={() => setIsOpen(!isOpen)}>
                    {optionsChildren.length ? <FaAngleLeft className={`w-4 h-4 ${isOpen && "-rotate-90"}`} /> : null}
                </div>
            </div>
            {isOpen &&
                <ul>
                    {optionsChildren?.map((optionChild, index) => (
                        <div key={index} className="w-full pr-4">
                            <ExpertiseFilterItem
                                label={optionChild?.name}
                                value={optionChild.id}
                                onChange={onChange}
                                selectedValue={selectedValue}
                                optionsChildren={optionChild?.children_recursive}
                            />
                        </div>
                    ))}
                </ul>
            }
        </div>
    )
}