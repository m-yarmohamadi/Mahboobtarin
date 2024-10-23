import { useAddToCart, useGetCart } from "@/hooks/useCart";
import toast from "react-hot-toast";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiMinus } from "react-icons/fi";
import { MdAdd } from "react-icons/md";
import { ThreeDots } from "react-loader-spinner";

export default function AddToCart({ productId, inventory }) {
    const { incProductToCart, decProductToCart, removeProductCart, addNewToCart, isAdding } = useAddToCart();
    const { cart, isGetCart, isProductInCart } = useGetCart();
    const productIndex = cart && cart?.products.split(",").indexOf(productId.toString());
    const productQty = cart && cart?.productqty.split(",")[productIndex];
    console.log(productId);
    
    if (isGetCart) return (
        <div className="flex-1 lg:w-full"></div>
    )

    if (Number(inventory) === 0) {
        return (
            <div className="flex-1 lg:w-full btn btn--secondary !text-error whitespace-nowrap">
                ناموجود
            </div>
        )
    }

    return (
        <>
            {
                !isProductInCart(productId) ?
                    <button onClick={() => addNewToCart(productId)} className="flex-1 lg:w-full btn btn--primary whitespace-nowrap">
                        افزودن به سبد خرید
                    </button>
                    :
                    <div className="btn btn--secondary !justify-between flex-1 lg:w-full">
                        <button disabled={Number(productQty) >= Number(inventory)} onClick={() => incProductToCart(productId)} className="disabled:opacity-45">
                            <MdAdd className="w-6 h-6" />
                        </button>
                        <div className="font-bold text-lg px-4">
                            {
                                isAdding ?
                                    <ThreeDots
                                        visible={true}
                                        height="28"
                                        width="40"
                                        color={'#0693a4'}
                                        radius="9"
                                        ariaLabel="three-dots-loading"
                                        wrapperStyle={{}}
                                        wrapperClass=""
                                    />
                                    :
                                    productQty
                            }
                        </div>
                        {
                            Number(productQty) === 1 ?
                                <button onClick={() => removeProductCart(productId)}>
                                    <FaRegTrashAlt className="w-5 h-5 text-error" />
                                </button>
                                :
                                <button onClick={() => decProductToCart(productId)}>
                                    <FiMinus className="w-6 h-6" />
                                </button>
                        }
                    </div>
            }
        </>
    )
}
