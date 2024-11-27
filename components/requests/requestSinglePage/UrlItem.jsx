import { FaAngleLeft } from "react-icons/fa";

export default function UrlItem({ data }) {
    return (
        <div className="w-auto flex items-center gap-1 text-xs md:text-sm text-slate-700">
            <Url data={data} />
        </div>
    );
}

function Url({ data }) {
    return (
        <>
            {data.parent_recursive && <Url data={data.parent_recursive} />}
            <div className="first:font-medium first:text-slate-900">
                {data.name}
            </div>
            <FaAngleLeft className="last:hidden" />
        </>
    )
}