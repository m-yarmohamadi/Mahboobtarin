import { AiOutlineUser } from "react-icons/ai";
import { FaCheck } from "react-icons/fa6";
import { FiUserCheck } from "react-icons/fi";
import { MdClose } from "react-icons/md";

export default function ApplicantItem() {
    const userDetails = [
        { label: "سطح", value: "برنزی" },
        { label: "تجربه", value: "5 سال" },
        { label: "امتیاز", value: "2/5" },
        { label: "شهر", value: "تهران" },
        { label: "سن", value: "33سال" },
        { label: "دنبال کننده", value: "15" },
    ]
    return (
        <div className="w-full bg-slate-200 rounded-lg p-4 grid grid-cols-1 lg:grid-cols-12 gap-3">
            <div className="lg:col-span-10 lg:flex flex-col gap-7">
                <div className="flex items-center lg:items-start gap-4">
                    <div className="w-[70px] h-[70px] lg:w-[110px] lg:h-[110px] relative rounded-md overflow-hidden grid grid-rows-2">
                        <div className="w-full bg-primary-01"></div>
                        <div className="w-full bg-white"></div>
                        <div className="w-[45px] h-[45px] lg:w-[70px] lg:h-[70px] absolute m-auto inset-0 border-2 border-white rounded-tl-xl rounded-br-xl overflow-hidden">
                            <img src="/images/MahdiYazdaniKhoram.jpg" alt="" className="w-full h-full object-cover object-center" />
                        </div>
                    </div>
                    <div className="lg:bg-slate-300 flex-1 rounded-lg relative lg:h-[110px] lg:px-4 lg:flex items-center">
                        <div className="flex flex-col gap-1 whitespace-nowrap">
                            <h4 className="font-bold text-slate-900 truncate">
                                نام و نام خانوادگی
                            </h4>
                            <span className="text-sm text-slate-800">
                                @username
                            </span>
                            <span className="text-sm font-medium text-slate-800">
                                نویسنده، بازیگر
                            </span>
                        </div>

                        <div className="text-xs text-slate-600 hidden lg:block absolute top-4 left-4">
                            15 مهر 1403 14:30
                        </div>

                        <div className="w-full hidden lg:grid grid-cols-3 pt-6 gap-1">
                            {userDetails.map((item, index) => (
                                <div key={index} className="flex items-center text-sm font-medium gap-1">
                                    <span className="text-primary-01">
                                        {item.label}:
                                    </span>
                                    <span className="text-slate-800">
                                        {item.value}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div>
                    <div className="lg:hidden mt-3">
                        <div className="w-full bg-slate-300 rounded-lg p-3 text-xs  font-medium">
                            <div className="pb-4 text-slate-600">
                                15 مهر 1403 14:30
                            </div>
                            <div className="text-slate-700">
                                تهران | برنزی | سن:33 سال | امتیاز 4/8 | سابقه : 5سال
                            </div>
                        </div>
                    </div>

                    <div className="w-full hidden lg:grid grid-cols-4 gap-10">
                        <Feature
                            title="تخصص و مهارت"
                            value="مهارت"
                        />
                        <Feature
                            title="آثار و افتخارات"
                            value="تست"
                        />
                        <Feature
                            title="تحصیلات"
                            value="کارشناسی ارشد - دانشگاه ازاد "
                        />
                        <Feature
                            title="زبان و گویش"
                            value="انگلیسی - متوسط"
                        />
                    </div>
                </div>
            </div>

            <div className="w-full grid grid-cols-4 gap-4 lg:col-span-2 lg:grid-cols-1">
                <Buttons type="default" />
                <Buttons type="info" />
                <Buttons type="danger" />
                <Buttons type="success" />
            </div>
        </div>
    )
}

function Buttons({ type }) {

    const btnType = {
        "success": {
            classNames: "bg-green-600/20 text-green-600",
            icon: <FaCheck />,
            text: "تایید نهایی",
            handler: () => { }
        },
        "danger": {
            classNames: "bg-red-600/20 text-red-600",
            icon: <MdClose className="w-5 h-5" />,
            text: "رد شده",
            handler: () => { }
        },
        "info": {
            classNames: "bg-cyan-600/20 text-cyan-600",
            icon: <FiUserCheck className="w-5 h-5" />,
            text: "تایید موقت",
            handler: () => { }
        },
        "default": {
            classNames: "bg-fuchsia-600/20 text-fuchsia-600",
            icon: <AiOutlineUser className="w-5 h-5" />,
            text: "پروفایل",
            handler: () => { }
        },
    };

    return (
        <div className="flex flex-col items-center gap-2 lg:flex-row lg:bg-slate-300 lg:p-2 lg:rounded-lg">
            <button onClick={btnType[type].handler} className={`${btnType[type].classNames} w-10 h-10 rounded-full flex items-center justify-center`}>
                {btnType[type].icon}
            </button>
            <div className="text-xs font-bold text-primary-01 flex-1 truncate">
                {btnType[type].text}
            </div>
        </div>
    )
}

function Feature({ title, value }) {
    return (
        <div>
            <div className="font-medium text-primary-01 mb-2">
                {title}
            </div>
            <div className="text-xs text-slate-800">
                {value}
            </div>
        </div>
    )
}