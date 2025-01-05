import Cookies from "js-cookie";
import http from "../httpService";

export function addLinkdins(data) {
  return http.post("/api/v1/dashboard/linkdooni", data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function deleteLinkdins(data) {
  return http.post("/api/v1/dashboard/linkdooni/delete", data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}
