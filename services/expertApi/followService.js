import Cookies from "js-cookie";
import http from "../httpService";

export function followOrUnfollowApi(follower_id) {
  return http.post(
    "/api/v1/dashboard/follower",
    { follower_id },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    }
  );
}

export function getFollowings(expertiseId) {
  return http.get(`/api/v1/dashboard/following${`/${expertiseId}`}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function getFollowers(expertiseId) {
  return http.get(`/api/v1/dashboard/follower${`/${expertiseId}`}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}
