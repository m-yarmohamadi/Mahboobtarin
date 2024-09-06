import useLogout from "@/hooks/useLogout";
import useProfile from "@/hooks/useProfile";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaPortrait } from "react-icons/fa";
import { GiWallet } from "react-icons/gi";


const dataMenu = [
    {
        id: 1,
        title: 'پیشخوان',
        value: 'dashboard',
        quanity: '',
        icon: '',
    },
    {
        id: 2,
        title: 'اطلاعات من',
        value: 'personalInfo',
        quanity: '',
        icon: '',
    },
    {
        id: 18,
        title: 'محصولات',
        value: 'products',
        quanity: '',
        icon: '',
    },
    {
        id: 3,
        title: 'سفارش جدید',
        value: 'newOrder',
        quanity: '12',
        icon: '',
    },
    {
        id: 4,
        title: 'فراخوان جدید',
        value: '',
        quanity: '7',
        icon: '',
    },
    {
        id: 5,
        title: 'مدیریت خدمات',
        value: 'services',
        quanity: '',
        icon: '',
    },
    {
        id: 6,
        title: 'گالری',
        value: 'gallery',
        quanity: '',
        icon: '', 
    },
    {
        id: 7,
        title: 'لینکدونی',
        value: 'linkdin',
        quanity: '',
        icon: '',
    },
    {
        id: 20,
        title: 'محبوب ترین',
        value: 'mahbobtarin',
        quanity: '',
        icon: '',
    },
    {
        id: 8,
        title: 'نظزات و امتیازات',
        value: '',
        quanity: '',
        icon: '',
    },
    {
        id: 9,
        title: 'درخواست تولید محتوا',
        value: '',
        quanity: '',
        icon: '',
    },
    {
        id: 10,
        title: 'دنبال کنندگان',
        value: '',
        quanity: '',
        icon: '',
    },
    {
        id: 11,
        title: 'دنبال شونده',
        value: '',
        quanity: '',
        icon: '',
    },
    {
        id: 12,
        title: 'اعلان ها',
        value: '',
        quanity: '3',
        icon: '',
    },
    {
        id: 13,
        title: 'آمار',
        value: '',
        quanity: '',
        icon: '',
    },
    {
        id: 14,
        title: 'دعوت از دوستان',
        value: '',
        quanity: '',
        icon: '',
    },
    {
        id: 15,
        title: 'خرید اشتراک',
        value: '',
        quanity: '',
        icon: '',
    },
    {
        id: 16,
        title: 'پشتیبانی',
        value: '',
        quanity: '',
        icon: '',
    },
    {
        id: 17,
        title: 'تنظیمات',
        value: '',
        quanity: '',
        icon: '',
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
                <div className=' w-full bg-gray-200 rounded-md'>
                    <div className='w-full flex justify-center items-center p-2'>
                        <div className="w-20 h-20 flex items-center justify-center rounded-full overflow-hidden border-4 border-white">
                            <img
                                className={user?.avatar[0]?.path && "object-cover w-full h-full"}
                                src={user?.avatar[0]?.path || "/images/defaultUser.png"}
                                alt=''
                            />
                        </div>
                    </div>
                    <div className='w-full p-2 flex flex-col items-center justify-center gap-2'>
                        <span className='font-bold'>{user?.name} {user?.lastname}</span>
                        <span>{user?.email}</span>
                        <span className='text-sm'>
                            سطح: <span className='font-bold'>نقره ای</span>
                        </span>
                    </div>
                    <div className='p-3'>
                        <div className='p-3 bg-white rounded-md'>
                            <div className=' flex justify-between items-center'>
                                <span>مانده تا سطح طلایی:</span>
                                <span>21%</span>
                            </div>
                            <div className='w-full '>
                                <div className='w-full bg-gray-300 rounded-full dark:bg-gray-800 flex flex-row-reverse'>
                                    <div className='bg-primary-01 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full w-1/5'>21%</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className='p-2'>
                    <div className='grid grid-cols-12 justify-center items-center text-gray-800'>
                        <div className='w-full col-span-2 text-3xl'>
                            <GiWallet />
                        </div>
                        <div className='w-full col-span-7 flex flex-col justify-center items-start'>
                            <span>موجودی کیف پول</span>
                            <span>
                                <span>{0}</span>
                                <span>تومان</span>
                            </span>
                        </div>
                        <div className='w-full col-span-3'>
                            <button
                                className='p-2 bg-primary-01 text-white rounded-md w-full'
                                type=''>
                                مشاهده
                            </button>
                        </div>
                    </div>
                </div>

                <div>
                    {dataMenu.map((item, index) => {
                        return (
                            <Link
                                key={index}
                                href={`/admin/${item.value}`}
                                className={`flex justify-start gap-6 items-center px-2 py-4 cursor-pointer ${pathname && pathname.split("/").includes(item.value) && item.value && `text-secondary-01 font-bold`}`}>
                                <span>
                                    <FaPortrait />
                                </span>
                                <span>{item.title}</span>
                                {item.quanity && <span className='bg-primary-01 w-6 h-6 text-white flex justify-center items-center rounded-full'>{item.quanity}</span>}
                            </Link>
                        );
                    })}
                    <button onClick={logout} className={`flex justify-start gap-6 items-center px-2 py-4 cursor-pointer`}>
                        <span>
                            <FaPortrait />
                        </span>
                        <span>خروج از حساب کاربری</span>
                    </button>
                </div>
            </div>
        </>
    )
}
