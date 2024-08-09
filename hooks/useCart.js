import {
  addToCart,
  getCart,
  getProductsInCart,
  getSendMethods,
} from "@/services/cartService";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useGetAddress } from "./useProfile";

export function useGetCart() {
  const { data, isLoading: isGetCart } = useQuery({
    queryKey: ["get-cart"],
    queryFn: getCart,
    retry: false,
    refetchOnWindowFocus: true,
  });
  const { data: cart } = data || {};

  const { mutateAsync: mutateGetProducts, isPending: isGetProducts } =
    useMutation({
      mutationFn: getProductsInCart,
    });

  const productsIds =
    cart && cart.products.split(cart.products.length > 2 ? "," : "");

  const isProductInCart = (productId) => {
    if (cart && productId) {
      return productsIds.some((item) => item === productId.toString());
    } else {
      return false;
    }
  };

  const productsInCart = async () => {
    if (cart) {
      try {
        const { data } = await mutateGetProducts({
          products: [...productsIds],
        });
        return data;
      } catch (error) {
        return [];
      }
    }
  };

  return { cart, isGetCart, isProductInCart, productsInCart, isGetProducts };
}

export function useAddToCart() {
  const { cart } = useGetCart();
  const queryClient = useQueryClient();

  const { isPending: isAdding, mutate: mutateCart } = useMutation({
    mutationFn: addToCart,
  });

  // ! convert product ids and product quantity to array
  const productsIds =
    cart && cart.products.split(cart.products.length > 2 ? "," : "");
  const productsQty =
    cart && cart.productqty.split(cart.productqty.length > 2 ? "," : "");

  const mutateHandler = (products) => {
    mutateCart(
      {
        orderid: cart?.order_id,
        products: [...products],
        paymentmethod: cart.paymentmethod,
        coupondiscount: "",
        addressid: cart.address_id,
        send_method: cart?.sendmethod || "adi",
      },
      {
        onSuccess: ({ data }) => {
          if (data) {
            queryClient.invalidateQueries({ queryKey: ["get-cart"] });
          }
        },
        onError: (error) => {
          if (error?.response?.status === 401) {
            window.location.reload();
          }
        },
      }
    );
  };

  // * add new product to cart
  const { addressList } = useGetAddress();
  const addNewToCart = (productId) => {
    let products = [];

    if (cart) {
      products = [
        ...productsIds.map((item, index) => ({
          id: item,
          qty: productsQty[index],
        })),
        { id: productId, qty: "1" },
      ];
    } else {
      products = [{ id: productId, qty: 1 }];
    }

    mutateCart(
      {
        orderid: cart && cart.order_id,
        products: [...products],
        paymentmethod: cart.paymentmethod || "online",
        coupondiscount: "",
        addressid: cart.address_id || addressList[0].id,
        send_method: cart?.sendmethod || "adi",
      },
      {
        onSuccess: ({ data }) => {
          if (data) {
            queryClient.invalidateQueries({ queryKey: ["get-cart"] });
            toast.success("به سبد خرید اضافه شد");
          }
        },
        onError: (error) => {
          if (error?.response?.status === 401) {
            window.location.reload();
          }
        },
      }
    );
  };

  //  * increment product in cart
  const incProductToCart = (productId) => {
    if (cart) {
      const lastProducts = productsIds.map((item, index) =>
        item === productId.toString()
          ? { id: item, qty: Number(productsQty[index]) + 1 }
          : { id: item, qty: Number(productsQty[index]) }
      );

      mutateHandler(lastProducts);
    }
  };

  //  * decrement product in cart
  const decProductToCart = (productId) => {
    if (cart) {
      const lastProducts = productsIds.map((item, index) =>
        item === productId.toString()
          ? { id: item, qty: Number(productsQty[index]) - 1 }
          : { id: item, qty: Number(productsQty[index]) }
      );

      mutateHandler(lastProducts);
    }
  };

  //  * delete product from cart
  const removeProductCart = (productId) => {
    if (cart) {
      const lastProducts = productsIds.map((item, index) => ({
        id: item,
        qty: Number(productsQty[index]),
      }));

      mutateHandler(lastProducts.filter((p) => p.id !== productId.toString()));
    }
  };

  //  * change address for send order
  const changeAddressOrder = (addressId) => {
    if (cart) {
      const lastProducts = productsIds.map((item, index) => ({
        id: item,
        qty: Number(productsQty[index]),
      }));

      mutateCart(
        {
          orderid: cart && cart.order_id,
          products: [...lastProducts],
          paymentmethod: cart.paymentmethod,
          coupondiscount: "",
          addressid: addressId,
          send_method: cart?.sendmethod || "adi",
        },
        {
          onSuccess: ({ data }) => {
            if (data) {
              queryClient.invalidateQueries({ queryKey: ["get-cart"] });
            }
          },
          onError: (error) => {
            if (error?.response?.status === 401) {
              window.location.reload();
            }
          },
        }
      );
    }
  };

  //  * change method send
  const changeSendMethodOrder = (method) => {
    if (cart) {
      const lastProducts = productsIds.map((item, index) => ({
        id: item,
        qty: Number(productsQty[index]),
      }));

      mutateCart(
        {
          orderid: cart && cart.order_id,
          products: [...lastProducts],
          paymentmethod: cart.paymentmethod,
          coupondiscount: "",
          addressid: cart.address_id || addressList[0].id,
          send_method: method,
        },
        {
          onSuccess: ({ data }) => {
            if (data) {
              queryClient.invalidateQueries({ queryKey: ["get-cart"] });
            }
          },
          onError: (error) => {
            if (error?.response?.status === 401) {
              window.location.reload();
            }
          },
        }
      );
    }
  };

  return {
    isAdding,
    addNewToCart,
    incProductToCart,
    decProductToCart,
    removeProductCart,
    changeAddressOrder,
    changeSendMethodOrder,
  };
}

export function useGetSendMethods() {
  const { data, isLoading: isGetMethods } = useQuery({
    queryKey: ["get-send-methods"],
    queryFn: getSendMethods,
    retry: false,
    refetchOnWindowFocus: true,
  });

  const convertToPersianLabel = (key) => {
    switch (key) {
      case "motor":
        return "موتور";
      case "adi":
        return "عادی";
      case "pishtaz":
        return "پیشتاز";
      case "express":
        return "اکسپرس";

      default:
        break;
    }
  };

  const { data: list } = data?.data || {};

  const sendMethods =
    list &&
    Object.keys(list).map((key) => ({
      title: convertToPersianLabel(key),
      englishTitle: key,
      price: list[key],
    }));

  const getPrice = (methodName) => {
    const priceValue = !isGetMethods && sendMethods?.filter((m) => m.englishTitle === methodName)[0]?.price;
    return priceValue
  };

  return { sendMethods, isGetMethods, getPrice };
}
