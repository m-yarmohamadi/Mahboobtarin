import numberWithCommas from "@/utils/numberWithCommas";
import AddToCart from "./AddToCart";

export default function Mobile({ product }) {
    return (
        <div className="w-full pb-[90px] lg:hidden pt-12">
            <div className="w-full gap-8 flex items-center justify-between border-t border-slate-300 fixed bottom-0 right-0 bg-white p-4">
                <AddToCart productId={product.id}/>
                <div className="flex-1 flex flex-col items-end gap-1">
                    <div className="py-1 px-2 text-white bg-error text-xs font-bold rounded-lg">
                        {product.discount_price} %
                    </div>
                    <div className="font-bold text-gray-900">
                        {numberWithCommas(product.price)}
                        &nbsp;
                        <span className="text-xs text-gray-700">
                            تومان
                        </span>
                    </div>
                </div>
            </div>

            <div className="w-full h-[250px]">
                <img src={product.photos[0].path} alt={product.title} className="w-full h-[250px] object-contain" />
            </div>

            <div className="w-full mt-6 p-4">
                <div className="w-full flex items-center justify-between">
                    <div className="text-xs space-x-1 font-semibold text-tertiary-02 mb-4">
                        <span>
                            {product.brand.title}
                        </span>
                        <span>&nbsp; / &nbsp;</span>
                        <span>
                            {product.categories[0].name}
                        </span>
                    </div>
                    <div className="text-xs text-slate-400">
                        {product.sku}
                    </div>
                </div>
                <h1 className="font-bold text-lg text-gray-800 mb-1">
                    {product.title}
                </h1>
                <div className="text-xs text-gray-700 leading-6 font-semibold" dangerouslySetInnerHTML={{__html:product.shortdescription}}>
                    
                </div>

                <div className="text-error font-semibold text-xs mt-6">
                    {product.anbar} عدد موجود در انبار
                </div>
                <div className="text-gray-800 font-semibold text-xs mt-3">
                    کشور سازنده : {product.attribute_values[0].title}
                </div>
            </div>

            <div className="border-t-8 border-slate-300 mt-7 p-4">
                <h4 className="text-sm font-semibold text-gray-800 mb-4">
                    معرفی محصول
                </h4>
                <div className="text-xs text-gray-700 leading-6 font-medium" dangerouslySetInnerHTML={{__html:product.description}}>
                </div>
            </div>
        </div>
    )
}
