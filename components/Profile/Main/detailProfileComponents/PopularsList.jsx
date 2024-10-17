import { useState } from "react";
import TitleItems from "../TitleItems";
import ViewMore from "../ViewMore";

export default function PopularsList({ userData, popularList }) {
    const [showMore, setShowMore] = useState(false);

    if (popularList && popularList.length)
        return (
            <div id="populars" className="pt-16">
                <TitleItems
                    title={`محبوب ترین های ${userData?.name} ${userData?.lastname}`}
                />
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-2 mb-4">
                    {popularList.slice(0, showMore ? gallery.length : 10).map((item) => {
                        return (
                            <div
                                key={item.id}
                                className=" flex justify-start items-center text-xs sm:text-sm text-slate-800 gap-1"
                            >
                                <span className="font-bold"> {item?.popularname?.name} : </span>
                                <span> {item?.value}</span>
                            </div>
                        );
                    })}
                </div>
                {popularList.length > 10 ? <ViewMore complete={showMore} onClick={() => setShowMore(!showMore)} /> : null}
            </div>
        )
}
