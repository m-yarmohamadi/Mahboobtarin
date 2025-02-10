import http from "./httpService";

export function getAllProvinces() {
  return http
    .get(`/api/v1/ostan`)
    .then(({ data }) => data);
}

export function getCity(provinceId) {
  return http
    .get(`/api/v1/shahr${provinceId ? `/${provinceId}` : ""}`)
    .then(({ data }) => data);
}
