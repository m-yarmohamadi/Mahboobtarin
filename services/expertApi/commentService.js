import Cookies from "js-cookie";
import http from "../httpService";

export function addCommentExpertise(data) {
  return http.post("/api/v1/dashboard/comments", data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function getCommentExpertise(motekhases_id) {
  return http.get(`/api/v1/dashboard/comments?motekhases_id=${motekhases_id}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function getAllCommentsDashboard() {
  return http.get(`/api/v1/dashboard/comments/allstatus`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function changeStatusComment(data) {
  return http.post(`/api/v1/dashboard/comments/changestatus`, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}
