import Cookies from "js-cookie";
import http from "../httpService";

export function addNewService(data) {
  return http.post("/api/v1/dashboard/service", data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function deleteService(data) {
  return http.post("/api/v1/dashboard/service/delete", data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function getAllServices() {
  return http.get(`/api/v1/dashboard/service`);
}

export function getServiceById(serviceId) {
  return http.get(`/api/v1/dashboard/service/${serviceId}`);
}

export function getServiceProfile(expertId, serviceId) {
  return http.get(
    `/api/v1/dashboard/service/motekhases/${expertId}${
      serviceId ? `/${serviceId}` : ""
    }`
  );
}

export function getServiceItems() {
  return http.get(`/api/v1/dashboard/admin/service`);
}

export function addOrderService(data) {
  return http.post("/api/v1/dashboard/order/service", data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}
