import { login } from "@/services/authService";
import { enToFaMessages } from "@/utils/enToFaMessages";
import { useMutation } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function useLogin() {
  const router = useRouter();

  const { isPending: isLoginOtp, mutateAsync: mutateLoginOtp } = useMutation({
    mutationFn: login,
  });

  const { isPending: isLoginPassword, mutateAsync: mutateLoginPassword } =
    useMutation({
      mutationFn: login,
    });

  const loginOtpHandler = async ({ mobile, otp }) => {
    try {
      const { data } = await mutateLoginOtp({
        username: mobile,
        type: "otp",
        otp,
      });

      const { status, access_token, user } = data || {};

      if (status === 200) {
        toast.success("با موفقیت وارد شدید");
        Cookies.set("accessToken", access_token, { expires: 1 / 48 });
        router.replace(`/profile/${user?.id}`);
        return { isLogin: true };
      }
    } catch (error) {
      toast.error(enToFaMessages(error?.response?.data?.message[0]));
      return { isLogin: false };
    }
  };

  const loginPasswordHandler = async ({ mobile, password }) => {
    try {
      const { data } = await mutateLoginPassword({
        username: mobile,
        type: "pass",
        otp: "0",
        password,
      });

      const { status, access_token, message, user } = data || {};

      if (status === 422) {
        toast.error(enToFaMessages(message[0]));
      }

      if (status === 200) {
        toast.success("با موفقیت وارد شدید");
        Cookies.set("accessToken", access_token, { expires: 1 / 48 });
        router.replace(`/profile/${user?.id}`);
        return { isLogin: true };
      }
    } catch (error) {
      toast.error(enToFaMessages(error?.response?.data?.message[0]));
      return { isLogin: false };
    }
  };

  return {
    isEntering: isLoginOtp || isLoginPassword,
    loginOtpHandler,
    loginPasswordHandler,
  };
}
