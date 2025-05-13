import calculateAge from "@/utils/calculateAge";
import numberWithCommas from "@/utils/numberWithCommas"
import moment from "jalali-moment";
import Countdown from "react-countdown";
import { IoCheckmarkDone } from "react-icons/io5"

export function ChatMessageBox({ isOwnMessage, data }) {

    return (
        <div className={`${isOwnMessage ? "self-end bg-slate-300 dark:bg-slate-400 !rounded-bl-none" : "bg-white !rounded-br-none"} rounded-2xl !w-auto max-w-[80%] md:max-w-[50%] p-3 relative`}>
            <div className="mb-4 text-xs font-semibold text-slate-800">
                {data?.message}
            </div>

            <div className="w-full flex items-center justify-end text-slate-700 gap-1">
                <span className="text-[10px]">
                    {data?.created_at && new Date(data?.created_at).toLocaleTimeString("fa-IR", { hour: "2-digit", minute: "2-digit" })}
                </span>
                {isOwnMessage && <IoCheckmarkDone />}
            </div>
        </div>
    )
}

export function ChatMessageTypeChat({ user, order, provinces }) {
    const orderDateTime = JSON.parse(order.json_data);
    const orderDate = moment(orderDateTime.date, 'jYYYY/jM/jD').toDate();
    const miladiDate = moment(orderDateTime.date, 'jYYYY/jM/jD').toDate();
    const timestamp = miladiDate.valueOf();
    const province = provinces?.filter((p) => Number(p.value) === Number(user.province_id))[0]?.label

    return (
        <div className="w-auto min-w-[80%] md:min-w-[50%] max-w-[80%] md:max-w-[50%] bg-slate-300 dark:bg-slate-400 rounded-2xl !rounded-bl-none p-3 self-end relative">
            <div className="font-bold text-orange-600 absolute top-3 left-3">
                <Countdown date={timestamp} />
            </div>

            <div className="flex items-center gap-2 mb-4">
                <div className="relative">
                    <div className="w-10 h-10">
                        <img src={user?.avatar || "/images/user.png"} alt="user" className="w-full h-full object-cover object-center rounded-full" />
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-slate-800">
                        {user?.name} {user?.lastname}
                    </span>
                    <span className="text-xs text-slate-600">
                        {user?.gender === "man" ? "مرد" : "زن"} | {calculateAge(user?.birthday)} ساله | {province}
                    </span>
                </div>
            </div>

            <div className="mb-4 flex flex-col items-start gap-2">
                <div className="text-xs text-slate-700 font-semibold">
                    {order?.type}
                </div>

                <div className="text-xs text-slate-700">
                    وضعیت :
                    <span className="font-semibold text-slate-900">
                        تایید شده
                    </span>
                </div>

                <div className="text-xs text-slate-700 font-semibold">
                    {/* یکشنبه 15 دی 1403 ساعت 15:40 */}
                    {new Date(orderDate).toLocaleDateString("fa-IR", { weekday: "long" })}
                    {" "}
                    {new Date(orderDate).toLocaleDateString("fa-IR", { year: "numeric", month: "long", day: "numeric" })}
                    {" "}
                    ساعت {orderDateTime.time}
                </div>

                <div className="text-sm text-slate-600 font-semibold">
                    <Countdown date={timestamp} />
                </div>

                <div className="text-xs text-slate-700">
                    تعرفه :
                    <span className="font-semibold text-slate-900">
                        {numberWithCommas(order.price)} تومان
                    </span>
                </div>

                {/* <button className="btn btn--primary !text-xs !p-2 !px-4">
                    فایل ضمیمه
                </button> */}
            </div>

            <div className="text-xs">
                <div className="text-primary-01 font-semibold mb-1">
                    شرح:
                </div>
                <p className="text-slate-800">
                    {orderDateTime.description}
                </p>
            </div>
        </div>
    )
}
