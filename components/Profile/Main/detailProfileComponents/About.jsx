import { useEffect, useRef, useState } from "react";
import TitleItems from "../TitleItems";
import ViewMore from "../ViewMore";

export default function About({ description }) {
    const [showCompleteBio, setShowCompleteBio] = useState(false);
    const [isClamped, setIsClamped] = useState(false);
    const textRef = useRef(null);

    useEffect(() => {
        if (description) {
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
    }, [description]);


    if (description) {
        return (
            <div id="bio" className="pt-16">
                <TitleItems title={"بیوگرافی"} />
                <p
                    ref={textRef}
                    className={`${!showCompleteBio && "line-clamp-5 "
                        } text-xs sm:text-sm sm:leading-8 leading-6 font-medium text-gray-800 text-justify whitespace-pre-wrap`}
                >
                    {description}
                </p>
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
