import * as Yup from "yup";
import { useFormik } from "formik";
import NextPrev from "../NextPrev";
import CheckBox from "@/tools/CheckBox";
import axios from "axios";
import { useState } from "react";
import Input from "@/tools/Input";
import OTPInput from "react-otp-input";
import Link from "next/link";
import DocsExpertUploader from "./DocsExpertUploader";

const Step04 = ({ children, formik, error, userId }) => {
  return (
    <div className="w-full h-full flex flex-col justify-between">
      <form
        onSubmit={formik.handleSubmit}
        className="w-full h-full flex flex-col justify-between "
      >
        <DocsExpertUploader formikStep3={formik} userId={userId} />
        <div className="w-full h-full flex flex-col justify-between pt-6">
          <div className="w-full">
            {/* <p className="w-full flex flex-col justify-center items-center text-lg  font-bold py-3 text-justify overflow-y-auto  h-36 mb-4  text-slate-600 leading-7 pl-5">
							<div className="p-4">
								{' '}
								قوانین و مقررات وب سایت را از این لینک مشاهده فرمایید.
							</div>
							<Link href={'/rules'} target='_blank' className=" bg-primary-01 p-2 rounded-md text-primary-02">
								قوانین و مقررات
							</Link>
						</p> */}
            <div className="w-auto">
              <div className="w-full flex py-2 px-4 bg-primary-02 rounded-lg">
                <CheckBox name={"FinalApproval"} formik={formik} />
              </div>
            </div>
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

export default Step04;
