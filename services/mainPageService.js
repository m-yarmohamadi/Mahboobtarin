import http from "./httpService";

export function getAllSettings() {
  return http.get("/api/v1/get-setting").then(({ data }) => data);
}

export function getCategoryChild(categoryId) {
  return http
    .get(`/api/v1/categories-child/${categoryId}`)
    .then(({ data }) => data);
}
