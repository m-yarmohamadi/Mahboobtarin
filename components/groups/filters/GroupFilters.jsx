import { FaFilter, FaSortAmountDown } from "react-icons/fa"
import { FaAngleLeft } from "react-icons/fa6"
import { IoSearchOutline } from "react-icons/io5"

export default function GroupFilters() {
    return (
        <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 pb-4 border-b border-slate-300">
            <Url />
            <div className="lg:hidden">
                <Search />
            </div>
            <div className="w-full lg:w-auto flex items-center gap-3">
                <Filter />
                <Sort />
            </div>
        </div>
    )
}

export function Search() {
    return (
        <div className="w-full h-12 px-4 flex items-center gap-2 border border-slate-300 dark:border-slate-500  text-slate-400 dark:text-slate-500 rounded-xl">
            <div>
                <IoSearchOutline className="w-5 h-5" />
            </div>
            <input
                type="text"
                placeholder="جستجوی تخصص"
                className="flex-1 text-sm text-slate-900 placeholder-slate-400 dark:placeholder-slate-500 bg-transparent appearance-none outline-none border-none"
            />
        </div>
    )
}

function Filter() {
    return (
        <div>
            <button className="border border-secondary-01 p-1 rounded-full flex justify-center items-center gap-2 text-secondary-01">
                <span>
                    <FaFilter />
                </span>
                <span className="text-sm">فیلترها</span>
                <span className="w-6 h-6 text-xs rounded-full bg-secondary-01 text-[#fff] flex justify-center items-center">
                    1
                </span>
            </button>
        </div>
    )
}

function Sort() {
    return (
        <button className="border border-secondary-01 p-1 px-2 h-[34px] text-sm rounded-full flex justify-center items-center gap-2 text-secondary-01">
            <span>
                <FaSortAmountDown />
            </span>
            <span>مرتب سازی</span>
        </button>
    )
}

function Url() {
    return (
        <div className="flex justify-start items-center gap-1 text-primary-03 text-sm">
            <span>پزشکان</span>
            <span>
                <FaAngleLeft />
            </span>
            <span>روانشناسی</span>
            <span>
                <FaAngleLeft />
            </span>
            <span className="text-primary-01">مشاوره خانواده</span>
        </div>
    )
}