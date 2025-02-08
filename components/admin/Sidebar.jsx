import useLogout from "@/hooks/useLogout";
import useProfile from "@/hooks/useProfile";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaPortrait, FaRegCommentDots } from "react-icons/fa";
import { FaBlog, FaChartColumn, FaRegBookmark, FaRegHandshake, FaRegUser } from "react-icons/fa6";
import { GiWallet } from "react-icons/gi";
import { IoNewspaperOutline } from "react-icons/io5";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { LuBookMarked, LuBox, LuUsers2 } from "react-icons/lu";
import { MdOutlineFavoriteBorder, MdOutlineListAlt, MdOutlineMedicalServices, MdOutlineNotificationsNone, MdOutlineSettings } from "react-icons/md";
import { TbDashboard, TbLogout } from "react-icons/tb";
import { RiGalleryLine, RiVipCrownLine } from "react-icons/ri";
import { BiSupport } from "react-icons/bi";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { BsChatSquareDots } from "react-icons/bs";
import { useGetAllNotifs } from "@/hooks/expertHooks/useNotifications";
import numberWithCommas from "@/utils/numberWithCommas";


export default function Sidebar({ open, onClose }) {
    const { notifications } = useGetAllNotifs();

    const dataMenu = [
        {
            id: 1,
            title: 'پیشخوان',
            value: 'dashboard',
            quanity: '',
            icon: TbDashboard,
        },
        {
            id: 2,
            title: 'اطلاعات من',
            value: 'personalInfo',
            quanity: '',
            icon: FaRegUser,
        },
        {
            id: 50,
            title: 'گفتگو',
            value: 'chats',
            quanity: '',
            icon: BsChatSquareDots,
            limit: ["Bronze"]
        },
        {
            id: 3,
            title: 'سفارشات',
            value: 'orders',
            quanity: '',
            icon: MdOutlineListAlt,
            limit: ["Bronze"]
        },
        {
            id: 9,
            title: 'درخواست جدید',
            value: 'requests_client',
            quanity: '',
            icon: FaRegHandshake,
            limit: ["Bronze"]
        },
        {
            id: 4,
            title: 'فراخوان جدید',
            value: 'calling',
            quanity: '',
            icon: HiOutlineSpeakerphone,
            limit: ["Bronze", "Silver"]
        },
        {
            id: 5,
            title: 'مدیریت خدمات',
            value: 'services',
            quanity: '',
            icon: MdOutlineMedicalServices,
            limit: ["Bronze"]
        },
        {
            id: 18,
            title: 'محصولات',
            value: 'products',
            quanity: '',
            icon: LuBox,
            limit: ["Bronze"]
        },
        {
            id: 22,
            title: 'آموزشگاه',
            value: 'academy',
            quanity: '',
            icon: LuBookMarked,
            limit: ["Bronze"]
        },
        {
            id: 6,
            title: 'گالری',
            value: 'gallery',
            quanity: '',
            icon: RiGalleryLine,
            limit: ["Bronze", "Silver"]
        },
        {
            id: 7,
            title: 'لینکدونی',
            value: 'linkdin',
            quanity: '',
            icon: IoNewspaperOutline,
            limit: ["Bronze", "Silver"]
        },
        {
            id: 20,
            title: 'محبوب‌ترین های من',
            value: 'mahbobtarin',
            quanity: '',
            icon: MdOutlineFavoriteBorder,
        },
        {
            id: 8,
            title: 'نظرات و امتیازات',
            value: 'comments',
            quanity: '',
            icon: FaRegCommentDots,
            limit: ["Bronze"]
        },
        {
            id: 91,
            title: 'درخواست از محبوب‌ترین',
            value: 'request_services',
            quanity: '',
            icon: FaBlog,
        },
        {
            id: 92,
            title: 'نشان شده',
            value: 'bookmarks',
            quanity: '',
            icon: FaRegBookmark,
        },
        {
            id: 10,
            title: 'دنبال کنندگان',
            value: 'followers',
            quanity: '',
            icon: LuUsers2,
        },
        {
            id: 11,
            title: 'دنبال شونده',
            value: 'following',
            quanity: '',
            icon: LuUsers2,
        },
        {
            id: 12,
            title: 'اعلان ها',
            value: 'notification',
            quanity: notifications?.length || null,
            icon: MdOutlineNotificationsNone,
        },
        {
            id: 13,
            title: 'آمار',
            value: 'statistics',
            quanity: '',
            icon: FaChartColumn,
        },
        {
            id: 14,
            title: 'دعوت از دوستان',
            value: 'invate',
            quanity: '',
            icon: LiaUserFriendsSolid,
        },
        {
            id: 15,
            title: 'خرید اشتراک',
            value: 'buy_vip',
            quanity: '',
            icon: RiVipCrownLine,
        },
        {
            id: 16,
            title: 'پشتیبانی',
            value: 'support',
            quanity: '',
            icon: BiSupport,
        },
        {
            id: 17,
            title: 'تنظیمات',
            value: 'settings',
            quanity: '',
            icon: MdOutlineSettings,
        },
    ];

    const pathname = usePathname();
    const { user, isLoading } = useProfile();
    const { user_level } = user || {};
    const logout = useLogout();

    const filteredMenu = dataMenu.filter(
        (d) => !d.limit || !d.limit.includes(user_level)
    );

    const getLevelOption = (level) => {
        const levelScore = {
            Bronze: 1,
            Silver: 2,
            Gold: 3,
        };

        const maxScore = 3;
        const currentScore = levelScore[level];
        const percent = ((currentScore / maxScore) * 100).toFixed();

        switch (level) {
            case "Bronze": return { label: "برنزی", percent }
                break;

            case "Silver": return { label: "نقره ای", percent }
                break;

            case "Gold": return { label: "طلایی", percent }
                break;

            default:
                break;
        }
    }

    return (
        <>
            <div onClick={onClose} className={`${open ? "block" : "hidden"} lg:!hidden w-full h-full fixed top-0 right-0 z-50 bg-slate-900/50`}></div>
            <div className={`${open ? "translate-x-0" : "translate-x-full"} lg:!translate-x-0 duration-300 lg:duration-0 w-auto fixed lg:static top-0 right-0 z-50 lg:z-0 h-full lg:col-span-3 bg-primary-02 lg:w-full overflow-y-auto p-4`}>
                <div className=' w-full bg-slate-200 rounded-md'>
                    <div className='w-full flex justify-center items-center p-2'>
                        <div className="w-20 h-20 flex items-center justify-center rounded-full overflow-hidden border-4 border-slate-100 dark:bg-slate-900">
                            <img
                                className={user?.avatar[0]?.path && "object-cover w-full h-full"}
                                src={user?.avatar[0]?.path || "/images/defaultUser.png"}
                                alt=''
                            />
                        </div>
                    </div>
                    <div className='w-full p-2 flex flex-col items-center justify-center gap-2 text-textDefault'>
                        <span className='font-bold'>{user?.name} {user?.lastname}</span>
                        <span>{user?.unique_url_id}</span>
                        <span className='text-sm'>
                            سطح: <span className='font-bold'>{getLevelOption(user_level)?.label}</span>
                        </span>
                    </div>
                    <div className='p-3'>
                        <div className='p-3 bg-white rounded-md'>
                            <div className=' flex justify-between items-center text-textDefault pb-1'>
                                <span>مانده تا سطح طلایی:</span>
                                <span>{100 - getLevelOption(user_level)?.percent}%</span>
                            </div>
                            <div className='w-full '>
                                <div className='w-full bg-slate-300 rounded-full dark:bg-slate-800 flex flex-row-reverse'>
                                    <div style={{ width: `${getLevelOption(user_level)?.percent}%` }} className='bg-primary-01 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full'>
                                        {getLevelOption(user_level)?.percent}%
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='p-2'>
                    <div className='grid grid-cols-12 justify-center items-center text-slate-800'>
                        <div className='w-full col-span-2 text-3xl'>
                            <GiWallet />
                        </div>
                        <div className='w-full col-span-7 flex flex-col justify-center items-start text-sm font-bold'>
                            <span >موجودی کیف پول</span>
                            <span>
                                <span>{numberWithCommas(user?.wallet)}</span>
                                {Number(user?.wallet) > 0 && <span>تومان</span>}
                            </span>
                        </div>
                        <div className='w-full col-span-3'>
                            <Link
                                className='btn btn--primary !p-2 !w-full'
                                href={'/admin/wallet'}
                            >
                                مشاهده
                            </Link>
                        </div>
                    </div>
                </div>

                <div className={`duration-150 ${isLoading ? "opacity-30 blur-sm" : ""}`}>
                    {filteredMenu.map((item, index) => {
                        return (
                            <Link
                                key={index}
                                href={`/admin/${item.value}`}
                                className={`flex justify-start gap-6 items-center px-2 py-4 text-sm font-medium cursor-pointer text-textDefault ${pathname && pathname.split("/").includes(item.value) && item.value && `!text-secondary-01 font-black shadow-md dark:shadow-darkMd shadow-primary-03 bg-opacity-40 bg-white rounded-md`}`}>
                                <span>
                                    {item.icon && <item.icon className="w-6 h-6" />}
                                </span>
                                <span>{item.title}</span>
                                {item.quanity && <span className='text-textDefault bg-primary-01 w-6 h-6 flex justify-center items-center rounded-full'>{item.quanity}</span>}
                            </Link>
                        );
                    })}
                    <button onClick={logout} className={`flex justify-start gap-6 items-center px-2 py-4 cursor-pointer text-sm font-medium text-error`}>
                        <span>
                            <TbLogout className="w-6 h-6" />
                        </span>
                        <span>خروج از حساب کاربری</span>
                    </button>
                </div>
            </div>
        </>
    )
}
