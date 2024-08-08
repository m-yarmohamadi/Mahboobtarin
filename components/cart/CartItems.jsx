import { useState } from "react"
import { FaRegTrashAlt, FaRegWindowMinimize } from "react-icons/fa"
import { MdAdd, MdMinimize, MdOutlineMinimize } from "react-icons/md";
import { FiMinus } from "react-icons/fi";

export default function CartItems({ cart }) {
    return (
        <div className="w-full lg:col-span-8 border border-gray-300 rounded-lg">
            <h1 className="w-full text-lg lg:text-xl text-gray-900 font-bold pb-4 px-6 pt-6 border-b border-b-gray-300">
                سبد خرید شما
            </h1>

            <div className="w-full pt-6">
                {cart.map((item, index) => (
                    <CartItem key={index} cartData={item} />
                ))}
            </div>
        </div>
    )
}


function CartItem({ cartData }) {
    const [number, setNumber] = useState(1);

    return (
        <div className="flex flex-col items-start p-6 border-b last:border-0 border-gray-400">
            <div className="w-full flex items-start gap-4">
                <div className="aspect-square w-28 lg:w-36 rounded-xl overflow-hidden">
                    <img src={cartData.image} alt="" className="w-full h-full object-cover" />
                </div>
                <div className="flex flex-col">
                    <h2 className="text-gray-800 font-medium mb-1">
                        {cartData.title}
                    </h2>
                    <p className="text-sm text-gray-700">
                        {cartData.description}
                    </p>
                    <div className="mt-4">
                        <span className="text-xs text-error">
                            {cartData.offPrice} تومان تخفیف
                        </span>
                        <div className="text-lg font-bold text-gray-800">
                            {cartData.price}
                            <span className="text-sm font-normal text-gray-500">
                                تومان
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            <div className="w-full flex justify-end">
                <div className="flex flex-row-reverse items-center border border-primary-04 p-2 rounded-lg gap-5">
                    {
                        number !== 1 ?
                            <button onClick={() => setNumber((perv) => perv - 1)} className="text-gray-800 flex justify-center">
                                <FiMinus className="w-5 h-5" />
                            </button>
                            :
                            <button className="text-error flex items-center justify-center">
                                <FaRegTrashAlt className="w-4 h-4" />
                            </button>
                    }
                    <div className="font-bold text-gray-700 flex-1">
                        {number}
                    </div>
                    <button onClick={() => setNumber((perv) => perv + 1)} className="text-gray-800 flex items-center justify-center">
                        <MdAdd className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </div>
    )
}