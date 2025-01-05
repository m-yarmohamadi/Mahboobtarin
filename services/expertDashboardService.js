import Cookies from "js-cookie";
import http from "./httpService";

// * -------------- expert dashboard info --------------
export function getDashboardInfo(data) {
  return http.get("/api/v1/dashboard/info", {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}


// * -------------- expert like --------------
export function likeOrDislikeApi(motekhases_id) {
  return http.post(
    "/api/v1/dashboard/favorit",
    { motekhases_id },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    }
  );
}

// * -------------- expert plans --------------

export function getPlans() {
  return http.get(`/api/v1/dashboard/plans`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}
