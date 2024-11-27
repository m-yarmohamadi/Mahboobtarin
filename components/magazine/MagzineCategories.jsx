import useMainPage from "@/hooks/useMainPage"
import { useState } from "react";

export default function MagzineCategories() {
    const { categories, isLoading } = useMainPage();
    const [active, setActive] = useState(13603);

    return (
        <>
            <div className="lg:hidden w-full md:container border-b border-b-slate-400 pt-4 !pr-4 md:pr-6">
                <ul className="w-full overflow-x-auto no-scrollbar flex items-center">
                    {!isLoading && [{ id: 13603, name: "خانه" }, ...categories?.filter((c) => c.parent_id === 0)]?.map((item) => (
                        <li onClick={() => setActive(item.id)} key={item.id} className={`${active === item.id ? " before:h-1" : " before:h-0"} duration-150 whitespace-nowrap px-4 mb-2 text-sm text-slate-700 font-bold relative before:absolute before:w-full before:bg-slate-700 before:-bottom-2 before:right-0`}>
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>

            <div className="hidden h-full lg:block bg-white p-3 rounded">
                <ul className="grid grid-cols-4">
                    {!isLoading && [{ id: 13603, name: "خانه" }, ...categories?.filter((c) => c.parent_id === 0)]?.map((item) => (
                        <li onClick={() => setActive(item.id)} key={item.id} className={`${active === item.id ? "bg-primary-01 text-white" : "bg-transparent text-slate-700"} px-2 py-2.5 truncate cursor-pointer p-1 text-center whitespace-nowrap text-xs font-bold`}>
                            {item.name}
                        </li>
                    ))}
                </ul>
            </div>
        </>
    )
}
