import { forgetPassword } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useForgetPassword() {
  const { isPending: isForgetPassLoadingt, mutate: forgetPasswordMutate } =
    useMutation({
      mutationFn: forgetPassword,
      onSuccess: ({ data }) => {
        if (data) {
          toast.success(
            "کد تایید برای تغییر رمز عبور به شماره موبایل ارسال شد"
          );
        }
      },
      onError: (error) => {
        if (error) {
          toast.error("کد تایید ارسال نشد!");
        }
      },
    });

  return { isForgetPassLoadingt, forgetPasswordMutate };
}
