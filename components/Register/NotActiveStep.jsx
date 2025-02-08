import Link from "next/link";

export default function NotActiveStep() {

    return (
        <div className='w-full flex flex-col pt-12'>
            <div className='flex items-center justify-center'>
                <div className='w-full h-auto p-7 bg-primary-01 rounded-lg shadow-s max-w-2xl gap-7 mx-auto flex items-center justify-center flex-col'>
                    <div className="text text-sm text-slate-100 leading-6">
                        <p>
                            فرهیخته گرامی!
                        </p>
                        <p className="text-justify">
                            ضمن تشکر از وقتی که برای ثبت‌نام در سامانه محبوب‌ترین جهت تحقق اولین دانشنامه چند‌منظوره و خود ناظر صرف نمودید. به اطلاع می‌رسانیم که مراحل ثبت‌نام شما با موفقیت به پایان رسید. در صورتی‌که حضرتعالی شرایط لازم را دارا باشید، بزودی دسترسی شما به پنل کاربریتان باز خواهد شد و پس از آن شما می‌توانید با شماره موبایل ثبت شده خود وارد حساب کاربریتان شوید و از مزایای آن برخوردار شوید.
                        </p>
                    </div>

                    <div>
                        <Link href={'/'} className="btn btn--secondary">
                            بازگشت به صفحه اصلی
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
