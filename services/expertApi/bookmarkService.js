import Cookies from "js-cookie";
import http from "../httpService";

export function bookmarkApi(motekhases_id) {
  return http.post(
    "/api/v1/dashboard/checkmark",
    { motekhases_id },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    }
  );
}

export function getBookmarksApi() {
  return http.get(`/api/v1/dashboard/marks`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}
