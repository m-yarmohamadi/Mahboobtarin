import { useState } from "react";
import TitleItems from "../TitleItems";
import ViewMore from "../ViewMore";

export default function PopularsList({ userData, popularList }) {
    const [showMore, setShowMore] = useState(false);

    if (popularList && popularList.length)
        return (
            <div id="populars" className="pt-16">
                <TitleItems
                    title={`محبوب‌ترین‌های ${userData?.name} ${userData?.lastname}`}
                />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-2 mb-4">
                    {popularList.slice(0, showMore ? gallery.length : 10).map((item) => {
                        return (
                            <div
                                key={item.id}
                                className=" flex justify-start items-center text-xs sm:text-sm gap-1"
                            >
                                <span className="w-3 h-3 rounded-full bg-slate-600"></span>
                                <span className="text-slate-600"> {item?.popularname?.name || item?.popular_title} : </span>
                                <span className="font-bold text-slate-800"> {item?.value}</span>
                            </div>
                        );
                    })}
                </div>
                {popularList.length > 10 ? <ViewMore complete={showMore} onClick={() => setShowMore(!showMore)} /> : null}
            </div>
        )
}
