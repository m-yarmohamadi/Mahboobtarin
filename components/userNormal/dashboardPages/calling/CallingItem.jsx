export default function CallingItem({ data }) {
    return (
        <div className="flex flex-col p-4 bg-slate-200 border border-slate-300 rounded-xl">
            <div className="aspect-w-16 aspect-h-11 rounded-lg overflow-hidden mb-4">
                <img src={data?.picture} alt="" className="w-full h-full object-cover object-center" />
            </div>

            <div className="">
                <h4 className="text-slate-800 font-bold pb-1">
                    {data?.title}
                </h4>
                <span className="text-xs text-slate-500">
                    {data?.category}
                </span>
                <p className="text-sm font-medium text-slate-700 pt-2 leading-6">
                    {data?.description}
                </p>
            </div>
        </div>
    )
}
