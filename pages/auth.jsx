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
    const phoneNumber = mobile.toString().charAt(0) === "0" ? mobile.slice(1) : mobile.toString();

    const isExistsHandler = (e) => {
        e.preventDefault();
        mutateAuthUser({
            mobile: countryCode + phoneNumber,
            type: "user",
            check_user_register: true,
            verifycode: 0
        }, {
            onSuccess: ({ data }) => {
                if (data && data.message[0] === "otp sent") {
                    setAuthStep("login");
                }
            },
            onError: (error) => {
                if (error?.response?.data?.message[0] === "user not found") {
                    setAuthStep("register");
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
                    />
                )

            case "user":
                return (
                    <RegisterUser />
                )
        }
    }

    return renderStep()
}
