import { useCartShop } from "@/context/CartContext";
import { FaRegTrashAlt } from "react-icons/fa";
import { FiMinus } from "react-icons/fi";
import { MdAdd } from "react-icons/md";

export default function AddToCart({ product, inventory }) {
    const { isInCart, addToCart, incrementProductQty, decrementProductQty, removeProduct, getProductById } = useCartShop();
    const { qty } = isInCart(product.id) && getProductById(product.id);

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
                !isInCart(product.id) ?
                    <button onClick={() => addToCart(product)} className="flex-1 lg:w-full btn btn--primary whitespace-nowrap">
                        افزودن به سبد خرید
                    </button>
                    :
                    <div className="btn btn--secondary !justify-between flex-1 lg:w-full">
                        <button disabled={qty >= Number(inventory)} onClick={() => incrementProductQty(product.id)} className="disabled:opacity-45">
                            <MdAdd className="w-6 h-6" />
                        </button>
                        <div className="font-bold text-lg px-4">
                            {qty}
                        </div>
                        {
                            qty === 1 ?
                                <button onClick={() => removeProduct(product.id)}>
                                    <FaRegTrashAlt className="w-5 h-5 text-error" />
                                </button>
                                :
                                <button onClick={() => decrementProductQty(product.id)}>
                                    <FiMinus className="w-6 h-6" />
                                </button>
                        }
                    </div>
            }
        </>
    )
}
