import Cookies from "js-cookie";
import http from "./httpService";

// * -------------- expert dashboard info --------------
export function getDashboardInfo(data) {
  return http.get("/api/v1/dashboard/info", {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

// * -------------- expert gallery --------------
export function addGallery(data) {
  return http.post("/api/v1/dashboard/gallery", data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function deleteGallery(id) {
  return http.post("/api/v1/dashboard/gallery/delete", id, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

// * -------------- expert linkdooni --------------
export function addLinkdins(data) {
  return http.post("/api/v1/dashboard/linkdooni", data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function deleteLinkdins(data) {
  return http.post("/api/v1/dashboard/linkdooni/delete", data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

// * -------------- expert services --------------
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
    `/api/v1/dashboard/service/motekhases/${expertId}/${serviceId || ""}`
  );
}

export function getServiceItems() {
  return http.get(`/api/v1/dashboard/admin/service`);
}

// * -------------- expert favorites --------------
export function getPopularFavorites() {
  return http.get("/api/v1/dashboard/popular/list", {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function addNewFavorite(data) {
  return http.post("/api/v1/dashboard/popular", data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function deleteFavorite(data) {
  return http.post("/api/v1/dashboard/popular/destroy", data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

// * -------------- expert follow --------------
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

// * -------------- expert like --------------
export function likeOrDislikeApi(motekhases_id) {
  return http.post(
    "/api/v1/dashboard/favorit",
    { motekhases_id },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    }
  );
}

// * -------------- expert comment --------------
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

// * -------------- expert requersts (calling page) --------------
export function addNewRequest(data) {
  return http.post("/api/v1/dashboard/requests", data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function uploadPhotosRequest(data) {
  return http.post("/api/v1/dashboard/requests/photos/upload", data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function getRequestsList() {
  return http.get("/api/v1/dashboard/requests/list", {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function deleteRequest(id) {
  return http.post(
    "/api/v1/dashboard/requests/destroy",
    { id },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    }
  );
}

// * -------------- expert support --------------
export function addTicket(data) {
  return http.post("/api/v1/dashboard/support/store", data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function getTicket(ticketId) {
  return http.get(`/api/v1/dashboard/support/${ticketId || ""}`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

// * -------------- expert plans --------------

export function getPlans() {
  return http.get(`/api/v1/dashboard/plans`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

// * -------------- expert requests service --------------
export function addRequestService(data) {
  return http.post(`/api/v1/dashboard/request-services`, data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function getRequestService() {
  return http.get(`/api/v1/dashboard/request-services/list`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

// * -------------- expert bookmark --------------
export function bookmarkApi(motekhases_id) {
  return http.post(
    "/api/v1/dashboard/checkmark",
    { motekhases_id },
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    }
  );
}

export function getBookmarksApi() {
  return http.get(`/api/v1/dashboard/marks`, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}
