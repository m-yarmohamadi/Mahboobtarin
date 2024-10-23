import { CiLocationOn } from "react-icons/ci";

export default function ExpertDetails({ expert }) {

    return (
        <div className="w-full bg-white border border-slate-200 dark:border-slate-500 rounded-lg p-6">
            <div className="flex items-center gap-3 mb-8">
                <div className="w-20 h-20">
                    <img
                        src={expert?.img?.length ? expert?.img[0]?.path : "/images/user.png"}
                        alt=""
                        className="w-full h-full object-cover object-center rounded-full"
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <h4 className="text-primary-01 font-medium">
                        {expert?.name} {expert?.lastname}
                    </h4>
                    <span className="text-slate-800 text-sm">
                        {expert?.expertise}
                    </span>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <CiLocationOn className="w-5 h-5 text-slate-600" />
                <span className="text-sm text-slate-600">
                    {expert?.address}
                </span>
            </div>
        </div>
    )
}
