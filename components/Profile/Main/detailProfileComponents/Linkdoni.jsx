import Link from "next/link";
import TitleItems from "../TitleItems";
import ViewMore from "../ViewMore";
import { useState } from "react";
import { MdAccessTime } from "react-icons/md";
import { toPersianDateLong } from "@/utils/toPersianDate";

export default function Linkdoni({ link_dooni }) {
    const [showMore, setShowMore] = useState(false);

    if (link_dooni && link_dooni.length) {
        return (
            <div id="linkdins" className="pt-16">
                <TitleItems title={"لینکدونی"} />
                <div className="rounded-xl overflow-hidden">
                    {link_dooni.slice(0, showMore ? link_dooni.length : 10).map((item, index) => {
                        return (
                            <div
                                key={item.id}
                                className={` flex flex-col p-3 ${!(index % 2) && `bg-slate-100`
                                    }`}
                            >
                                <Link
                                    href={item.link}
                                    rel="nofollow"
                                    className="font-semibold hover:text-blue-500 hover:underline text-slate-800 mt-1 mb-3 flex items-center gap-2"
                                >
                                    <span className="w-2 h-2 rounded-full bg-slate-700 inline-block"></span>
                                    {item.title}
                                </Link>
                                <div className="flex items-center justify-between">
                                    <div className="text-sm text-slate-500">
                                        منبع خبر :
                                        <span className="text-slate-700 font-medium">
                                            {item.source}
                                        </span>
                                    </div>
                                    <div className="text-xs flex items-center gap-1 text-slate-400">
                                        <MdAccessTime className="w-4 h-4" />
                                        {toPersianDateLong(item.created_at)}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>

                {link_dooni.length > 10 ? <ViewMore complete={showMore} onClick={() => setShowMore(!showMore)} /> : null}
            </div>
        )
    }
}
