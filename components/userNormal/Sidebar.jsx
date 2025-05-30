import useLogout from "@/hooks/useLogout";
import useProfile from "@/hooks/useProfile";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BiSupport } from "react-icons/bi";
import { BsChatSquareDots } from "react-icons/bs";
import { FaPortrait } from "react-icons/fa";
import { FaRegBookmark, FaRegUser } from "react-icons/fa6";
import { GiWallet } from "react-icons/gi";
import { HiOutlineSpeakerphone } from "react-icons/hi";
import { LiaUserFriendsSolid } from "react-icons/lia";
import { LuUsers2 } from "react-icons/lu";
import { MdOutlineListAlt, MdOutlineNotificationsNone, MdOutlineSettings } from "react-icons/md";
import { RiVipCrownLine } from "react-icons/ri";
import { TbLogout } from "react-icons/tb";


const dataMenu = [
    {
        id: 2,
        title: 'اطلاعات من',
        value: 'profile',
        quanity: '',
        icon: FaRegUser,
    },
    {
        id: 50,
        title: 'گفتگو',
        value: 'chats',
        quanity: '',
        icon: BsChatSquareDots,
    },
    {
        id: 30,
        title: 'سفارشات',
        value: 'orders',
        quanity: '',
        icon: MdOutlineListAlt,
    },
    {
        id: 3,
        title: 'فراخوان جدید',
        value: 'calling',
        quanity: '',
        icon: HiOutlineSpeakerphone,
    },
    {
        id: 4,
        title: 'درخواست از محبوب‌ترین',
        value: '#',
        quanity: '',
        icon: MdOutlineListAlt,
    },
    {
        id: 92,
        title: 'نشان شده',
        value: 'bookmarks',
        quanity: '',
        icon: FaRegBookmark,
    },
    {
        id: 12,
        title: 'اعلان ها',
        value: 'notification',
        quanity: '3',
        icon: MdOutlineNotificationsNone,
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

export default function Sidebar({ open, onClose }) {
    const pathname = usePathname();
    const { user, isLoading } = useProfile();
    const logout = useLogout();

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
                            سطح: <span className='font-bold'>نقره ای</span>
                        </span>
                    </div>
                    <div className='p-3'>
                        <div className='p-3 bg-white rounded-md'>
                            <div className=' flex justify-between items-center text-textDefault'>
                                <span>مانده تا سطح طلایی:</span>
                                <span>21%</span>
                            </div>
                            <div className='w-full '>
                                <div className='w-full bg-slate-300 rounded-full dark:bg-slate-800 flex flex-row-reverse'>
                                    <div className='bg-primary-01 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full w-1/5'>21%</div>
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
                                <span>{0}</span>
                                <span>تومان</span>
                            </span>
                        </div>
                        <div className='w-full col-span-3'>
                            <Link
                                className='btn btn--primary !p-2 !w-full'
                                href={'/user/wallet'}
                            >
                                مشاهده
                            </Link>
                        </div>
                    </div>
                </div>

                <div>
                    {dataMenu.map((item, index) => {
                        return (
                            <Link
                                key={index}
                                href={`/user/${item.value}`}
                                className={`flex justify-start gap-6 items-center px-2 py-4 text-sm font-medium cursor-pointer text-textDefault ${pathname && pathname.split("/").includes(item.value) && item.value && `!text-secondary-01 font-bold`}`}>
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
