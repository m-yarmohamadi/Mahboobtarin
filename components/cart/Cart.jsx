import CartItems from "./CartItems";
import CartSammary from "./CartSammary";

export default function Cart({ cartItems, setStep }) {
    return (
        <div className="w-full items-start max-w-screen-xl mx-auto grid grid-cols-1 gap-6 lg:grid-cols-12 p-6 lg:p-10">
            <CartItems cartItems={cartItems}/>
            <CartSammary setStep={setStep}/>
        </div>
    )
}
