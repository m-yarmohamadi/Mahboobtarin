import { useState } from "react";
import ViewMore from "../ViewMore";
import TitleItems from "../TitleItems";

export default function ExpertGrade({ grade }) {
    const [showMore, setShowMore] = useState(false);

    if (grade && grade.length) {
        return (
            <div id="" className="pt-16">
                <TitleItems title={"تحصیلات"} />
                <div className="rounded-xl overflow-hidden flex flex-col gap-3 text-slate-900 text-sm font-medium">
                    {grade.slice(0, showMore ? grade.length : 10).map((item, index) => (
                        <div key={item.id} className="flex items-center">
                            {item.title}
                            <div className="px-2">
                                -
                            </div>
                            {item.subject}
                        </div>
                    ))}
                </div>

                {grade.length > 10 ? <ViewMore complete={showMore} onClick={() => setShowMore(!showMore)} /> : null}
            </div>
        )
    }
}
