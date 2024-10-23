import { FaAngleLeft } from "react-icons/fa6";

export default function UrlBar({ urls }) {
    return (
        <div className="w-full p-6">
            <ul className="text-xs lg:text-sm flex items-center gap-2 lg:gap-3 truncate text-slate-700">
                {urls && urls.map((item, index) => (
                    <li key={index} className="flex items-center gap-2 lg:gap-3 group last:font-bold">
                        {item}
                        <FaAngleLeft className="w-3 lg:w-4 h-3 lg:h-4 group-last:hidden" />
                    </li>
                ))}
            </ul>
        </div>
    )
}
