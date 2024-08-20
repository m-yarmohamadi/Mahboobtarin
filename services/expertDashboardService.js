import Cookies from "js-cookie";
import http from "./httpService";

// * expert gallery
export function addGallery(data) {
  return http.post("/api/v1/dashboard/gallery", data,{
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function deleteGallery(id) {
  return http.post("/api/v1/dashboard/gallery/delete", id,{
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}



// * expert linkdooni
export function addLinkdins(data) {
  return http.post("/api/v1/dashboard/linkdooni", data,{
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function deleteLinkdins(data) {
  return http.post("/api/v1/dashboard/linkdooni/delete", data,{
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}



// * expert services
export function addNewService(data) {
  return http.post("/api/v1/dashboard/service", data,{
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function deleteService(data) {
  return http.post("/api/v1/dashboard/service/delete", data,{
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
