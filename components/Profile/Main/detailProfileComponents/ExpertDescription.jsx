import { useEffect, useRef, useState } from "react";
import TitleItems from "../TitleItems";
import ViewMore from "../ViewMore";
import isRichText from "@/utils/isRichText";

export default function ExpertDescription({ expert_description }) {
    const [showCompleteBio, setShowCompleteBio] = useState(false);
    const [isClamped, setIsClamped] = useState(false);
    const textRef = useRef(null);

    useEffect(() => {
        if (expert_description) {
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
    }, [expert_description]);

    if (expert_description) {
        return (
            <div id="skills" className="pt-16">
                <TitleItems title={"تخصص و مهارت"} />
                {
                    isRichText(expert_description) ?
                        <div
                            ref={textRef}
                            dangerouslySetInnerHTML={{ __html: expert_description }}
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
                            {expert_description}
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
