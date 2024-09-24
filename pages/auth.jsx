import LoginForm from "@/components/auth/LoginForm";
import MobileForm from "@/components/auth/MobileForm";
import RegisterExpert from "@/components/Register/RegisterExpert";
import RegisterType from "@/components/Register/RegisterType";
import RegisterUser from "@/components/Register/RegisterUser";
import { register } from "@/services/authService";
import { enToFaMessages } from "@/utils/enToFaMessages";
import { useMutation } from "@tanstack/react-query";
import { useState } from "react";
import toast from "react-hot-toast";

export default function AuthPage() {
    const [mobile, setMobile] = useState("");
    const [countryCode, setCountryCode] = useState("");
    const [authStep, setAuthStep] = useState("exists");
    const { isPending, mutate: mutateAuthUser } = useMutation({ mutationFn: register });
    const [nationalCodeInitial, setNationalCodeInitial] = useState();
    const [registerStep, setRegisterStep] = useState(1);
    const [userData, setUserData] = useState({});
    const [isRegister, setIsRegisert] = useState();
    const [otp, setOtp] = useState("");
    const phoneNumber = mobile.toString().charAt(0) === "0" ? mobile.slice(1) : mobile.toString();

    const isExistsHandler = (e) => {
        e.preventDefault();
        mutateAuthUser({
            mobile: countryCode + phoneNumber,
            verifycode: 0
        }, {
            onSuccess: ({ data }) => {
                if (data) {
                    setAuthStep("login");
                    setIsRegisert(true);
                }
            },
            onError: (error) => {
                if (error?.response?.status=== 301) {
                    setAuthStep("login");
                    setIsRegisert(false);
                } else {
                    toast.error(enToFaMessages(error?.response?.data?.message[0]));
                }
            }
        })
    }

    const renderStep = () => {
        switch (authStep) {
            case "exists":
                return (
                    <MobileForm
                        mobile={mobile}
                        setMobile={setMobile}
                        onSubmit={isExistsHandler}
                        isLoading={isPending}
                        countryCode={countryCode}
                        setCountryCode={setCountryCode}
                    />
                )

            case "login":
                return (
                    <LoginForm
                        mobile={countryCode + phoneNumber}
                        onResendOtp={isExistsHandler}
                        setStep={setAuthStep}
                        setNationalCodeInitial={setNationalCodeInitial}
                        setRegisterStep={setRegisterStep}
                        setUserData={setUserData}
                        isRegister={isRegister}
                        otp={otp}
                        setOtp={setOtp}
                    />
                )

            case "register":
                return (
                    <RegisterType
                        setUserType={setAuthStep}
                    />
                )

            case "expert":
                return (
                    <RegisterExpert
                        mobile={countryCode + phoneNumber}
                        nationalCodeInitial={nationalCodeInitial}
                        userStep={registerStep}
                        userData={userData}
                        otp={otp}
                    />
                )

            case "user":
                return (
                    <RegisterUser 
                        mobile={countryCode + phoneNumber}
                        otp={otp}
                    />
                )
        }
    }

    return renderStep()
}
