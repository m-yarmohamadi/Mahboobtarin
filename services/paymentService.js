import http from "./httpService";
import Cookies from "js-cookie";

export function getShippingSettings() {
  return http.get(`/api/v1/setting/shipping`).then(({ data }) => data);
}

export function verifyShopApi(data) {
  return http.post(`/api/v1/verify`, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function verifyServiceApi(data) {
  return http.post(`/api/v1/verify-service`, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}
