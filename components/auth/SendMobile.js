import { enToFaNumber } from "@/utils/enToFa";
import React from "react";
import { PhoneInput } from "react-international-phone";
import Loading from "../../tools/Loading";
import "react-international-phone/style.css";

const SendMobile = ({ handleSubmitMobile, loading, value, onChange, countryCode, setCountryCode }) => {
  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmitMobile}
        className="rtl:mr-3  w-full flex flex-col justify-center items-center transition-all duration-1000 ease-in-out"
      >
        <p className=" w-full flex items-center font-medium text-sm text-gray-700">
          لطفا جهت ورود یا ثبت نام در سایت شماره تلفن همراه خود را وارد کنید.
        </p>

        <div className="w-full flex items-center gap-3 mt-9">
          <div className="flex-1 h-12 border border-slate-300 rounded-lg">
			<input 
				value={value}
				onChange={onChange}
				type="number"
				className="w-full h-full appearance-none outline-none border-none bg-transparent text-sm text-slate-800 px-4 text-left"
			/>
		  </div>
          <PhoneInput
            defaultCountry="ir"
            value={countryCode}
            onChange={setCountryCode}
            inputStyle={{
              fontSize: "16px",
              borderStartEndRadius: "0.5rem",
              borderEndEndRadius: "0.5rem",
              display: "none",
            }}
            style={{ height: "3rem", direction: "ltr" }}
          />
        </div>
        <button type="submit" className="btn btn--primary w-full mt-3">
          {loading ? <Loading /> : "تایید"}
        </button>
      </form>
    </div>
  );
};

export default SendMobile;
