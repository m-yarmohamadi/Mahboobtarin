import http from "./httpService";

export function getAllMagazineApi() {
  return http.get("/api/v1/mag").then(({ data }) => data);
}
