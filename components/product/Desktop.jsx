import numberWithCommas from "@/utils/numberWithCommas";
import AddToCart from "./AddToCart";
import Footer from "../Footer";

export default function Desktop({ product }) {
    return (
        <div className="hidden lg:block ">
            <div className="max-w-screen-xl mx-auto pt-16 px-6">
                <div className="w-full flex items-start gap-8">
                    <div className="w-[300px] aspect-w-10 aspect-h-10">
                        <img src={product.photos[0].path} alt={product.title} className="w-full h-[300px] object-top object-contain" />
                    </div>

                    <div className="flex-1">
                        <div className="text-xs space-x-1 font-semibold text-tertiary-02 mb-8">
                            <span>
                                {product.brand.title}
                            </span>
                            <span>&nbsp; / &nbsp;</span>
                            <span>
                                {product.categories[0].name}
                            </span>
                        </div>
                        <h1 className="font-bold text-2xl text-slate-800 mb-3">
                            {product.title}
                        </h1>
                        <div className="text-sm text-slate-700 leading-6 font-semibold" dangerouslySetInnerHTML={{ __html: product.shortdescription }}>
                        </div>

                        <div className="mt-9 border-t border-t-slate-300 pt-4">
                            <h4 className="text-sm font-semibold text-slate-800 mb-4">
                                معرفی محصول
                            </h4>
                            <div className="text-xs text-slate-700 leading-6 font-medium" dangerouslySetInnerHTML={{ __html: product.description }}>
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 max-w-[350px] p-4 bg-primary-05 border border-slate-300 rounded-xl">
                        <div className="flex items-center justify-between font-semibold text-slate-900">
                            مشخصات
                            <div className="text-xs text-slate-400 font-normal">
                                {product.sku}
                            </div>
                        </div>

                        <div className="mt-6 mb-12 space-y-4">
                            <div className="text-error font-medium text-xs border-b border-slate-300 pb-4">
                                {product.anbar} عدد موجود در انبار
                            </div>
                            <div className="text-slate-800 font-medium text-xs border-b border-slate-300 pb-4">
                                کشور سازنده : {product.attribute_values[0].title}
                            </div>
                        </div>

                        <div>
                            <div className="flex item-end justify-between gap-1 mb-3">
                                <div className="py-1 px-2 text-white bg-error text-xs rounded-lg">
                                    {product.discount_price}  % تخفیف
                                </div>
                                <div className="font-bold text-xl text-slate-900">
                                    {numberWithCommas(product.price)}
                                    &nbsp;
                                    <span className="text-xs text-slate-700">
                                        تومان
                                    </span>
                                </div>
                            </div>

                            <AddToCart productId={product.id} />
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </div>
    )
}