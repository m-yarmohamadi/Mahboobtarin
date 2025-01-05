import Cookies from "js-cookie";
import http from "../httpService";

export function addRequestService(data) {
  return http.post(`/api/v1/dashboard/request-services`, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function getRequestService() {
  return http.get(`/api/v1/dashboard/request-services/list`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}
