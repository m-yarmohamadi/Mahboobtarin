import Cookies from "js-cookie";
import http from "../httpService";

export function addGallery(data) {
  return http.post("/api/v1/dashboard/gallery", data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function deleteGallery(id) {
  return http.post("/api/v1/dashboard/gallery/delete", id, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}
