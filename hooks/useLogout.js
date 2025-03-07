import { logoutApi } from "@/services/authService";
import Cookies from "js-cookie";
import toast from "react-hot-toast";

export default function useLogout() {
  const logout = async () => {
    try {
      const { data } = await logoutApi();
      if (data) {
        window.location.href = "/";
        Cookies.remove("accessToken");
      }
    } catch (error) {
      toast.error("مجدد تلاش کنید!");
    }
  };

  return logout;
}
