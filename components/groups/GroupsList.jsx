import { useGetProvinces } from "@/hooks/useCity";
import { useGetServicesProfile } from "@/hooks/expertHooks/useServices";
import copyToClipboard from "@/utils/copyToClipboard";
import Link from "next/link";
import { FaCalendar, FaRegBookmark, FaSave, FaShareAlt } from "react-icons/fa"
import { FaAngleLeft, FaBattleNet, FaLocationDot, FaPhoneFlip, FaRegHeart, FaStar, FaStethoscope } from "react-icons/fa6"
import { MdCastForEducation, MdInsertInvitation, MdOutlineTextsms, MdWifiProtectedSetup } from "react-icons/md"

export default function GroupsList({ users }) {
    return (
        <div className="w-full flex flex-col gap-4 pt-6">
            {
                users && users.length ?
                    users.map((user, index) => (
                        <GroupItem key={index} user={user} />
                    ))
                    :
                    <div className="w-full py-28 flex flex-col gap-4 items-center justify-center">
                        <img src="/images/emptyList.png" alt="" />
                        <div className="text-slate-800 font-medium">
                            متخصصی یافت نشد!
                        </div>
                    </div>
            }
        </div>
    )
}


function GroupItem({ user }) {
    const { provinces, isLoading } = useGetProvinces();
    const { isLoadingServices, servicesData } = useGetServicesProfile(user?.id);
    const getProvinceLabel =
        !isLoading &&
        provinces.filter((p) => Number(p.id) === Number(user?.province_id))[0]
            ?.name;

    return (
        <div className="w-full flex flex-col gap-6 p-4 rounded-lg border border-slate-300">
            <div className="w-full lg:grid grid-cols-12  gap-4">
                <div className="w-full col-span-6 lg:col-span-3 flex lg-flex-col flex-row items-start gap-2">
                    <div className="flex lg:flex-col gap-2 pb-2">
                        <div className="w-20 h-20">
                            <img
                                src={user.avatar.length ? user.avatar[0].path : "/images/user.png"}
                                alt={`${user.name} ${user.lastname}`}
                                className="w-full h-full object-cover object-center rounded-full"
                            />
                        </div>
                        <div className="flex flex-col gap-1">
                            <h2 className="font-black text-textDefault text-sm">
                                {user.name} {user.lastname}
                            </h2>
                            <span className="text-[10px] text-slate-700">
                                {user.unique_url_id}@
                            </span>
                            <span className="text-[10px] text-slate-700">
                                {user.expertises.length ? user.expertises[0].subject : null}
                            </span>
                        </div>

                    </div>
                    <button className="flex w-fit items-start justify-center py-2 px-4 rounded-lg bg-primary-01">
                        <span className="w-full text-xs text-slate-100 font-bold ">
                            {'دنبال کردن' || ""}
                        </span>
                    </button>


                </div>
                <div className="flex flex-col col-span-4 lg:col-span-9 justify-start items-start gap-2">
                    <div className="flex  items-center gap-2">
                        <div className="w-fit  flex items-center justify-center gap-2 py-2 px-4 rounded-lg bg-primary-02">
                            <FaCalendar className="w-4 h-4 text-slate-700" />
                            <span className="text-xs text-slate-700">
                                {'تاریخ پیوستن: بهمن 1402' || ""}
                            </span>
                        </div>
                        <div className="w-fit  flex items-center justify-center py-2 px-4 rounded-lg bg-primary-02">
                            <span className="text-xs text-slate-700">
                                {' 4 دنبال شده' || ""}
                            </span>
                        </div>
                        <div className="w-fit  flex items-center justify-center py-2 px-4 rounded-lg bg-primary-02">
                            <span className="text-xs text-slate-700">
                                {'5 دنبال کننده' || ""}
                            </span>
                        </div>








                    </div>
                    <div className="flex  items-center gap-2">
                        <div
                            // onClick={() => copyToClipboard(`${window.location.origin}/${user?.unique_url_id}`, "لینک اشتراک گذاری کپی شد")} 
                            className="px-2 h-10  flex items-center justify-center gap-1 rounded-lg bg-slate-200"
                        >
                            <FaRegBookmark className="w-5 h-5 text-slate-700" />
                        </div>
                        <button onClick={() => copyToClipboard(`${window.location.origin}/${user?.unique_url_id}`, "لینک اشتراک گذاری کپی شد")} className="px-2 h-10  flex items-center justify-center gap-1 rounded-lg bg-slate-200">
                            <FaShareAlt className="w-5 h-5 text-slate-700" />
                        </button>
                        <button className="px-2 h-10 flex items-center justify-center gap-1 rounded-lg bg-slate-200">
                            <FaLocationDot className="w-4 h-4 text-slate-700" />
                            <span className="text-xs text-slate-700">
                                {getProvinceLabel || ""}
                            </span>
                        </button>
                        <div className="px-2 text-xs h-10 flex flex-col items-center justify-center gap-1 rounded-lg bg-slate-200">
                            <div className="flex justify-center items-center gap-1 text-primary-01">
                                <span className="flex justify-center items-center">
                                    11.500+
                                </span>
                                <span className="flex justify-center items-center">
                                    <FaStethoscope />
                                </span>
                            </div>

                            <span className="w-full flex justify-center items-center text-slate-700">
                                مشاوره موفق
                            </span>
                        </div>
                        <div className="px-2 text-xs h-10 flex flex-col items-center justify-center gap-1 rounded-lg bg-slate-200">
                            <div className="flex justify-center items-center gap-1 text-primary-01">
                                <span className="flex justify-center items-center">{4.9}</span>
                                <span className="flex justify-center items-center">
                                    <FaStar className="text-yellow-500" />
                                </span>
                            </div>

                            <span className="w-full flex justify-center items-center text-slate-700">
                                از {1996} نظر
                            </span>
                        </div>
                        {user.amount_experience_year &&
                            <div className="px-2 h-10 text-xs text-slate-700 flex items-center justify-center gap-1 rounded-lg bg-slate-200">
                                {user.amount_experience_year} سال تجربه
                            </div>
                        }</div>


                </div>
            </div>

            <div className="w-full flex flex-col lg:flex-row gap-4">
                <div className="w-full flex flex-wrap items-center gap-2 text-xs text-slate-700">
                    {!isLoadingServices && servicesData?.map((service) => (
                        <div key={service.id} className="flex justify-center items-center gap-1 p-1 bg-slate-200 rounded-md ">
                            <span>
                                <FaPhoneFlip />
                            </span>
                            <span>
                                {service.type}
                            </span>
                        </div>
                    ))}

                </div>

                <Link href={`/${user.unique_url_id}`} className=" flex justify-center items-center gap-1 text-primary-01 text-sm whitespace-nowrap">
                    <span>مشاهده پروفایل</span>
                    <span>
                        <FaAngleLeft />
                    </span>
                </Link>
            </div>
        </div>
    )
}