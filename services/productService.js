import http from "./httpService";

export function getBestSellProducts() {
  return http.get(`/api/v1/best-sell-products`).then(({ data }) => data);
}
