import numberWithCommas from "@/utils/numberWithCommas";
import { HiShoppingCart } from "react-icons/hi";
import { LiaShippingFastSolid } from "react-icons/lia";
import AddressList from "./AddressList";
import { FaArrowRight } from "react-icons/fa6";
import { useGetCart, useGetSendMethods } from "@/hooks/useCart";
import { useEffect, useState } from "react";
import Loading from "@/tools/Loading";
import SendMethods from "./SendMethods";

export default function Address({ setStep }) {
    return (
        <div className="w-full  max-w-screen-xl mx-auto p-6 lg:p-10">
            <div className="w-full flex items-center justify-between p-4 pl-6 border border-slate-300 rounded-xl">
                <div className="flex items-center gap-3">
                    <button onClick={() => setStep(1)} className="text-gray-800">
                        <FaArrowRight className="w-5 h-5" />
                    </button>
                    <h1 className="text-gray-800 font-semibold text-sm sm:text-base">
                        مشخصات ارسال
                    </h1>
                </div>
                <LiaShippingFastSolid className="w-8 h-8 sm:w-10 sm:h-10 text-primary-01" />
            </div>
            <div className="w-full grid items-start grid-cols-1 gap-6 lg:grid-cols-12 mt-6">
                <div className="w-full lg:col-span-8 space-y-6">
                    <AddressList />
                    <SendMethods />
                    <ProductsList />
                </div>
                <AddressSammary setStep={setStep} />
            </div>
        </div>
    )
}


function AddressSammary({ setStep }) {
    const { cart } = useGetCart();
    const { getPrice } = useGetSendMethods();

    return (
        <div className="w-full lg:col-span-4 border border-slate-300 rounded-xl p-6 space-y-3">
            <div className="w-full flex items-center justify-between text-gray-700">
                <span className="text-xs font-medium">
                    قیمت کالا ها({cart?.totalqty})
                </span>
                <div className="font-bold text-sm">
                    {numberWithCommas(cart.totalpureprice)} <span className="text-xs text-gray-600 font-medium">تومان</span>
                </div>
            </div>
            {cart.totaldiscountprice &&
                <div className="w-full flex items-center justify-between text-error">
                    <span className="text-xs font-medium">
                        سود شما از این خرید
                    </span>
                    <div className="font-bold text-sm">
                        {numberWithCommas(cart.totaldiscountprice)} <span className="text-xs text-gray-600 font-medium">تومان</span>
                    </div>
                </div>}
            <div className="w-full flex items-center justify-between">
                <span className="text-xs font-medium">
                    هزینه ارسال
                </span>
                <div className="font-bold text-sm">
                    {numberWithCommas(getPrice(cart.sendmethod))} <span className="text-xs text-gray-600 font-medium">تومان</span>
                </div>
            </div>
            <div className="w-full flex items-center justify-between text-gray-900 border-t border-gray-300 pt-4 !mt-4">
                <span className="font-bold text-sm">
                    قیمت نهایی
                </span>
                <div className="font-bold">
                    {numberWithCommas(cart.totalprice)} <span className="text-xs text-gray-600 font-medium">تومان</span>
                </div>
            </div>

            <button onClick={() => setStep(3)} className="btn btn--primary w-full !mt-6">
                تایید و ادامه
            </button>
        </div>
    )
}


function ProductsList() {
    const { cart, productsInCart, isGetProducts } = useGetCart();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        async function getProductsData() {
            const res = await productsInCart();
            setProducts(res);
        };

        if (!isGetProducts) {
            getProductsData();
        }
    }, [cart])

    return (
        <div className="w-full border border-slate-300 rounded-xl p-6">
            <div className="flex items-center gap-2 text-sm font-semibold text-gray-800 mb-5">
                <HiShoppingCart className="w-6 h-6" />
                محصولات شما ({products.length})
            </div>

            <div className="flex items-center flex-wrap gap-4">
                {products?.map((item, index) => (
                    <div key={item.id} className="border-l border-l-slate-300 pl-4 last:border-0 py-4">
                        <div className="w-32">
                            <div className="aspect-w-10 aspect-h-10">
                                <img src={item.photos[0].path} alt="" className="w-full h-full object-cover object-center  rounded-lg overflow-hidden" />
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}