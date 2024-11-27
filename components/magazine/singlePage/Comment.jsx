import Input from "@/tools/Input";
import TextArea from "@/tools/TextArea";

export default function Comment() {
    return (
        <div className="w-full border border-slate-300 dark:border-slate-400 rounded-ee-2xl">
            <div className="w-full bg-slate-700 text-slate-100 text-lg md:text-xl p-3 rounded-ee-2xl font-bold">
                نظرات بینندگان
            </div>

            <form className="w-full p-6">
                <div className="md:grid md:grid-cols-2 md:gap-6">
                    <div>
                        <Input
                            label={"نام"}
                        />
                        <Input
                            label={"ایمیل"}
                        />
                    </div>
                    <TextArea
                        label={"نظر"}
                    />
                </div>
                <div className="flex flex-col sm:flex-row gap-4 items-center justify-between pt-4">
                    <div className="text-xs text-slate-800">
                        انتشار یافته: | در انتظار بررسی:0
                    </div>
                    <button className="btn btn--primary !px-10">
                        ثبت
                    </button>
                </div>
            </form>
        </div>
    )
}
