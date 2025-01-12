import numberWithCommas from "@/utils/numberWithCommas";
import AddToCart from "./AddToCart";
import Footer from "../Footer";
import UrlBar from "./UrlBar";
import { FaChevronLeft, FaStar } from "react-icons/fa6";
import { MdOutlineInfo } from "react-icons/md";
import { AiOutlineSafety } from "react-icons/ai";
import DetailBox from "./DetailBox";
import RelatedProducts from "./RelatedProducts";
import Comments from "./Comments";

export default function Desktop({ product, relatedProducts }) {
    return (
        <div className="hidden lg:block ">
            <div className="max-w-screen-xl mx-auto px-6">
                <UrlBar urls={['محبوب‌ترین', product?.categories[0]?.name]} />
                <div className="w-full flex items-start gap-8">
                    <div className="flex-1">
                        <div className="w[300px] aspect-w-9 aspect-h-9">
                            <img src={product?.photos[0]?.path} alt={product?.title} className="w-full h-full object-center object-cover rounded-xl" />
                        </div>
                    </div>

                    <div className="flex-1">

                        <h1 className="font-bold text-2xl text-slate-800 mb-3 pb-4 border-b border-b-slate-300 dark:border-b-slate-400">
                            {product?.title}
                        </h1>

                        <div className="w-full flex flex-col gap-4">
                            <div className="flex items-center gap-3">
                                <FaStar className="w-4 h-4 text-yellow-500" />
                                <span className="text-xs text-slate-700">(4/5)</span>
                                <div className="flex items-center gap-2 bg-slate-200 rounded-full px-2 py-1 text-slate-900 text-xs">
                                    152 نظر
                                    <FaChevronLeft className="w-2 h-2" />
                                </div>
                            </div>
                            <div>
                                <h2 className="text-sm font-semibold text-slate-800 pb-4">
                                    ویژگی ها
                                </h2>
                                <div className="flex items-center flex-wrap gap-2">
                                    <div className="flex flex-col gap-1 bg-slate-200 rounded-xl p-3 pl-6 text-xs">
                                        <span className="text-slate-500">
                                            ویژگی اول
                                        </span>
                                        <span className="text-slate-800 font-medium">
                                            تست
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1 bg-slate-200 rounded-xl p-3 pl-6 text-xs">
                                        <span className="text-slate-500">
                                            ویژگی اول
                                        </span>
                                        <span className="text-slate-800 font-medium">
                                            تست
                                        </span>
                                    </div>
                                    <div className="flex flex-col gap-1 bg-slate-200 rounded-xl p-3 pl-6 text-xs">
                                        <span className="text-slate-500">
                                            ویژگی اول
                                        </span>
                                        <span className="text-slate-800 font-medium">
                                            تست
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="mt-7 py-4 flex gap-2 border-t border-t-slate-300 dark:border-t-slate-400">
                            <div>
                                <MdOutlineInfo className="w-5 h-5 text-error" />
                            </div>
                            <div className="text-xs text-slate-500 dark:text-slate-600 leading-6 font-medium">
                                درخواست مرجوع کردن کالا با دلیل "انصراف از خرید" تنها در صورتی قابل تایید است که کالا در شرایط اولیه باشد.
                            </div>
                        </div>
                    </div>

                    <div className="flex-1 max-w-[350px] p-4 bg-slate-200 border border-slate-300 dark:border-slate-400 rounded-xl">
                        <div className="flex items-center justify-between font-semibold text-slate-900">
                            مشخصات
                            <div className="text-xs text-slate-400 dark:text-slate-600 font-normal">
                                {product?.sku}
                            </div>
                        </div>

                        <div className="mt-6 mb-12 space-y-4">
                            {product?.anbar <= 4 && product?.anbar !== 0 &&
                                <div className="text-error font-medium text-xs border-b border-slate-300 pb-4">
                                    {product?.anbar} عدد موجود در انبار
                                </div>
                            }
                            <div className="text-slate-800 font-medium text-xs border-b border-slate-300 pb-4">
                                کشور سازنده : {product?.attribute_values[0]?.title}
                            </div>
                            <div className="text-slate-800 font-medium text-xs border-b border-slate-300 pb-4">
                                عرضه کننده : نام عرضه کننده
                            </div>
                            <div className="text-slate-800 font-medium text-xs border-b border-slate-300 pb-4">
                                <div className="flex items-center gap-2">
                                    <AiOutlineSafety className="w-5 h-5" />
                                    گارانتی 12 ماهه
                                </div>
                            </div>
                        </div>

                        <div>
                            <div className="flex item-end justify-between gap-1 mb-3">
                                <div className="py-1 px-2 text-[#fff] bg-error text-xs rounded-lg">
                                    {product?.discount_price}  % تخفیف
                                </div>
                                <div className="font-bold text-xl text-slate-900">
                                    {numberWithCommas(product?.price)}
                                    &nbsp;
                                    <span className="text-xs text-slate-700">
                                        تومان
                                    </span>
                                </div>
                            </div>

                            <AddToCart product={product} productId={product.id} inventory={product.anbar}/>
                        </div>
                    </div>
                </div>

                <DetailBox title={'درباره محصول'}>
                    <div className="text-xs lg:text-sm text-slate-700 leading-6 font-semibold" dangerouslySetInnerHTML={{ __html: product.shortdescription }}>
                    </div>
                </DetailBox>

                <RelatedProducts data={relatedProducts} />

                <DetailBox title={'نظرات'}>
                    <Comments comments={product?.comments || []} />
                </DetailBox>
            </div>

            <Footer />
        </div>
    )
}