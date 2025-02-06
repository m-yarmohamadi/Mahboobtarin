import Link from "next/link"
import { usePathname } from "next/navigation";
import { FaListAlt, FaRegListAlt } from "react-icons/fa";
import { FaHeart, FaRegHeart, FaRegUser, FaUser } from "react-icons/fa6";
import { HiOutlineSpeakerphone, HiSpeakerphone } from "react-icons/hi";
import { IoChatboxEllipses, IoChatboxEllipsesOutline, IoHome, IoHomeOutline } from "react-icons/io5"

export default function MobileMenu({ user, isLoading }) {
    const pathname = usePathname();

    const menuItems = [
        {
            label: "خانه",
            link: "/",
            icon: IoHomeOutline,
            activeIcon: IoHome
        },
        {
            label: "محبوب‌ترین‌ها",
            link: !isLoading && user ? user?.type === "user" ? "/user/profile" : "/admin/mahbobtarin" : "/auth",
            icon: FaRegHeart,
            activeIcon: FaHeart
        },
        {
            label: "سفارشات",
            link: !isLoading && user ? user?.type === "user" ? "/user/profile" : "/admin/orders" : "/auth",
            icon: FaRegListAlt,
            activeIcon: FaListAlt
        },
        {
            label: "گفتگو",
            link: !isLoading && user ? user?.type === "user" ? "/user/profile" : "/admin/chats" : "/auth",

            icon: IoChatboxEllipsesOutline,
            activeIcon: IoChatboxEllipses
        },
        {
            label: !isLoading && user ? "داشبورد" : "ورود | ثبت‌نام",
            link: !isLoading && user ? user?.type === "user" ? "/user/profile" : "/admin/dashboard" : "/auth",
            icon: FaRegUser,
            activeIcon: FaUser,
            loading: isLoading
        },
    ]

    const checkActiveLink = (href) => {
        return pathname && pathname === href && href ? true : false
    }

    return (
        <div className="w-full lg:hidden z-50 py-3 max-h-20 flex items-center justify-center fixed bottom-0 right-0 bg-primary-02 shadow-[0_-10px_15px_-3px_rgba(0,0,0,0.1)]">
            <ul className="w-full flex">
                {menuItems.map((item, index) => (
                    <li key={index} className={`${item.loading ? "opacity-60 blur-sm" : ""} flex-1 duration-150`}>
                        <Link href={item.link} className={`flex flex-col items-center gap-2 ${checkActiveLink(item.link) ? "text-slate-900 font-semibold" : "text-slate-600"}`}>
                            {checkActiveLink(item.link) ? <item.activeIcon className="w-5 h-5" /> : <item.icon className="w-5 h-5" />}
                            <span className="text-[8px] min-[370px]:text-xs text-center truncate">
                                {item.label}
                            </span>
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    )
}
