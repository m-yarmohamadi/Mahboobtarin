
const levels = [
    {
        step: 0,
        title: "اطلاعات شخصی",
        stepName: "مرحله اول"
    },
    {
        step: 1,
        title: "آدرس",
        stepName: "مرحله دوم"
    },
    {
        step: 2,
        title: "اطلاعات تخصصی و رمز عبور",
        stepName: "مرحله سوم"
    },
    {
        step: 3,
        title: "پذیرش قوانین و مقررات",
        stepName: "مرحله چهارم"
    },
]

export default function StepLevel({ currentStep }) {
    return (
        <>
            <div className='hidden lg:flex w-full justify-between items-center py-4 rounded-lg overflow-hidden border border-slate-200 dark:border-slate-400 mb-9'>
                {levels.map((item, index) => (
                    <div key={index} className={`${currentStep > item.step ? '' : 'justify-center'} px-4 flex items-center gap-2 w-full border-l last:border-0 border-slate-200 dark:border-slate-400`}>
                        <div className={`${currentStep > item.step ? "bg-primary-01 text-white" : "text-primary-01 bg-slate-100"} text-2xl w-12 h-12 flex items-center justify-center rounded-full`}>
                            {item.step + 1}
                        </div>
                        {currentStep > item.step &&
                            <span className="text-xs font-semibold text-slate-800 whitespace-nowrap">
                                {item.title}
                            </span>
                        }
                    </div>

                ))}
            </div>
            <div className='lg:hidden w-full py-4 mb-9'>
                {levels.map((item, index) => (
                    <div key={index} className={`${currentStep === item.step + 1 ? 'flex' : 'hidden'} items-center`}>
                        <div className={`ml-3 ${currentStep > item.step ? "bg-primary-01 text-white" : "text-primary-01 bg-slate-100"} text-2xl w-12 h-12 flex items-center justify-center rounded-full`}>
                            {item.step + 1}
                        </div>
                        <span className="text-sm font-semibold text-slate-800 whitespace-nowrap">
                            {item.title}
                        </span>
                    </div>

                ))}
            </div>
        </>
    )
}
