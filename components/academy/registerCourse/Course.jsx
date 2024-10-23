export default function Course() {
    return (
        <div className="w-full bg-white border border-slate-200 dark:border-slate-500 rounded-lg p-6">
            <div className="flex items-center gap-4">
                <div className="w-16 h-16 lg:w-28 lg:h-28">
                    <img src={'/images/img01.jpg'} alt="" className="w-full h-full object-cover rounded-xl"/>
                </div>
                <div className="text-primary-01 font-bold text-sm md:text-xl">
                    نام دوره
                </div>
            </div>
        </div>
    )
}
