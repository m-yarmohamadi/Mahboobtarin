export default function SupportOption() {
    return (
        <div className="md:mx-auto md:container p-6 mt-10">
            <div className="w-full p-8 bg-white rounded-lg grid grid-cols-1 gap-8 lg:md:grid-cols-2 lg:grid-cols-3">
                <Option
                    title="بازگشت کالا تا 7 روز"
                    description="در صورت وجود مشکل در سفارش، می توانید تا 7 روز آن را مرجوع کنید"
                    image="/images/shop-waranty.png"
                />
                <Option
                    title="پشتیبانی در 7 روز هفته"
                    description="کارشناسان ما 7 روز هفته آماده پاسخگویی به سوالات شما هستند"
                    image="/images/shop-support.png"
                />
                <Option
                    title="ارسال در کوتاه ترین زمان"
                    description="با امکاری ارسال اکسپرس، سفارش خود را درکمتر از 3 ساعت تحویل بگیرید"
                    image="/images/shop-delivery.png"
                />
            </div>
        </div>
    )
}

function Option({ image, title, description }) {
    return (
        <div className="w-full flex items-start gap-4">
            <div>
                <div className="w-16 sm:w-20 h-16 sm:h-20 bg-slate-200 rounded-lg flex items-center justify-center p-4">
                    <img src={image} alt="" />
                </div>
            </div>
            <div className="flex flex-col gap-2">
                <p className="text-sm sm:text-lg font-bold text-gray-800">
                    {title}
                </p>
                <span className="text-xs sm:text-sm text-gray-500">
                    {description}
                </span>
            </div>
        </div>
    )
}