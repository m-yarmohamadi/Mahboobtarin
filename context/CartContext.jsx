import { createContext, useContext, useEffect, useState } from "react";

const CartShopContext = createContext();

export default function CartShopProvider({ children }) {
    const [cartList, setCartList] = useState([]);

    const isInCart = (productId) => {
        return cartList.length && cartList.some((p) => Number(p.product.id) === Number(productId));
    }

    const addToCart = (product) => {
        if (!isInCart(product.id)) {
            const productData = {
                id: product.id,
                title: product.title,
                photos: product.photos,
                price: Number(product.price),
                discount_price: Number(product.discount_price),
                anbar: Number(product.anbar),
                slug: product.slug,
            }
            setCartList((prevList) => [...prevList, { product: productData, qty: 1 }]);
        }
    }

    const getProductById = (productId) => {
        return cartList.length && cartList.filter((p) => Number(p.product.id) === Number(productId))[0];
    }

    const removeProduct = (productId) => {
        if (isInCart(productId)) {
            setCartList((prevList) =>
                prevList.filter((p) => p.product.id !== productId)
            );
        }
        if (cartList.length === 1) {
            setCartList([]);
            localStorage.removeItem("mahbobtarinCart");
        }
    };

    const incrementProductQty = (productId) => {
        if (productId) {
            setCartList((prevList) =>
                prevList.map((p) =>
                    p.product.id === productId
                        ? { ...p, qty: p.qty + 1 }
                        : p
                )
            );
        }
    }

    const decrementProductQty = (productId) => {
        if (isInCart(productId)) {
            setCartList((prevList) =>
                prevList.map((p) =>
                    p.product.id === productId
                        ? { ...p, qty: Math.max(p.qty - 1, 1) }
                        : p
                )
            );
        }
    };

    const resetCart = () => {
        setCartList([]);
        localStorage.removeItem("mahbobtarinCart");
    };


    // cart sammary
    const getCartTotal = () => {
        const res = cartList.reduce((total, item) => total + (Number(item.product.price) * Number(item.qty)), 0);
        return res.toFixed(0)
    };

    const getCartDiscountTotal = () => {
        // const discounts = cartList.reduce((total, item) => total + (item.product.discount_price), 0);
        const res = cartList.reduce((total, item) => total + ((Number(item.product.price) * Number(item.product.discount_price) / 100) * Number(item.qty)), 0);
        return res.toFixed(0)
    };

    const getTotalAmountDue = () => {
        const res = getCartTotal() - getCartDiscountTotal();
        return res.toFixed(0)
    }

    useEffect(() => {
        if (cartList.length) {
            localStorage.setItem("mahbobtarinCart", JSON.stringify(cartList));
        }
    }, [cartList]);

    useEffect(() => {
        const cartData = localStorage.getItem("mahbobtarinCart") || null;
        setCartList(cartData ? JSON.parse(cartData) : []);
    }, []);

    return (
        <CartShopContext.Provider
            value={{
                cartList,
                addToCart,
                incrementProductQty,
                isInCart,
                decrementProductQty,
                removeProduct,
                resetCart,
                getProductById,
                getCartTotal,
                getTotalAmountDue,
                getCartDiscountTotal
            }}
        >
            {children}
        </CartShopContext.Provider>
    )
}

export function useCartShop() {
    const context = useContext(CartShopContext);

    if (context === undefined) throw new Error("CartShop context was used outside of CartShopContext");

    return context
}