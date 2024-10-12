import http from "./httpService";
import Cookies from "js-cookie";

export function addNewAcademy(data) {
  return http.post("/api/v1/dashboard/academy/store", data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function updloadAcademyPhotos(data) {
  return http.post("/api/v1/dashboard/academy/photos/upload", data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function getAcademyCategoryApi() {
  return http.get("/api/v1/dashboard/academy/categories", {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function getAllAcademyApi(qs) {
  return http.get(`/api/v1/dashboard/academy?${qs}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function getAcademyBestPrice() {
  return http.get(`/api/v1/dashboard/academy/best-price`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function getAcademyBestSell() {
  return http.get(`/api/v1/dashboard/academy/best-sell`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}
