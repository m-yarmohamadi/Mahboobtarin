import Cookies from "js-cookie";
import http from "../httpService";

export function addTicket(data) {
  return http.post("/api/v1/dashboard/support/store", data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function getTicket(ticketId) {
  return http.get(
    `/api/v1/dashboard/support${ticketId ? `/${ticketId}` : ""}`,
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    }
  );
}
