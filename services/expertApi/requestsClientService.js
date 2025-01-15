import Cookies from "js-cookie";
import http from "../httpService";

export function getRequestsClientApi() {
  return http
    .get("/api/v1/dashboard/order/service/list", {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    })
    .then(({ data }) => data);
}

export function changeStatusRequestsClientApi(data) {
  return http
    .post("/api/v1/dashboard/order/service/change-satatus", data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    })
    .then(({ data }) => data);
}

export function getRequestsOrdersApi() {
  return http
    .get("/api/v1/dashboard/order/service/list/users", {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    })
    .then(({ data }) => data);
}

export function getShopOrdersApi() {
  return http
    .get("/api/v1/dashboard/product/order/list", {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    })
    .then(({ data }) => data);
}
