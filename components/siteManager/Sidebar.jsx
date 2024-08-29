import Link from "next/link";
import { usePathname } from "next/navigation";
import { MdOutlineSettings } from "react-icons/md";
import { TbCategory2, TbDashboard, TbLayoutDashboard, TbLogout, TbSlideshow } from "react-icons/tb";
import { LuAppWindow, LuBox, LuFileText, LuUsers2 } from "react-icons/lu";

const siteManagerMenu = [
    {
        id: 1,
        title: 'داشبورد',
        link: '',
        quanity: '',
        icon: TbDashboard,
    },
    {
        id: 2,
        title: 'محصولات',
        link: '',
        quanity: '',
        icon: LuBox,
    },
    {
        id: 3,
        title: 'دسته بندی',
        link: '',
        quanity: '',
        icon: TbCategory2,
    },
    {
        id: 4,
        title: 'برند ها',
        link: '',
        quanity: '',
        icon: TbLayoutDashboard,
    },
    {
        id: 5,
        title: 'صفحات',
        link: '',
        quanity: '',
        icon: LuAppWindow,
    },
    {
        id: 6,
        title: 'کاربران',
        link: '',
        quanity: '',
        icon: LuUsers2,
    },
    {
        id: 7,
        title: 'مطالب',
        link: '',
        quanity: '',
        icon: LuFileText,
    },
    {
        id: 8,
        title: 'اسلایدر',
        link: '',
        quanity: '',
        icon: TbSlideshow,
    },
    {
        id: 9,
        title: 'تنظیمات',
        link: '',
        quanity: '',
        icon: MdOutlineSettings,
    },
];

export default function Sidebar({ onClose, open }) {
    const pathname = usePathname();

    return (
        <>
            <div onClick={onClose} className={`${open ? "block" : "hidden"} lg:!hidden w-full h-full fixed top-0 right-0 z-50 bg-slate-900/50`}></div>
            <div className={`${open ? "translate-x-0" : "translate-x-full"} lg:col-span-4 xl:col-span-3 lg:!translate-x-0 duration-300 lg:duration-0 w-full max-w-[300px] lg:max-w-none fixed lg:static top-0 right-0 z-50 lg:z-0 h-full bg-white overflow-y-auto p-4`}>
                <div className='w-full bg-gray-200 rounded-xl py-2'>
                    <div className='w-full flex justify-center items-center p-2'>
                        <div className="w-20 h-20 flex items-center justify-center rounded-full overflow-hidden border-4 border-white">
                            <img
                                // className={user?.avatar[0]?.path && "object-cover w-full h-full"}
                                src={"/images/defaultUser.png"}
                                alt=''
                            />
                        </div>
                    </div>
                    <div className='w-full p-2 flex flex-col items-center justify-center gap-2'>
                        <span className='font-bold'>محمدرضا فرامرزی</span>
                        <span className="text-sm">test@gmail.com</span>
                    </div>
                </div>

                <div>
                    {siteManagerMenu.map((item, index) => {
                        return (
                            <Link
                                key={index}
                                href={`/site-manager/${item.link}`}
                                className={`flex justify-start gap-3 items-center px-2 py-3 cursor-pointer ${pathname && pathname.split("/").includes(item.link) && item.link && `text-secondary-01 font-bold`}`}>
                                <span>
                                    {<item.icon className="w-6 h-6" />}
                                </span>
                                <span className="text-sm font-medium">{item.title}</span>
                                {item.quanity && <span className='bg-primary-01 w-6 h-6 text-white flex justify-center items-center rounded-full'>{item.quanity}</span>}
                            </Link>
                        );
                    })}
                    <button className={`flex justify-start gap-3 items-center px-2 py-3 cursor-pointer text-error`}>
                        <span>
                            <TbLogout className="w-6 h-6" />
                        </span>
                        <span className="text-sm font-medium">خروج از حساب کاربری</span>
                    </button>
                </div>
            </div>
        </>

    )
}
