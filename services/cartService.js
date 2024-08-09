import Cookies from "js-cookie";
import http from "./httpService";

export function addToCart(data) {
  return http.post("/api/v1/add-order-new", data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function getCart() {
  return http.get("/api/v1/get-basket", {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function getProductsInCart(productsIDs) {
  return http.post("/api/v1/products", productsIDs, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function getSendMethods() {
  return http.get("/api/v1/sendmethod", {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}
