export default function Author({ author }) {
    return (
        <div className="flex items-center justify-between">
            <div className="flex items-center sm:col-span-4 gap-2">
                <div className="w-12 h-12 lg:w-16 lg:h-16">
                    <img
                        className="w-full h-full object-cover object-center rounded-full"
                        src={"/images/SadeghAlHoseini.jpg"}
                        alt=""
                    />
                </div>
                <div className="flex flex-col gap-1">
                    <span className="text-xs lg:text-sm font-bold text-slate-800">
                        {author.name} {author.lastname}
                    </span>
                    <span className="text-xs text-slate-600">
                        @{author.unique_url_id}
                    </span>
                </div>
            </div>

            <div>
                <button className="btn btn--primary">
                    دنبال کردن
                </button>
            </div>
        </div>
    )
}
