import { IoWalletOutline } from "react-icons/io5";

export default function IncreaseWalletCredit() {
    return (
        <div>
            <div className="w-full mb-4 flex items-center justify-between bg-slate-200 p-6 rounded-xl font-medium">
                <div className="flex items-center gap-4 text-slate-800">
                    <IoWalletOutline className="w-6 h-6" />
                    <div>
                        مانده اعتبار کیف پول
                    </div>
                </div>
                <div className="text-slate-800 text-sm">
                    0 تومان
                </div>
            </div>
            <div className="flex items-center gap-3">
                <button className="btn btn--primary">
                    شارژ حساب
                </button>
                <button className="btn btn--primary">
                    افزودن حساب بانکی
                </button>
                <button className="btn btn--primary">
                    برداشت
                </button>
            </div>
        </div>
    )
}
