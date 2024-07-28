import http from "./httpService";

export function getExpertiseUserById(expertiseId) {
  return http.get(`/api/v1/users/expertise/list/${expertiseId}`).then(({ data }) => data);
}
