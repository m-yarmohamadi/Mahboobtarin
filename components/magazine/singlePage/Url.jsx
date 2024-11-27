import Link from "next/link";
import { FaAngleLeft } from "react-icons/fa6";

export default function Url({ data }) {
    return (
        <div className="flex items-center gap-2 border-r-4 border-r-primary-01 py-1 pr-2">
            <UrlItem data={data} />
        </div>
    )
}

function UrlItem({ data }) {
    return (
        <>
            <div className="flex items-center gap-2 group text-slate-800 font-bold text-sm">
                <Link href={`/magazine`} className="group-last:text-primary-01">
                    {data.name}
                </Link>
                <FaAngleLeft className="group-last:hidden" />
            </div>
            {data.parent_recursive && <UrlItem data={data.parent_recursive} />}
        </>
    );
}
