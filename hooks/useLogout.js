import Cookies from "js-cookie";

export default function useLogout() {
  const logout = () => {
    Cookies.remove("accessToken");
    window.location.href = "/";
  };

  return logout
}
