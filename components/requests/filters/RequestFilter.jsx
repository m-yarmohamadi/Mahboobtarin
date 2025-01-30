import { Search } from "@/components/groups/filters/GroupFilters";
import Modal from "@/components/Modal";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import RequestExpertise from "../RequestExpertise";
import Sort from "./Sort";
import { FaFilter } from "react-icons/fa";
import PayTypeFilter from "./PayTypeFilter";
import Cooperation from "./Cooperation";
import Gender from "./Gender";
import Address from "./Address";

export default function RequestFilter({ categories, filterObj, changeFilterHandler, setNewData }) {
    const [openSearch, setOpenSearch] = useState(false);
    const [searchTerm, setSearchTerm] = useState("");
    const pathname = usePathname();

    useEffect(() => {
        setOpenSearch(false)
    }, [pathname])

    return (
        <div className="w-full flex flex-col lg:flex-row lg:justify-between lg:items-center gap-4 pb-4 border-b border-slate-300">
            <div className="lg:hidden">
                <div onClick={() => setOpenSearch(true)} >
                    <Search />
                </div>
                <Modal title={'جستجوی تخصص'} open={openSearch} onClose={() => setOpenSearch(false)} className="lg:!hidden">
                    <div className="w-full flex flex-col gap-4">
                        <Search value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
                        <div className="h-[250px] overflow-y-auto pl-6">
                            <RequestExpertise
                                data={categories}
                                searchTerm={searchTerm}
                                setFilter={changeFilterHandler}
                            />
                        </div>
                    </div>
                </Modal>
            </div>
            <div className="w-full flex items-center justify-between gap-2">
                <Filter>
                    <Address filter={filterObj.location} setFilter={changeFilterHandler} />
                    <Gender filter={filterObj.gender} setFilter={changeFilterHandler} />
                    <Cooperation filter={filterObj.collaboration} setFilter={changeFilterHandler} />
                    <PayTypeFilter filter={filterObj.pyment_type} setFilter={changeFilterHandler} />
                </Filter>
                <Sort filter={filterObj.type} setFilter={changeFilterHandler} />
            </div>
        </div>
    )
}

function Filter({ children }) {
    const [openFilter, setOpenFilter] = useState(false);

    return (
        <>
            <div className="lg:hidden">
                <button onClick={() => setOpenFilter(true)} className="border border-secondary-01 p-1 px-2 h-[34px] text-sm rounded-full flex justify-center items-center gap-2 text-secondary-01">
                    <span>
                        <FaFilter />
                    </span>
                    <span >فیلترها</span>
                </button>
                <Modal title={'فیلتر ها'} open={openFilter} onClose={() => setOpenFilter(false)} className={'lg:!hidden'}>
                    <div className="flex flex-col">
                        {children}
                    </div>
                    <div className="pt-5">
                        <button onClick={() => setOpenFilter(false)} className="btn btn--primary !w-full">
                            تایید
                        </button>
                    </div>
                </Modal>
            </div>

            <div className="hidden lg:flex items-center flex-1 justify-between gap-2">
                {children}
            </div>
        </>
    )
}