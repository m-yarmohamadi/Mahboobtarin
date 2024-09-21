import http from "./httpService";

export function getExpertiseUsers() {
  return http.get(`/api/v1/users/expertise/list`).then(({ data }) => data);
}

export function getExpertiseUserById(expertiseId, userId) {
  return http
    .get(
      `/api/v1/users/expertise/list/${expertiseId}${userId ? `/${userId}` : ""}`
    )
    .then(({ data }) => data);
}

export function getExpertisesList() {
  return http.get(`/api/v1/expertises`).then(({ data }) => data);
}
