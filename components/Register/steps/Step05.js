import * as Yup from "yup";
import { useFormik } from "formik";
import NextPrev from "../NextPrev";
import CheckBox from "@/tools/CheckBox";
import axios from "axios";
import { useState } from "react";
import Input from "@/tools/Input";
import OTPInput from "react-otp-input";

const Step05 = ({ formik, children, error }) => {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full h-full flex flex-col justify-between "
      >
        <div className="w-full h-full flex flex-col justify-between mb-12">
          <div className=" w-full flex flex-col justify-center items-center gap-2  ">
            <p className=" w-full flex items-center justify-center font-medium text-sm text-slate-700 mb-4">
              لطفا کد ارسال شده به تلفن همراه خود را در اینجا درج کنید
            </p>
            <OTPInput
              value={formik.values.verifycode}
              onChange={(e) => formik.setFieldValue("verifycode", e)}
              numInputs={5}
              shouldAutoFocus
              containerStyle="flex flex-row-reverse items-center justify-center gap-3"
              renderInput={(props) => <input type="number" {...props} />}
              inputStyle="!w-full !max-w-12 !h-12 bg-white border border-slate-300 !rounded-lg text-xl text-slate-800 outline-none focus:!border-primary-01"
            />
          </div>
        </div>
        <div>{children}</div>
      </form>
      {error &&
        error.map((item, index) => {
          return <div key={index}>{item}</div>;
        })}
    </div>
  );
};

export default Step05;
