import { changePassword } from "@/services/authService";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";

export default function useChangePassword() {
  const { isPending: isChangingPass, mutate: changePasswordMutate } =
    useMutation({
      mutationFn: changePassword,
      onSuccess: ({ data }) => {
        if (data) {
          toast.success("رمز عبور با موفقیت تغییر کرد");
        }
      },
    });

  return { isChangingPass, changePasswordMutate };
}
