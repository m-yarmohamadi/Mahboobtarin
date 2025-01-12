import { useGetSendMethods } from "@/hooks/useCart";
import Loading from "@/tools/Loading";
import numberWithCommas from "@/utils/numberWithCommas";

export default function SendMethods({ sendMethod, setSendMethod, provinceLabel }) {
    const { sendMethods, isGetMethods } = useGetSendMethods();

    return (
        <div className="w-full border border-slate-300 dark:border-slate-400 rounded-xl p-6">
            <div>
                <span className="text-xs text-slate-500 dark:text-slate-600">
                    انتخاب روش ارسال
                </span>
            </div>

            <div>
                {
                    !isGetMethods ?
                        <div className="space-y-2 mt-5">
                            {sendMethods.map((item, index) => (
                                provinceLabel === "تهران" ?
                                    <div onClick={() => setSendMethod(item.englishTitle)} key={index} className={`w-full p-4 rounded-xl border cursor-pointer border-slate-300 dark:border-slate-400 ${sendMethod === item.englishTitle && "bg-slate-400"}`}>
                                        <h3 className="text-sm font-semibold text-slate-800 mb-2">
                                            {item.title}
                                        </h3>
                                        <div className="text-xs text-slate-700">
                                            <span>
                                                هزینه ارسال
                                            </span>
                                            &nbsp;
                                            <span>
                                                {numberWithCommas(item.price)} تومان
                                            </span>
                                        </div>
                                    </div>
                                    :
                                    item.englishTitle !== "motor" &&
                                    <div onClick={() => setSendMethod(item.englishTitle)} key={index} className={`w-full p-4 rounded-xl border cursor-pointer border-slate-300 dark:border-slate-400 ${sendMethod === item.englishTitle && "bg-slate-400"}`}>
                                        <h3 className="text-sm font-semibold text-slate-800 mb-2">
                                            {item.title}
                                        </h3>
                                        <div className="text-xs text-slate-700">
                                            <span>
                                                هزینه ارسال
                                            </span>
                                            &nbsp;
                                            <span>
                                                {numberWithCommas(item.price)} تومان
                                            </span>
                                        </div>
                                    </div>
                            ))}
                        </div>
                        :
                        <div className="w-full flex justify-center pb-6">
                            <Loading customeColor="#0693a4" />
                        </div>
                }
            </div>
        </div>
    )
}
