import "react-international-phone/style.css";
import LoginComponentByOtp from "./LoginComponentByOtp";
import { useState } from "react";
import LoginComponentByPassword from "./LoginComponentByPassword";

const Login2 = () => {
  const [loginType, setLoginType] = useState("otp");
  return (
    <div className="  w-full h-full  transition-all duration-1000 ease-in-out">
      <div className="w-full mx-auto h-full  flex flex-col justify-between items-center">
        <div className="w-full flex flex-col justify-between items-center gap-4">
          <div className="">
            <img src="/images/logo.webp" alt="" />
          </div>
          <div className="w-full  bg-primary-01 text-white py-2 font-bold flex justify-center items-center rounded-b-3xl">
            ورود کاربران
          </div>

          {loginType === "pass" && <LoginComponentByPassword />}
          {loginType === "otp" && <LoginComponentByOtp />}
        </div>
        <div className="w-full flex justify-between items-center text-slate-600 pt-16">
          <div>
            {loginType === "pass" ? (
              <span
                onClick={() => setLoginType("otp")}
                className=" hover:text-primary-01 font-bold hover:cursor-pointer"
              >
                ورود با کد یک بار مصرف
              </span>
            ) : (
              <span
                onClick={() => setLoginType("pass")}
                className="  hover:text-primary-01 font-bold hover:cursor-pointer"
              >
                ورود با نام کاربری و کلمه عبور
              </span>
            )}
          </div>
          <div>حریم خصوصی</div>
        </div>
      </div>
    </div>
  );
};

export default Login2;
