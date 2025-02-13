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
                            با تشکر فراوان از زمانی که برای ثبت‌نام در سامانه “محبوب‌ترین” صرف نمودید و در راستای تحقق اولین دانشنامه چندمنظوره و خودناظر گام برداشتید، به اطلاع می‌رساند که مراحل ثبت‌نام شما با موفقیت به پایان رسید. در صورتی که شرایط لازم را دارا باشید، به زودی دسترسی شما به پنل کاربریتان فعال خواهد شد.                        </p>
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
