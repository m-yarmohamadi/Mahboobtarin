import Modal from "@/components/Modal";
import RadioButton from "@/tools/RadioButton";
import Select from "@/tools/Select";
import { useState } from "react";
import { FaSortAmountDown } from "react-icons/fa";

export default function Sort() {
    const [openSort, setOpenSort] = useState(false);
    const sorts = [
        { value: "near", label: "نزدیک ترین" },
        { value: "poular", label: "محبوبترین" },
        { value: "mostVisited", label: "پربازدیدترین" },
        { value: "suggesstion", label: "پیشنهادی" },
        { value: "experienced", label: "باتجربه ترین" },
        { value: "newest", label: "جدیدترین" },
        { value: "openTurn", label: "دارای نوبت باز" },
    ];

    return (
        <>
            <div className="lg:hidden">
                <button onClick={() => setOpenSort(true)} className="border border-secondary-01 p-1 px-2 h-[34px] text-sm rounded-full flex justify-center items-center gap-2 text-secondary-01">
                    <span>
                        <FaSortAmountDown />
                    </span>
                    <span>مرتب سازی</span>
                </button>
                <Modal title={'مرتب سازی'} open={openSort} onClose={() => setOpenSort(false)} className={'lg:!hidden'}>
                    <div className="w-full flex flex-col gap-4">
                        {sorts.map((sort, index) => (
                            <RadioButton
                                key={index}
                                label={sort.label}
                                name={'sort'}
                                id={sort.value}
                            />
                        ))}
                    </div>
                    <div className="pt-5">
                        <button onClick={() => setOpenSort(false)} className="btn btn--primary !w-full">
                            تایید
                        </button>
                    </div>
                </Modal>
            </div>

            <div className="hidden lg:block">
                <Select
                    options={sorts}
                />
            </div>
        </>
    )
}
