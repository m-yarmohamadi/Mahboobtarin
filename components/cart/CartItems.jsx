import { useEffect, useState } from "react"
import { FaRegTrashAlt } from "react-icons/fa"
import { MdAdd } from "react-icons/md";
import { FiMinus } from "react-icons/fi";
import { useAddToCart, useGetCart } from "@/hooks/useCart";
import numberWithCommas from "@/utils/numberWithCommas";
import Loading from "@/tools/Loading";
import { ThreeDots } from "react-loader-spinner";
import Link from "next/link";

export default function CartItems() {
    const { cart, productsInCart, isGetProducts } = useGetCart();
    const [products, setProducts] = useState([]);
    const [firstLoading, setFirstLoading] = useState(true);
    
    useEffect(() => {
        async function getProductsData() {
            const res = await productsInCart();
            setProducts(res);
        };

        if (!isGetProducts) {
            getProductsData();
            setFirstLoading(false);
        }
    }, [cart])

    return (
        <div className="w-full lg:col-span-8 border border-slate-300 dark:border-slate-400 rounded-lg">
            <h1 className="w-full text-lg lg:text-xl text-slate-900 font-bold pb-4 px-6 pt-6 border-b border-b-slate-300 dark:border-b-slate-400">
                سبد خرید شما
            </h1>

            <div className="w-full pt-6">
                {
                    !firstLoading ?
                        [...products].reverse().map((item, index) => (
                            <CartItem key={index} cartData={item} qtyItem={cart.productqty.split(",")[index]} />
                        ))
                        :
                        <div className="w-full flex justify-center pb-6">
                            <Loading customeColor="#0693a4" />
                        </div>
                }
            </div>
        </div>
    )
}


function CartItem({ cartData, qtyItem }) {
    const { incProductToCart, decProductToCart, removeProductCart, isAdding } = useAddToCart();
    
    return (
        <div className="flex flex-col items-start p-6 border-b last:border-0 border-slate-400">
            <Link href={`/products/${cartData.id}`} className="w-full flex items-start gap-4">
                <div className="w-28 lg:w-36">
                    <div className="aspect-w-16 aspect-h-16 rounded-xl overflow-hidden">
                        <img src={cartData?.photos[0]?.path} alt="" className="w-full h-full object-cover object-center" />
                    </div>
                </div>
                <div className="flex flex-col flex-1">
                    <h2 className="text-slate-800 font-medium mb-1">
                        {cartData.title}
                    </h2>
                    <div className="text-sm text-slate-700" dangerouslySetInnerHTML={{ __html: cartData.shortdescription }}>

                    </div>
                    <div className="mt-4">
                        <span className="text-xs text-error">
                            {cartData.discount_price} % تخفیف
                        </span>
                        <div className="text-lg font-bold text-slate-800">
                            {numberWithCommas(cartData.price)}
                            &nbsp;
                            <span className="text-sm font-normal text-slate-500">
                                تومان
                            </span>
                        </div>
                    </div>
                </div>
            </Link>

            <div className="w-full flex justify-end">
                <div className="flex flex-row-reverse items-center border border-primary-04 p-2 rounded-lg gap-5">
                    {
                        qtyItem !== "1" ?
                            <button onClick={() => decProductToCart(cartData.id)} className="text-slate-800 flex justify-center">
                                <FiMinus className="w-5 h-5" />
                            </button>
                            :
                            <button onClick={() => removeProductCart(cartData.id)} className="text-error flex items-center justify-center">
                                <FaRegTrashAlt className="w-4 h-4" />
                            </button>
                    }
                    <div className="font-bold text-slate-700 flex-1">
                        {isAdding ?
                            <ThreeDots
                                visible={true}
                                height="24"
                                width="30"
                                color={'#0693a4'}
                                radius="9"
                                ariaLabel="three-dots-loading"
                                wrapperStyle={{}}
                                wrapperClass=""
                            />
                            : qtyItem
                        }
                    </div>
                    <button disabled={Number(qtyItem) >= Number(cartData?.anbar)} onClick={() => incProductToCart(cartData.id)} className="text-slate-800 flex items-center justify-center disabled:opacity-30">
                        <MdAdd className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}