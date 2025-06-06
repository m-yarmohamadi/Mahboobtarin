import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "@/tools/Loading";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/services/authService";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import OTPInput from "react-otp-input";
import { enToFaNumber } from "@/utils/enToFa";
import toEnglishNumber from "@/utils/toEnglishNumber";


const RESEND_TIME = 120;

export default function OtpForm({ otp, setOtp, isRegister, onLoginPassword, mobile, onResendOtp, setStep, setNationalCodeInitial, setRegisterStep, setUserData }) {
    const [isLoginState, setIsLoginState] = useState(false);
    const [time, setTime] = useState(RESEND_TIME);
    const { mutateAsync, isPending } = useMutation({ mutationFn: register });
    const router = useRouter();


    const checkOtpHandler = async (e) => {
        e.preventDefault();

        if (otp.length === 5) {
            try {
                const { data } = await mutateAsync({
                    mobile,
                    verifycode: otp,
                })

                if (data) {
                    toast.success("با موفقیت وارد شدید");
                    Cookies.set("accessToken", data.token, { expires: 1 / 48 });
                    setIsLoginState(true);
                    if (data?.user?.type === "user") {
                        router.replace("/");
                    } else {
                        router.replace(`/${data?.user?.unique_url_id}`);
                    }
                }
            } catch (error) {
                const { status, data } = error?.response;

                if (status === 500) {
                    toast.error("کد تایید وارد شده نادرست است");
                }

                if (status === 301) {
                    if (data?.user_data) {
                        if (data?.user_data?.type) {
                            setStep(data?.user_data?.type === "motekhases" ? "expert" : "user");
                        } else {
                            setStep("register");
                        }
                        setNationalCodeInitial(data?.user_data?.national_code);
                        setRegisterStep(Number(data?.user_data?.step));
                        setUserData(data?.user_data);
                    } else {

                        if (data?.status === "2") {
                            setStep(data?.user?.type === "motekhases" ? "expert" : "user");
                            setNationalCodeInitial(data?.user?.national_code);
                            setRegisterStep(Number(data?.user?.step));
                            setUserData({ id: data?.user?.id, isStep4: true });
                            toast.success("شما تایید موقت شدید. لطفا مدارک خود را آپلود کنید");
                        } else {
                            setStep("register");
                        }
                    }
                    return
                }

                if (status === 401) {
                    toast.error("کد تایید نادرست است")
                }
            }
        } else {
            toast.error("کد تایید را به صورت کامل وارد کنید");
        }
    }

    useEffect(() => {
        const timer = time > 0 && setInterval(() => setTime((t) => t - 1), 1000);
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [time]);

    return (
        <>
            {isLoginState && (
                <div className="w-full h-full gap-3 font-bold text-xl text-[#fff] flex-col fixed top-0 right-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-[60]">
                    در حال ورود به سایت
                    <Loading />
                </div>
            )}
            <form className="space-y-3" onSubmit={checkOtpHandler}>
                <button type="button" onClick={() => setStep("exists")} className="text-sm text-primary-01 font-medium w-full flex justify-center">
                    ویرایش شماره موبایل
                </button>
                <p className=" w-full flex items-center justify-center font-medium text-sm text-slate-700">
                    کد تایید ارسال شده را وارد نمایید
                </p>
                <OTPInput
                    value={otp}
                    onChange={(e) => setOtp(toEnglishNumber(e))}
                    numInputs={5}
                    shouldAutoFocus
                    containerStyle="flex flex-row-reverse items-center justify-center gap-3"
                    renderInput={(props) => (
                        <input
                            type='number'
                            {...props}
                        />
                    )}
                    inputStyle="!w-full !max-w-12 !h-12 bg-white border border-slate-300 !rounded-lg text-xl text-slate-800 outline-none focus:!border-primary-01"
                />
                <div className="py-2">
                    {time > 0 ? (
                        <p className="text-xs text-center font-medium text-slate-700">
                            <span className='text-error'>{enToFaNumber(time)}</span> ثانیه تا ارسال کد جدید
                        </p>
                    ) :
                        <button
                            onClick={(e) => {
                                onResendOtp(e);
                                setTime(RESEND_TIME);
                            }}
                            className='flex items-center justify-center text-primary-01 text-sm w-full'
                            type="button"
                        >
                            ارسال مجدد کد تأیید
                        </button>}
                </div>
                <button type="submit" className="btn btn--primary w-full">
                    {isPending ? <Loading /> : 'تایید'}
                </button>
            </form>
            {isRegister &&
                <div className="flex flex-col items-center justify-center gap-2 mt-5">
                    <p className=" w-full flex items-center justify-center font-medium text-xs text-primary-04">در صورتی که در سایت مراحل ثبت‌نام را کامل طی کردید، میتوانید با رمز عبور وارد شوید</p>
                    <button type="button" onClick={onLoginPassword} className="btn btn--outline !text-xs">
                        ورود با رمز عبور
                    </button>
                </div>
            }
        </>
    )
}
