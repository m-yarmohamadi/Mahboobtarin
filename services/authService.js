import Cookies from "js-cookie";
import http from "./httpService";

export function login(data) {
  return http.post("/api/v1/login", data);
}

export function register(data) {
  return http.post("/api/v1/register", data);
}

export function refreshTokenApi() {
  return http.post(
    "/api/v1/refresh",
    {},
    {
      headers: {
        Authorization: `Bearer ${Cookies.get("accessToken")}`,
      },
    }
  );
}

export function uploadDocumentsApi(data) {
  return http
    .post("/api/v1/upload-user-documents", data)
    .then(({ data }) => data);
}

export function getProfile() {
  return http.get("/api/v1/user", {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function getUserAddress() {
  return http.get("/api/v1/get-all-address", {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function setUserAddress(data) {
  return http.post("/api/v1/add-address-new", data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function removeUserAddress(data) {
  return http.post("/api/v1/remove-address", data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function getMainPage() {
  return http.get("/api/v1/main-page", {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function updateProfile(formData) {
  return http.post("/api/v1/users/update", formData, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function getUserFavorites() {
  return http.get("/api/v1/profile/popular/user-list", {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function forgetPassword(data) {
  return http.post("/api/v1/send-forgotpass-sms", data);
}

export function changePassword(data) {
  return http.post("/api/v1/changepass", data);
}

export function getDashboardSettings() {
  return http.get("/api/v1/dashboard/setting", {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}

export function updateDashboardSettings(data) {
  return http.post("/api/v1/dashboard/setting", data, {
    headers: {
      Authorization: `Bearer ${Cookies.get("accessToken")}`,
    },
  });
}
