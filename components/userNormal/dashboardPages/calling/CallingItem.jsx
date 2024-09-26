export default function CallingItem() {
    return (
        <div className="flex flex-col p-4 bg-slate-200 border border-slate-300 rounded-xl">
            <div className="aspect-w-16 aspect-h-11 rounded-lg overflow-hidden mb-4">
                <img src="/images/liraglotide.webp" alt="" className="w-full h-full object-cover object-center"/>
            </div>

            <div className="">
                <h4 className="text-slate-800 font-bold pb-1">
                    عنوان فراخوان
                </h4>
                <span className="text-xs text-slate-500">
                    دسته بندی
                </span>
                <p className="text-sm font-medium text-slate-700 pt-2 leading-6">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ و با استفاده از طراحان گرافیک است چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم است و برای شرایط فعلی تکنولوژی مورد نیاز
                </p>
            </div>
        </div>
    )
}
