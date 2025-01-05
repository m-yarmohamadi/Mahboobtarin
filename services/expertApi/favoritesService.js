import Cookies from "js-cookie";
import http from "../httpService";

export function getPopularFavorites() {
    return http.get("/api/v1/dashboard/popular/list", {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    });
  }
  
  export function addNewFavorite(data) {
    return http.post("/api/v1/dashboard/popular", data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    });
  }
  
  export function deleteFavorite(data) {
    return http.post("/api/v1/dashboard/popular/destroy", data, {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    });
  }
  