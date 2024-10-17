import { useAddToCart, useGetCart, useGetSendMethods } from "@/hooks/useCart";
import Loading from "@/tools/Loading";
import numberWithCommas from "@/utils/numberWithCommas";

export default function SendMethods() {
    const { changeSendMethodOrder } = useAddToCart();
    const { sendMethods, isGetMethods } = useGetSendMethods();
    const { cart } = useGetCart();

    return (
        <div className="w-full border border-slate-300 rounded-xl p-6">
            <div>
                <span className="text-xs text-slate-500">
                    انتخاب روش ارسال
                </span>
            </div>

            <div>
                {
                    !isGetMethods ?
                        <div className="space-y-2 mt-5">
                            {sendMethods.map((item, index) => (
                                <div onClick={() => changeSendMethodOrder(item.englishTitle)} key={index} className={`w-full p-4 rounded-xl border cursor-pointer border-slate-300 ${cart.sendmethod === item.englishTitle && "bg-primary-01 bg-opacity-20"}`}>
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
