import Cookies from "js-cookie";
import http from "../httpService";

export function getAllNotifsApi() {
  return http
    .get(`/api/v1/dashboard/notifications`, {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    })
    .then(({ data }) => data);
}
