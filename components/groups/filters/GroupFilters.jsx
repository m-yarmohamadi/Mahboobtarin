import Modal from "@/components/Modal";
import { useCategoryParents } from "@/hooks/useMainPage";
import { FaFilter, FaSortAmountDown } from "react-icons/fa"
import { FaAngleLeft } from "react-icons/fa6"
import { IoSearchOutline } from "react-icons/io5"
import GroupExpertises from "../GroupExpertises";
import { useEffect, useState } from "react";
import RadioButton from "@/tools/RadioButton";
import { usePathname } from "next/navigation";
import Link from "next/link";

export default function GroupFilters({ expertiseId, categories }) {
    const { categoryParents, isGetCateParent } = useCategoryParents(expertiseId);
    const [openSearch, setOpenSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const pathname = usePathname();

    useEffect(() => {
        setOpenSearch(false)
    }, [pathname])

    return (
        <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 pb-4 border-b border-slate-300">
            <div className="url-params-group-page flex justify-start items-center gap-1 text-primary-03 text-sm">
                {!isGetCateParent && <UrlItem data={categoryParents} />}
            </div>
            <div onClick={() => setOpenSearch(true)} className="lg:hidden">
                <Search />
                <Modal title={'جستجوی تخصص'} open={openSearch} onClose={() => setOpenSearch(false)} className="lg:!hidden">
                    <div className="w-full flex flex-col gap-4">
                        <Search value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        <div className="h-[250px] overflow-y-auto pl-6">
                            <GroupExpertises data={categories} searchTerm={searchTerm} />
                        </div>
                    </div>
                </Modal>
            </div>
            <div className="w-full lg:w-auto flex items-center gap-3">
                {/* <Filter /> */}
                <Sort />
            </div>
        </div>
    )
}

export function Search({ value, onChange }) {
    return (
        <div className="w-full h-12 px-4 flex items-center gap-2 border border-slate-300 dark:border-slate-500  text-slate-400 dark:text-slate-500 rounded-xl">
            <div>
                <IoSearchOutline className="w-5 h-5" />
            </div>
            <input
                type="text"
                placeholder="جستجوی تخصص"
                value={value}
                onChange={onChange}
                className="flex-1 text-sm text-slate-900 placeholder-slate-400 dark:placeholder-slate-500 bg-transparent appearance-none outline-none border-none"
            />
        </div>
    )
}

function Filter() {
    const [openFilter, setOpenFilter] = useState(false);

    return (
        <div>
            <button onClick={() => setOpenFilter(true)} className="border border-secondary-01 p-1 rounded-full flex justify-center items-center gap-2 text-secondary-01">
                <span>
                    <FaFilter />
                </span>
                <span className="text-sm">فیلترها</span>
                <span className="w-6 h-6 text-xs rounded-full bg-secondary-01 text-[#fff] flex justify-center items-center">
                    1
                </span>
            </button>
            <Modal title={'فیلتر ها'} open={openFilter} onClose={() => setOpenFilter(false)}>

            </Modal>
        </div>
    )
}

function Sort() {
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
        <div>
            <button onClick={() => setOpenSort(true)} className="border border-secondary-01 p-1 px-2 h-[34px] text-sm rounded-full flex justify-center items-center gap-2 text-secondary-01">
                <span>
                    <FaSortAmountDown />
                </span>
                <span>مرتب سازی</span>
            </button>
            <Modal title={'مرتب سازی'} open={openSort} onClose={() => setOpenSort(false)}>
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
    )
}

function UrlItem({ data }) {
    return (
        <>
            {data.parent_recursive && <UrlItem data={data.parent_recursive} />}
            <Link href={`/group/${data.id}`} className="url-params-group-page__item">
                {data.name}
            </Link>
            <FaAngleLeft className="last:hidden" />
        </>
    );
}