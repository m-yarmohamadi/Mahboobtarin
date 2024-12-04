import http from "./httpService";
import Cookies from "js-cookie";

export function getBestSellProducts() {
  return http.get(`/api/v1/best-sell-products`).then(({ data }) => data);
}

export function getProductsBestPrice() {
  return http.get(`/api/v1/dashboard/product/best-price`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function getProductsBestSell() {
  return http.get(`/api/v1/dashboard/product/best-sell`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function getShopPage() {
  return http.get(`/api/v1/shop`).then(({data}) => data);
}

// * expert dashboard *************
export function addNewProduct(data) {
  return http.post("/api/v1/dashboard/product/store", data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function updloadProductPhotos(data) {
  return http.post("/api/v1/dashboard/product/photos/upload", data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function getProductCategoryApi() {
  return http.get("/api/v1/dashboard/product/categories", {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function getAllProductsApi(qs) {
  return http.get(`/api/v1/dashboard/product?${qs}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}
