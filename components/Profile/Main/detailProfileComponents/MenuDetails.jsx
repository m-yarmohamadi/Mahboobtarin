import { useGetServicesProfile } from "@/hooks/expertHooks/useServices";
import Link from "next/link"
import { useState } from "react"

export default function MenuDetails({ userData, popularList, permissions }) {
    const [active, setActive] = useState();
    const { isLoadingServices, servicesData } = useGetServicesProfile(userData?.id);

    const items = [
        { label: "خدمات", link: "#services", isShow: !isLoadingServices && servicesData.length > 0 },
        { label: "بیوگرافی", link: "#bio", isShow: userData?.description },
        { label: "نشانی", link: "#address", isShow: permissions?.phone || permissions?.workAddress ? true : false },
        { label: "تخصص و مهارت", link: "#skills", isShow: userData?.expert_description },
        { label: "آثار و افتخارات", link: "#honors_description", isShow: userData?.honors_description },
        { label: "تحصیلات", link: "#grade", isShow: userData?.usergrade.length > 0 },
        { label: "زبان و گویش", link: "#languages", isShow: userData?.userlanguage.length > 0 },
        { label: "محبوب‌ترین", link: "#populars", isShow: popularList.length > 0 },
        { label: "گالری", link: "#gallery", isShow: userData.gallery.length > 0 },
        { label: "لینکدونی", link: "#linkdins", isShow: userData?.link_dooni.length > 0 },
        { label: "غرفه", link: "#booth", isShow: true },
        { label: "نظر و امتیاز", link: "#comments", isShow: true },
    ]

    return (
        <div className="w-full flex items-center gap-5 overflow-x-auto no-scrollbar border-b border-b-slate-300 dark:border-b-slate-400 pt-4 mb-4">
            {items.map((item, index) => (
                item.isShow &&
                <Link
                    key={index}
                    href={item.link}
                    onClick={() => setActive(item.link)}
                    className={`${item.link === active ? "text-slate-900 before:opacity-100" : "text-slate-600 before:opacity-0"} pb-2 relative text-sm whitespace-nowrap font-bold before:w-full before:h-1 before:bg-slate-900 before:rounded-t-full before:absolute before:bottom-0 before:right-0`}
                >
                    {item.label}
                </Link>
            ))}
        </div>
    )
}
