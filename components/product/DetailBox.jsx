export default function DetailBox({ title, children }) {
    return (
        <div>
            <div className="flex flex-col border-t-8 lg:border-t-4 border-slate-300 dark:border-slate-400 mt-7 p-4 gap-6">
                <div className='pt-3'>
                    <h2 className='text-sm lg:text-base text-slate-800 font-bold'>
                        {title}
                    </h2>
                </div>
                {children}
            </div>
        </div>
    )
}
