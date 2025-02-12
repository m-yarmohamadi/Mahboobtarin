import { useEffect, useRef, useState } from "react";
import TitleItems from "../TitleItems";
import ViewMore from "../ViewMore";
import isRichText from "@/utils/isRichText";

export default function HonorsDescription({ honors_description }) {
    const [showCompleteBio, setShowCompleteBio] = useState(false);
    const [isClamped, setIsClamped] = useState(false);
    const textRef = useRef(null);

    useEffect(() => {
        if (honors_description) {
            const lineHeight = parseInt(
                window.getComputedStyle(textRef.current).lineHeight,
                10
            );
            const maxHeight = lineHeight * 5; // حداکثر ارتفاع برای 5 خط

            if (textRef.current.scrollHeight > maxHeight) {
                setIsClamped(true);
            } else {
                setIsClamped(false);
            }
        }
    }, [honors_description]);

    if (honors_description) {
        return (
            <div id="honors_description" className="pb-16 scroll-mt-[130px] md:scroll-mt-20">
                <TitleItems title={"آثار و افتخارات"} />
                {
                    isRichText(honors_description) ?
                        <div
                            ref={textRef}
                            dangerouslySetInnerHTML={{ __html: honors_description }}
                            className={`${!showCompleteBio && "line-clamp-5 "
                                } text-xs font-medium text-slate-800 sm:text-sm whitespace-pre-wrap`}
                        >
                        </div>
                        :
                        <p
                            ref={textRef}
                            className={`${!showCompleteBio && "line-clamp-5 "
                                } text-xs font-medium text-slate-800 sm:text-sm whitespace-pre-wrap`}
                        >
                            {honors_description}
                        </p>
                }
                {isClamped && (
                    <ViewMore
                        complete={showCompleteBio}
                        onClick={() => setShowCompleteBio(!showCompleteBio)}
                    />
                )}
            </div>
        )
    }
}
