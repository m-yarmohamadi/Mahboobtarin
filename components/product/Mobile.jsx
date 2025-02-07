import numberWithCommas from "@/utils/numberWithCommas";
import AddToCart from "./AddToCart";
import { FaChevronLeft, FaStar } from "react-icons/fa6";
import UrlBar from "./UrlBar";
import { MdOutlineInfo } from "react-icons/md";
import RelatedProducts from "./RelatedProducts";
import DetailBox from "./DetailBox";
import Comments from "./Comments";
import discountCalculator from "@/utils/discountCalculator";

export default function Mobile({ product, relatedProducts }) {
    return (
        <div className="w-full pb-[90px] lg:hidden">
            <div className="w-full gap-8 flex items-center justify-between border-t border-slate-300 dark:border-slate-400 fixed bottom-[68px] right-0 bg-white p-4 z-50">
                <div className="flex flex-col gap-2 justify-center">
                    {product?.anbar <= 4 && product?.anbar !== 0 &&
                        <div className="text-error font-semibold text-xs">
                            {product?.anbar} عدد موجود در انبار
                        </div>
                    }
                    <AddToCart product={product} productId={product.id} inventory={product.anbar} />
                </div>
                <div className="flex-1 flex flex-col items-end gap-1">
                    <div>
                        {product?.discount_price > 0 &&
                            <div className="py-1 px-2 text-[#fff] bg-error text-xs font-bold rounded-lg">
                                {product?.discount_price} %
                            </div>
                        }
                    </div>
                    <div className="font-bold text-slate-900">
                        {numberWithCommas(discountCalculator(product?.price, product?.discount_price))}
                        &nbsp;
                        <span className="text-xs text-slate-700">
                            تومان
                        </span>
                    </div>
                </div>
            </div>

            <UrlBar urls={['محبوب‌ترین', product?.categories[0]?.name]} />

            <div className="p-6">
                <div className="aspect-w-9 aspect-h-9">
                    <img src={product?.photos[0]?.path} alt={product.title} className="w-full h-full object-cover rounded-xl" />
                </div>
            </div>

            <div className="w-full mt-6 p-4">
                <div className="w-full flex flex-col">
                    <h1 className="font-bold text-lg text-slate-800 mb-1">
                        {product?.title}
                    </h1>
                    <div className="text-xs text-slate-400 dark:text-slate-600">
                        {product?.sku}
                    </div>
                </div>


                <div className="w-full flex flex-col gap-4">
                    <div className="flex items-center gap-3">
                        <FaStar className="w-4 h-4 text-yellow-500" />
                        <span className="text-xs text-slate-700">(4/5)</span>
                        <div className="flex items-center gap-2 bg-slate-200 rounded-full px-2 py-1 text-slate-900 text-xs">
                            152 نظر
                            <FaChevronLeft className="w-2 h-2" />
                        </div>
                    </div>
                    <div className="text-slate-800 font-semibold text-xs mt-3">
                        عرضه کننده :نام عرضه کننده
                    </div>

                    {/* <div className="flex items-center flex-wrap gap-2">
                        <div className="flex flex-col gap-1 bg-slate-200 rounded-xl p-3 text-xs">
                            <span className="text-slate-500">
                                ویژگی اول
                            </span>
                            <span className="text-slate-800 font-medium">
                                تست
                            </span>
                        </div>
                        <div className="flex flex-col gap-1 bg-slate-200 rounded-xl p-3 text-xs">
                            <span className="text-slate-500">
                                ویژگی اول
                            </span>
                            <span className="text-slate-800 font-medium">
                                تست
                            </span>
                        </div>
                        <div className="flex flex-col gap-1 bg-slate-200 rounded-xl p-3 text-xs">
                            <span className="text-slate-500">
                                ویژگی اول
                            </span>
                            <span className="text-slate-800 font-medium">
                                تست
                            </span>
                        </div>
                    </div> */}
                </div>

                {/* <div className="text-xs text-slate-700 leading-6 font-semibold" dangerouslySetInnerHTML={{ __html: product.shortdescription }}>

                </div> */}

            </div>

            <div className="border-t-8 border-slate-300 dark:border-slate-400 mt-7 p-4 flex gap-2">
                <div>
                    <MdOutlineInfo className="w-5 h-5 text-error" />
                </div>
                <div className="text-xs text-slate-500 dark:text-slate-600 leading-6 font-medium">
                    درخواست مرجوع کردن کالا با دلیل "انصراف از خرید" تنها در صورتی قابل تایید است که کالا در شرایط اولیه باشد.
                </div>
            </div>

            <DetailBox title={'درباره محصول'}>
                <div className="text-xs text-slate-700 leading-6 font-semibold" dangerouslySetInnerHTML={{ __html: product.shortdescription }}>
                </div>
            </DetailBox>

            <RelatedProducts data={relatedProducts} />

            <DetailBox title={'نظرات'}>
                <Comments comments={product?.comments || []} />
            </DetailBox>
        </div >
    )
}

