import CheckBoxInput from "@/components/CheckBoxInput";
import useOutsideClick from "@/hooks/useOutsideClick";
import RadioButton from "@/tools/RadioButton";
import { useState } from "react"
import { FaAngleDown, FaAngleLeft } from "react-icons/fa6";

export default function ExpertiseSelectMulit({ name, label, smallDesc, required, options, onChange, selected, disabled, error, }) {
    const [openBody, setOpenBody] = useState(false);
    const selectBodyRef = useOutsideClick(() => setOpenBody(false));

    return (
        <div className="w-full py-1 flex flex-col justify-start justify-items-start items-start">
            <label
                className="text-sm font-bold px-2 mb-2 text-slate-800 flex items-center gap-1 truncate"
                htmlFor={name}
            >
                {label}
                {smallDesc && <span className="text-[10px] font-normal">({smallDesc})</span>}
                {required && (
                    <span
                        style={{
                            color: "red",
                            fontSize: "18px",
                            display: "inline-block",
                            marginRight: "4px",
                        }}
                    >
                        *
                    </span>
                )}
            </label>
            <div className="w-full relative">
                <div onClick={() => setOpenBody(true)} className="w-full cursor-pointer flex items-center justify-between text-right appearance-none bg-transparent text-slate-700 border  border-primary-01 border-opacity-15 focus:border-opacity-100 rounded-md py-2 px-4   focus:outline-none focus:bg-white">
                    {selected ?
                        options.filter((o) => o.value === selected)[0]?.label
                        :
                        "یک گزینه را انتخاب کنید"
                    }
                    <FaAngleDown className={`w-5 h-5 ${openBody && "rotate-180"}`} />
                </div>
                {openBody &&
                    <div ref={selectBodyRef} className={"w-full h-auto max-h-[250px] z-50 overflow-y-auto no-scrollbar bg-white border border-primary-01 absolute top-[44px] right-0 rounded-md shadow-lg dark:shadow-darkLg"}>
                        <ul className="w-full h-full flex flex-col">
                            {options?.filter((o) => o.parent_id === 0).map((option) => (
                                <OptionItem
                                    key={option.value}
                                    onChange={onChange}
                                    label={option.label}
                                    selectedValue={selected}
                                    optionsChildren={option?.children_recursive}
                                    value={option.value}
                                />
                            ))}
                        </ul>
                    </div>
                }
                <div className="w-full flex justify-start items-start mt-2">
                    {error && (
                        <p className="error_Message">
                            {error}
                        </p>
                    )}
                </div>
            </div>
        </div>
    )
}

function OptionItem({ label, value, optionsChildren, onChange, selectedValue }) {
    const [isOpen, setIsOpen] = useState(false);

    const handleChange = () => {
        onChange(value);
    }

    return (
        <li className="w-full text-slate-900 text-right">
            <div className="w-full p-2 flex items-center justify-between gap-2  border-b border-b-slate-300 dark:border-b-slate-400 hover:bg-blue-600 cursor-pointer hover:text-[#fff]">
                <div className="flex-1">
                    <RadioButton onChecked={handleChange} checked={selectedValue === value} />
                </div>
                <div onClick={() => setIsOpen(!isOpen)} className="w-full flex justify-between items-center gap-2">
                    {label}
                    {optionsChildren.length ? <FaAngleLeft className={`w-4 h-4 ${isOpen && "-rotate-90"}`} /> : null}
                </div>
            </div>
            {isOpen &&
                <ul className="bg-slate-200 dark:bg-slate-300">
                    {optionsChildren?.map((optionChild) => (
                        <div key={optionChild.id} className="w-full pr-4">
                            <OptionItem
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
        </li>
    )
}