import useLogin from "@/hooks/useLogin";
import Input from "@/tools/Input";
import Loading from "@/tools/Loading";
import { useFormik } from "formik";
import { useState } from "react";
import * as Yup from "yup";

export default function PasswordForm({ onLoginOtp, mobile }) {
    const [isLoginState, setIsLoginState] = useState(false);
    const { isEntering, loginPasswordHandler } = useLogin();

    const checkPasswordHandler = async (values) => {
        const { isLogin } = await loginPasswordHandler({ mobile, password: values.password });
        setIsLoginState(isLogin);
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
                <div className="w-full h-full gap-3 font-bold text-xl  flex-col fixed top-0 right-0 flex items-center justify-center bg-white/80 z-[60]">
                    در حال ورود به سایت
                    <Loading customeColor="#15aa7f"/>
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
