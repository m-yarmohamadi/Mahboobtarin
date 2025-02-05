import { BsFillPatchCheckFill } from "react-icons/bs";

export default function UserData({userData}) {
    return (
        <div className="flex flex-col">
            <div className="flex items-center gap-2">
                <div className=" font-bold text-xl xl:text-2xl text-textDefault pb-1">
                    {userData?.user_title ||
                        `${userData?.name} ${userData?.lastname}`}
                </div>
                {userData?.is_verify && <BsFillPatchCheckFill className="w-4 h-4 text-primary-01" />}
                
            </div>
            <span className=" text-xs text-slate-700">
                {userData?.unique_url_id}@
            </span>
            <div className="flex items-center gap-1 py-2">
                {userData?.expertises?.map((expertise, index) => (
                    expertise.subject &&
                    <div
                        key={index}
                        className="group text-xs md:text-sm text-primary-01"
                    >
                        <span className="">{expertise.subject}</span>
                        <span className="group-last:hidden">،</span>
                    </div>
                ))}
            </div>
        </div>

    )
}
