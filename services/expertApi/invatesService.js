import Cookies from "js-cookie";
import http from "../httpService";

export function getInvatedFriendsApi() {
  return http
    .get("/api/v1/dashboard/invited-friends", {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    })
    .then(({ data }) => data);
}
