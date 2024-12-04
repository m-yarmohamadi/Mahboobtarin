export default function SupportOption({ supportOptions }) {

    const renderImage = (index) => {
        switch (index) {
            case 0: return "/images/shop-waranty.png"
            case 1: return "/images/shop-support.png"
            case 2: return "/images/shop-delivery.png"
        }
    }

    return (
        <div className="md:mx-auto md:container p-6 mt-10">
            <div className="w-full p-8 bg-white rounded-lg grid grid-cols-1 gap-8 lg:md:grid-cols-2 lg:grid-cols-3">
                {supportOptions.map((item, index) => (
                    <Option
                        key={index}
                        title={item.title}
                        description={item.description}
                        image={renderImage(index)}
                    />
                ))}
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
                <p className="text-sm sm:text-lg font-bold text-slate-800">
                    {title}
                </p>
                <span className="text-xs sm:text-sm text-slate-500">
                    {description}
                </span>
            </div>
        </div>
    )
}