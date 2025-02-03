import { useChangeRegisterStatus } from "@/hooks/expertHooks/useCalling";
import calculateAge from "@/utils/calculateAge";
import { toPersianDateLong } from "@/utils/toPersianDate";
import { useRouter } from "next/navigation";
import { AiFillMessage, AiOutlineUser } from "react-icons/ai";
import { FaCheck } from "react-icons/fa6";
import { FiUserCheck } from "react-icons/fi";
import { MdClose, MdOutlineChat } from "react-icons/md";

export default function ApplicantItem({ applicant, createdAt, id, isNew, show_mobile }) {
    const {
        name,
        lastname,
        unique_url_id,
        birthday,
        avatar,
        expertises,
        amount_experience_year,
        followers,
        honors_description,
        usergrade,
        userlanguage,
    } = applicant;
    const age = calculateAge(birthday);

    const router = useRouter();
    const { mutateChangeRegisterStatus, isPending } = useChangeRegisterStatus();

    const userDetails = [
        { label: "سطح", value: "--" },
        { label: "تجربه", value: `${amount_experience_year} سال` },
        { label: "امتیاز", value: "--" },
        { label: "شهر", value: "--" },
        { label: "سن", value: `${age} سال` },
        { label: "دنبال کننده", value: followers?.length || 0 },
    ]

    const changeRegisterStatusHandler = (status) => {
        mutateChangeRegisterStatus({ id, status })
    }

    return (
        <div className={`${isNew ? "bg-slate-200" : "bg-slate-300"} w-full rounded-lg p-4 grid grid-cols-1 lg:grid-cols-12 gap-3`}>
            <div className="lg:col-span-10 lg:flex flex-col gap-7">
                <div className="flex items-center lg:items-start gap-4">
                    <div className="w-[70px] h-[70px] lg:w-[110px] lg:h-[110px] relative rounded-md overflow-hidden grid grid-rows-2">
                        <div className="w-full bg-primary-01"></div>
                        <div className="w-full bg-white"></div>
                        <div className="w-[45px] h-[45px] lg:w-[70px] lg:h-[70px] absolute m-auto inset-0 border-2 border-white rounded-tl-xl rounded-br-xl overflow-hidden">
                            <img src={avatar && avatar.length > 0 ? avatar[0]?.path : "/images/user.png"} alt="" className="w-full h-full object-cover object-center" />
                        </div>
                    </div>
                    <div className={`${isNew ? "lg:bg-slate-300" : "lg:bg-slate-200"} flex-1 rounded-lg relative lg:h-[110px] lg:px-4 lg:flex items-center`}>
                        <div className="flex flex-col gap-1 whitespace-nowrap">
                            <h4 className="font-bold text-slate-900 truncate">
                                {name} {lastname}
                            </h4>
                            <span className="text-sm text-slate-800">
                                @{unique_url_id}
                            </span>
                            <div className="text-sm font-medium text-slate-800 flex items-center gap-1">
                                {expertises.map((item, index) => (
                                    <div key={index} className="group">
                                        {item.subject}
                                        <span className="group-last:hidden">،</span>
                                    </div>
                                ))}
                            </div>
                            <div className="text-sm text-slate-900">
                                {show_mobile && show_mobile === "1" ? "091200000000" : "شماره پنهان شده"}
                            </div>
                        </div>

                        <div className="text-xs text-slate-600 hidden lg:block absolute top-4 left-4">
                            {toPersianDateLong(createdAt)}
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
                        <div className={`${isNew ? "bg-slate-300" : "bg-slate-200"} w-full  rounded-lg p-3 text-xs font-medium`}>
                            <div className="pb-4 text-slate-600">
                                {toPersianDateLong(createdAt)}
                            </div>
                            <div className="text-slate-700">
                                --- | --- | سن: {age} سال | امتیاز --- | سابقه : {amount_experience_year} سال
                            </div>
                        </div>
                    </div>

                    <div className="w-full hidden lg:grid grid-cols-4 gap-10">
                        <Feature
                            title="تخصص و مهارت"
                        >
                            <div className="flex flex-col gap-1">
                                {expertises.map((item, index) => (
                                    <span key={index}>
                                        {item.subject}
                                    </span>
                                ))}
                            </div>
                        </Feature>
                        <Feature
                            title="آثار و افتخارات"
                        >
                            {honors_description}
                        </Feature>
                        <Feature
                            title="تحصیلات"
                        >
                            <div className="flex flex-col gap-1">
                                {usergrade.map((item, index) => (
                                    <span key={index}>
                                        {item.title} - {item.subject}
                                    </span>
                                ))}
                            </div>
                        </Feature>
                        <Feature
                            title="زبان و گویش"
                        >
                            <div className="flex flex-col gap-1">
                                {userlanguage.map((item, index) => (
                                    <span key={index}>
                                        {item.title} - {item.subject}
                                    </span>
                                ))}
                            </div>
                        </Feature>
                    </div>
                </div>
            </div>

            <div className="w-full grid auto-cols-fr grid-flow-col lg:grid-flow-row gap-4 lg:col-span-2 lg:grid-cols-1">
                <Buttons type="default" handler={() => router.push(`/${unique_url_id}`)} isNew={isNew} />
                <Buttons type="info" handler={() => changeRegisterStatusHandler(1)} isNew={isNew} />
                <Buttons type="danger" handler={() => changeRegisterStatusHandler(2)} isNew={isNew} />
                <Buttons type="success" handler={() => changeRegisterStatusHandler(3)} isNew={isNew} />
                {
                    show_mobile === "0" &&
                    <Buttons type="msg" isNew={isNew} />
                }
            </div>
        </div>
    )
}

function Buttons({ type, handler = () => { }, isNew }) {

    const btnType = {
        "success": {
            classNames: "bg-green-600/20 text-green-600",
            icon: <FaCheck />,
            text: "تایید نهایی",
            handler
        },
        "danger": {
            classNames: "bg-red-600/20 text-red-600",
            icon: <MdClose className="w-4 h-4" />,
            text: "رد شده",
            handler
        },
        "info": {
            classNames: "bg-cyan-600/20 text-cyan-600",
            icon: <FiUserCheck className="w-4 h-4" />,
            text: "تایید موقت",
            handler
        },
        "default": {
            classNames: "bg-fuchsia-600/20 text-fuchsia-600",
            icon: <AiOutlineUser className="w-4 h-4" />,
            text: "پروفایل",
            handler
        },
        "msg": {
            classNames: "bg-blue-600/20 text-blue-600",
            icon: <MdOutlineChat className="w-5 h-5" />,
            text: "ارسال پیام",
            handler
        },
    };

    return (
        <button onClick={btnType[type].handler} className={`${isNew ? "lg:bg-slate-300" : "lg:bg-slate-200"} flex flex-col items-center gap-2 lg:flex-row lg:p-1 lg:rounded-md cursor-pointer`}>
            <div className={`${btnType[type].classNames} w-10 h-10 rounded-full flex items-center justify-center`}>
                {btnType[type].icon}
            </div>
            <div className="text-xs font-bold text-primary-01 flex-1 truncate">
                {btnType[type].text}
            </div>
        </button>
    )
}

function Feature({ title, children }) {
    return (
        <div>
            <div className="font-medium text-primary-01 mb-2">
                {title}
            </div>
            <div className="text-xs text-slate-800">
                {children}
            </div>
        </div>
    )
}