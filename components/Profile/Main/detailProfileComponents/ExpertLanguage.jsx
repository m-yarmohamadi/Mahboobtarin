import { useState } from "react";
import ViewMore from "../ViewMore";
import TitleItems from "../TitleItems";

export default function ExpertLanguage({ languages }) {
    const [showMore, setShowMore] = useState(false);

    if (languages && languages.length) {
        return (
            <div id="languages" className="pb-16 scroll-mt-[130px] md:scroll-mt-20">
                <TitleItems title={"زبان و گویش"} />
                <div className="rounded-xl overflow-hidden flex flex-col gap-3 text-slate-900 text-sm font-medium">
                    {languages.slice(0, showMore ? languages.length : 10).map((item, index) => (
                        <div key={item.id} className="flex items-center">
                            {item.title}
                            <div className="px-2">
                                -
                            </div>
                            {item.subject}
                        </div>
                    ))}
                </div>

                {languages.length > 10 ? <ViewMore complete={showMore} onClick={() => setShowMore(!showMore)} /> : null}
            </div>
        )
    }
}
