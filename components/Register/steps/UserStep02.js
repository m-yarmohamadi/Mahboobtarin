import Input from "@/tools/Input";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { toastFunction } from "@/utils/Toast";
import { useState } from "react";
import Loading from "@/tools/Loading";
import { Router, useRouter } from "next/router";
import OTPInput from "react-otp-input";
import { useMutation } from "@tanstack/react-query";
import { register } from "@/services/authService";
import toast from "react-hot-toast";
import Cookies from "js-cookie";
import CheckBox from "@/tools/CheckBox";
const time = 90;

const UserStep02 = ({ setStepUser, nationalCode, mobile, otp }) => {
  const router = useRouter();
  const { mutate: mutateRegister, isPending } = useMutation({
    mutationFn: register,
  });
  const [completed, setCompleted] = useState(false);

  const onSubmit = (values) => {
    mutateRegister(
      {
        mobile,
        is_register_form: true,
        step: 2,
        type: "user",
        verifycode: otp,
        national_code: nationalCode,
      },
      {
        onSuccess: ({ data }) => {
          if (data) {
            Cookies.set("accessToken", data.token, { expires: 1 / 48 });
            toast.success("ثبت نام شما با موفقیت تکمیل شد");
            setCompleted(true);
            router.replace("/");
          }
        },
        onError: (error) => {
          toast.error("خطایی رخ داده!");
        },
      }
    );
  };

  const formik = useFormik({
    initialValues: { FinalApproval: false },
    onSubmit,
    validationSchema: Yup.object({
      FinalApproval: Yup.boolean().oneOf(
        [true],
        "شما باید قوانین وب سایت را تأیید کنید."
      ),
    }),
    validateOnMount: true,
    enableReinitialize: true,
  });

  return (
    <div>
      {completed && (
        <div className="w-full h-full gap-3 font-bold text-xl text-[#fff] flex-col fixed top-0 right-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-[60]">
          در حال ورود به سایت
          <Loading />
        </div>
      )}
      <div className="w-full h-full flex flex-col justify-between">
        <form
          onSubmit={formik.handleSubmit}
          className="w-full h-full flex flex-col justify-between "
        >
          <div className="w-full h-full flex flex-col justify-between">
            <div className=" w-full flex flex-col justify-center items-center gap-4 mt-7">
              <div className="w-full h-full flex flex-col justify-between">
                <div className=" w-full  ">
                  <h1 className="text-lg text-slate-800 font-bold py-3">
                    قوانین:
                  </h1>
                  <p className="text-justify overflow-y-scroll w-full h-36 mb-4 text-sm text-slate-600 leading-7 pl-5">
                    لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                    با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه
                    و مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی
                    تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای
                    کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و
                    آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم
                    افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص
                    طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این
                    صورت می توان امید داشت که تمام و دشواری موجود در ارائه
                    راهکارها، و شرایط سخت تایپ به پایان رسد و زمان مورد نیاز
                    شامل حروفچینی دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل
                    دنیای موجود طراحی اساسا مورد استفاده قرار گیرد.لورم ایپسوم
                    متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و با استفاده
                    از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و مجله در
                    ستون و سطرآنچنان که لازم است، و برای شرایط فعلی تکنولوژی
                    مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای کاربردی
                    می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و آینده،
                    شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم افزارها
                    شناخت بیشتری را برای طراحان رایانه ای علی الخصوص طراحان
                    خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این صورت می
                    توان امید داشت که تمام و دشواری موجود در ارائه راهکارها، و
                    شرایط سخت تایپ به پایان رسد و زمان مورد نیاز شامل حروفچینی
                    دستاوردهای اصلی، و جوابگوی سوالات پیوسته اهل دنیای موجود
                    طراحی اساسا مورد استفاده قرار گیرد.
                  </p>
                  <div className="grid grid-cols-6">
                    <div className=" col-span-4 p-2 bg-primary-02 rounded-lg">
                      <CheckBox name={"FinalApproval"} formik={formik} />
                    </div>
                    <div className=" col-span-2 flex justify-center items-center px-6 w-56"></div>
                  </div>
                </div>
              </div>

              <div className="w-full flex justify-center items-center">
                <button
                  className="btn btn--primary w-full max-w-sm"
                  type="submit"
                >
                  {isPending ? (
                    <span className="w-full flex justify-center items-center">
                      <Loading />
                    </span>
                  ) : (
                    "تایید"
                  )}
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserStep02;
