import http from "./httpService";

export function getAllSettings() {
  return http.get("/api/v1/get-setting").then(({ data }) => data);
}

export function getCategoryChild(categoryId) {
  return http
    .get(`/api/v1/categories-child/${categoryId}`)
    .then(({ data }) => data);
}

export function getCategoryParents(categoryId) {
  return http
    .get(`/api/v1/categories-parents/${categoryId}`)
    .then(({ data }) => data);
}

export function searchApi(data) {
  return http.post(`/api/v1/searchword`, data).then(({ data }) => data);
}

export function getAllRequests() {
  return http.get(`/api/v1/requests/list`).then(({ data }) => data);
}

export function filterRequests(filters) {
  return http.post(`/api/v1/requests/filter`, filters).then(({ data }) => data);
}

export function getTopSearchs() {
  return http.get(`/api/v1/top-search`).then(({ data }) => data);
}

export function sendMsgContactUsApi(data) {
  return http
    .post(`/api/v1/page/contact-us-form`, data)
    .then(({ data }) => data);
}
