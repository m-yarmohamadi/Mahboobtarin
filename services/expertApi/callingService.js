import Cookies from "js-cookie";
import http from "../httpService";

export function addNewRequest(data) {
  return http.post("/api/v1/dashboard/requests", data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function uploadPhotosRequest(data) {
  return http.post("/api/v1/dashboard/requests/photos/upload", data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function getRequestsList() {
  return http.get("/api/v1/dashboard/requests/list", {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function getRequestById(id) {
  return http.get(`/api/v1/requests/list/${id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function deleteRequest(id) {
  return http.post(
    "/api/v1/dashboard/requests/destroy",
    { id },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    }
  );
}
