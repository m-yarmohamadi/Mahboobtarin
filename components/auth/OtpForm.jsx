import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import Loading from "@/tools/Loading";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/services/authService";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import OTPInput from "react-otp-input";
import { enToFaNumber } from "@/utils/enToFa";


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
                    router.replace("/");
                }
            } catch (error) {
                // if (error?.response?.status === 422 && error?.response?.data?.message[0] === "The registration process has not been completed.") {
                //     setStep(error?.response?.data?.user?.type === "motekhases" ? "expert" : "user");
                //     setNationalCodeInitial(error?.response?.data?.user?.national_code);
                //     if (error?.response?.data?.user?.step === "4") {
                //         setRegisterStep(4);
                //     } else {
                //         setRegisterStep(Number(error?.response?.data?.user?.step) + 1);
                //     }
                //     setUserData(error?.response?.data?.user);
                // }

                // if (error?.response?.status === 500) {
                //     toast.error("کد تایید وارد شده نادرست است");
                // }

                if (error?.response?.status === 301) {
                    setStep("register");
                    setOtp
                    return
                }

                if(error?.response?.status === 401){
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
                <div className="w-full h-full gap-3 font-bold text-xl  flex-col fixed top-0 right-0 flex items-center justify-center bg-white/80 z-[60]">
                    در حال ورود به سایت
                    <Loading customeColor="#15aa7f" numOfLoading={1} />
                </div>
            )}
            <form className="space-y-3" onSubmit={checkOtpHandler}>
                <button type="button" onClick={() => setStep("exists")} className="text-sm text-primary-01 font-medium w-full flex justify-center">
                    ویرایش شماره موبایل
                </button>
                <p className=" w-full flex items-center justify-center font-medium text-sm text-gray-700">
                    کد تایید ارسال شده را وارد نمایید
                </p>
                <OTPInput
                    value={otp}
                    onChange={setOtp}
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
                    <p className=" w-full flex items-center justify-center font-medium text-xs text-primary-04">در صورتی که در سایت مراحل ثبت نام را کامل طی کردید، میتوانید با رمز عبور وارد شوید</p>
                    <button type="button" onClick={onLoginPassword} className="btn btn--outline !text-xs">
                        ورود با رمز عبور
                    </button>
                </div>
            }
        </>
    )
}
