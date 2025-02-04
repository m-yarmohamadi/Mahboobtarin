import Cookies from "js-cookie";
import { refreshTokenApi } from "./authService";

export const refreshAuthToken = async () => {
  try {
    const { data } = await refreshTokenApi();
    if (data.token) {
      Cookies.set("accessToken", data.token, { expires: 1 / 48 });
    }
  } catch (error) {
    return null;
  }
};
