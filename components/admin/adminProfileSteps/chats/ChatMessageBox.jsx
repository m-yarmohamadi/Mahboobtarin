import numberWithCommas from "@/utils/numberWithCommas"
import { IoCheckmarkDone } from "react-icons/io5"

export function ChatMessageBox({ typeUser }) {
    return (
        <div className={`${typeUser === "user" ? "self-end bg-slate-300 dark:bg-slate-400 !rounded-bl-none" : "bg-white !rounded-br-none"} rounded-2xl !w-auto max-w-[80%] md:max-w-[50%] p-3 relative`}>
            <div className="mb-4 text-xs font-semibold text-slate-800">
                لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ
            </div>

            <div className="w-full flex items-center justify-end text-slate-700 gap-1">
                <span className="text-[10px]">
                    13:04
                </span>
                <IoCheckmarkDone />
            </div>
        </div>
    )
}

export function ChatMessageTypeChat() {
    return (
        <div className="w-auto max-w-[80%] md:max-w-[50%] bg-slate-300 dark:bg-slate-400 rounded-2xl !rounded-bl-none p-3 self-end relative">
            <div className="font-bold text-orange-600 absolute top-3 left-3">
                00:15:20
            </div>

            <div className="flex items-center gap-2 mb-4">
                <div className="relative">
                    <div className="w-10 h-10">
                        <img src="/images/user.png" alt="user" className="w-full h-full object-cover object-center rounded-full" />
                    </div>
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-sm font-bold text-slate-800">
                        محمدرضا فرامرزی
                    </span>
                    <span className="text-xs text-slate-600">
                        مرد | 25 ساله | تهران
                    </span>
                </div>
            </div>

            <div className="mb-4 flex flex-col items-start gap-2">
                <div className="text-xs text-slate-700 font-semibold">
                    مشاوره صوتی | 5 دقیقه
                </div>

                <div className="text-xs text-slate-700">
                    وضعیت :
                    <span className="font-semibold text-slate-900">
                        تایید شده
                    </span>
                </div>

                <div className="text-xs text-slate-700 font-semibold">
                    یکشنبه 15 دی 1403 ساعت 15:40
                </div>

                <div className="text-sm text-slate-600 font-semibold">
                    00:02:50:25
                </div>

                <div className="text-xs text-slate-700">
                    تعرفه :
                    <span className="font-semibold text-slate-900">
                        {numberWithCommas(250000)} تومان
                    </span>
                </div>

                <button className="btn btn--primary !text-xs !p-2 !px-4">
                    فایل ضمیمه
                </button>
            </div>

            <div className="text-xs">
                <div className="text-primary-01 font-semibold mb-1">
                    شرح:
                </div>
                <p className="text-slate-800">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است
                </p>
            </div>
        </div>
    )
}
