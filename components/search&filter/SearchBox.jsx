import { useEffect, useState } from "react";
import { BiSlider } from "react-icons/bi";
import { IoSearch } from "react-icons/io5";
import FilterModal from "./FilterModal";
import { FaClipboardUser, FaArrowLeft, FaRegRectangleList } from "react-icons/fa6";
import { LuUsers2 } from "react-icons/lu";
import Loading from "@/tools/Loading";
import { useMutation } from "@tanstack/react-query";
import { searchApi } from "@/services/mainPageService";
import Link from "next/link";

export default function SearchBox() {
    const [open, setOpen] = useState(false);
    const [openFilter, setOpenFilter] = useState(false);
    const { mutateAsync: mutateSearch, isPending } = useMutation({ mutationFn: searchApi });
    const [result, setResult] = useState(undefined);
    const [isFirstRender, setIsFirstRender] = useState(true);
    const [searchValues, setSearchValues] = useState({
        word: "",
        expert: [],
        service: [],
        city: [],
        gender: [],
        language: []
    });
    console.log(result);
    // search_expertis

    // search_users


    const searchHandler = async () => {
        try {
            const res = await mutateSearch(searchValues);

            if (!res.search_expertis.length && !res.search_users.length) {
                setResult(null);
            } else {
                setResult(res);
            }

        } catch (error) {
            setResult(null)
        }
    }

    const searchValuesHandler = (name, value) => {
        setSearchValues((prev) => ({
            ...prev,
            [name]: value
        }));
    }

    useEffect(() => {
        if (open) {
            document.body.classList.add("!overflow-hidden");
        } else {
            document.body.classList.remove("!overflow-hidden");
        }
    }, [open]);

    useEffect(() => {
        if (isFirstRender) {
            setIsFirstRender(false);
            return;
        }
        searchHandler();
    }, [searchValues]);

    return (
        <div className="w-full flex justify-center items-center bg-white rounded-full cursor-pointer">
            <div onClick={() => setOpen(true)} className="w-full text-slate-400 dark:text-slate-500 p-3 flex justify-between items-center ">
                <div className=" text-sm w-full border-none focus:border-none ring-0 focus:ring-0 bg-transparent outline-none">
                    جستجو در{" "}
                    <span className="text-primary-01 font-bold text-base">
                        محبوب‌ترین‌
                    </span>
                </div>

                <IoSearch className="w-6 h-6" />
            </div>

            {open && <div onClick={() => setOpen(false)} className="w-full h-full fixed top-0 right-0 bg-black/50 z-50"></div>}
            <div className={`${open ? "visible opacity-100" : "invisible opacity-0"} duration-300 w-full px-6 fixed z-[999] top-[15%] right-1/2 translate-x-1/2`}>
                <div className="w-full mx-auto p-4 max-w-screen-md bg-white rounded-xl">
                    <div className="w-full flex flex-col-reverse sm:flex-row items-start sm:items-center sm:justify-between gap-2 border-b border-b-slate-200 pb-4 mb-4">
                        {/* filter button */}
                        <button
                            onClick={() => setOpenFilter(true)}
                            className="text-primary-01 px-4 h-12 bg-slate-200 rounded-lg flex justify-center items-center text-sm font-bold gap-1"
                        >
                            <span className="rotate-90">
                                <BiSlider className="w-5 h-5" />
                            </span>
                            <span>فیلترها</span>
                        </button>

                        {/* search box */}
                        <div className="w-full h-12 px-4 flex items-center justify-between bg-slate-200 rounded-lg">
                            <input
                                value={searchValues.word}
                                onChange={(e) => searchValuesHandler("word", e.target.value)}
                                placeholder="جستجو"
                                className="w-full h-full bg-transparent border-0 outline-0 appearance-none text-sm text-slate-900"
                            />
                            <div onClick={() => setOpen(false)}>
                                <FaArrowLeft className="w-5 h-5 text-slate-800" />
                            </div>
                        </div>
                    </div>

                    {/* results */}
                    {!isPending && result &&
                        <div className="space-y-8 max-h-[300px] overflow-y-auto">
                            {result && result?.search_expertis.length ?
                                <div>
                                    <h5 className="text-slate-900 font-bold flex items-center gap-1.5 pb-4">
                                        <FaRegRectangleList className="w-5 h-5 text-primary-01" />
                                        نتایج در لیست تخصص ها
                                    </h5>

                                    <div className="w-full flex flex-wrap gap-2">
                                        {result?.search_expertis.map((item, index) => (
                                            <Link key={index} href={`/group/${item?.id || "#"}`} className="text-xs whitespace-nowrap font-bold text-slate-800 p-4 border border-slate-300 dark:border-slate-400 rounded-lg">
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                :
                                null
                            }

                            {result && result?.search_users.length ?
                                <div>
                                    <h5 className="text-slate-900 font-bold flex items-center gap-1.5 pb-4">
                                        <LuUsers2 className="w-5 h-5 text-primary-01" />
                                        نتایج در لیست متخصصان
                                    </h5>

                                    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2">
                                        {result?.search_users.map((item, index) => (
                                            <Link key={index} href={item?.unique_url_id || "#"} className="flex items-center gap-2 p-2 border border-slate-300 dark:border-slate-400 rounded-lg">
                                                <div>
                                                    <div className="w-11 h-11 rounded-full overflow-hidden">
                                                        <img
                                                            src={item.avatar.length ? item.avatar[0].path : "/images/user.png"}
                                                            alt={`${item.name} ${item.lastname}`}
                                                            className="w-full h-full object-cover object-center"
                                                        />
                                                    </div>
                                                </div>

                                                <h3 className="text-xs font-bold text-slate-900 truncate">
                                                    {item.name} {item.lastname}
                                                </h3>
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                                :
                                null
                            }
                        </div>
                    }

                    {/* not found */}
                    {!isPending && result === null &&
                        <div className="text-slate-800 py-10 flex justify-center">
                            نتیجه ای یافت نشد!
                        </div>
                    }

                    {/* first content */}
                    {!isPending && result === undefined &&
                        <div className="text-slate-800  py-10 flex justify-center gap-1 text-sm">
                            جستجو در{" "}
                            <span className="text-primary-01 font-bold text-base">
                                محبوب‌ترین‌
                            </span>
                        </div>
                    }

                    {/* loading */}
                    {isPending &&
                        <div className="text-slate-800 py-10 flex justify-center">
                            <Loading width={'40'} customeColor={'#0693a4'} />
                        </div>
                    }
                </div>
            </div>

            <FilterModal
                open={openFilter}
                onClose={() => setOpenFilter(false)}
                searchValuesHandler={searchValuesHandler}
                searchValues={searchValues}
            />
        </div>
    )
}
