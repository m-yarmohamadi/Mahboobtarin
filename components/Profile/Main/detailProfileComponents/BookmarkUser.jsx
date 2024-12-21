import { useBookmark } from "@/hooks/useDashboard"
import { FaBookmark, FaRegBookmark } from "react-icons/fa6";

export default function BookmarkUser({ expertiseId, isMark }) {
    const { bookmarkHandler, isBookmarking } = useBookmark();

    return (
        <button type="button" onClick={() => bookmarkHandler(expertiseId)}>
            {isMark ? <FaBookmark className="w-5 h-5 lg:hidden" /> : <FaRegBookmark className="w-5 h-5 lg:hidden" />}
            <div className="hidden lg:flex items-center gap-1 text-xs text-slate-800">
                {isMark ? <FaBookmark className="w-5 h-5" /> : <FaRegBookmark className="w-5 h-5" />}
                <span>ذخیره</span>
            </div>
        </button>
    )
}
