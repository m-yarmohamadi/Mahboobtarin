import { register } from "@/services/authService";
import Input from "@/tools/Input";
import Loading from "@/tools/Loading";
import { useMutation } from "@tanstack/react-query";
import { useFormik } from "formik";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";
import * as Yup from "yup";

export default function PasswordForm({ onLoginOtp, mobile, setStep, setNationalCodeInitial, setRegisterStep, setUserData }) {
    const [isLoginState, setIsLoginState] = useState(false);
    const { isPending: isEntering, mutateAsync: mutateLoginPassword } = useMutation({ mutationFn: register, });
    const router = useRouter();

    const checkPasswordHandler = async (values) => {
        try {
            const { data } = await mutateLoginPassword({
                mobile,
                password: values.password,
                logintype: "password",
                verifycode: 0
            })

            if (data?.message && data?.message[0] === "Unauthorized") {
                formik.setFieldError("password", "رمز عبور وارد شده اشتباه است");
                return
            }

            if (data.status === 200) {
                toast.success("با موفقیت وارد شدید");
                setIsLoginState(true);
                Cookies.set("accessToken", data.access_token, { expires: 1});

                if (data?.user?.type === "user") {
                    router.replace(`/`);
                } else {
                    router.replace(`/${data?.user?.unique_url_id}`);
                }
            }
        } catch (error) {
            const { status, data } = error?.response;

            if (status === 301) {
                if (data?.status === "2") {
                    setStep(data?.user?.type === "motekhases" ? "expert" : "user");
                    setNationalCodeInitial(data?.user?.national_code);
                    setRegisterStep(Number(data?.user?.step));
                    setUserData({ id: data?.user?.id, isStep4: true });
                    toast.success("شما تایید موقت شدید. لطفا مدارک خود را آپلود کنید");
                }
            }

            formik.setFieldError("password", "خطایی رخ داده است");
        }
    }

    const formik = useFormik({
        initialValues: { password: "" },
        onSubmit: checkPasswordHandler,
        validationSchema: Yup.object({
            password: Yup.string().required("رمز عبور را وارد کنید")
        })
    })

    return (
        <>
            {isLoginState && (
                <div className="w-full h-full gap-3 font-bold text-xl text-[#fff] flex-col fixed top-0 right-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-[60]">
                    در حال ورود به سایت
                    <Loading />
                </div>
            )}
            <form className="w-full space-y-3" onSubmit={formik.handleSubmit}>
                <Input
                    name={'password'}
                    label={'کلمه عبور'}
                    formik={formik}
                    type={'password'}
                />
                <button
                    type='submit'
                    className='btn btn--primary w-full'>
                    {isEntering ? <Loading /> : 'ورود'}
                </button>
            </form>
            <button type="button" onClick={onLoginOtp} className="btn btn--outline !text-xs">
                ورود با رمز یکبار مصرف
            </button>
        </>
    )
}
