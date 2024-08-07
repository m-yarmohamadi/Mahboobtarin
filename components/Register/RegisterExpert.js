import React, { useState } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Step01 from '@/components/Register/steps/Step01';
import Step02 from '@/components/Register/steps/Step02';
import Step03 from '@/components/Register/steps/Step03';
import Step04 from '@/components/Register/steps/Step04';
import { useRouter } from 'next/router';
import Step05 from '@/components/Register/steps/Step05';
import Head from 'next/head';
import { useFormik } from 'formik';
import * as Yup from "yup";
import StepLevel from './steps/StepLevel';
import NextPrev from './NextPrev';
import { useMutation } from '@tanstack/react-query';
import { register } from '@/services/authService';
import toast from 'react-hot-toast';
import { enToFaMessages } from '@/utils/enToFaMessages';
import Cookies from 'js-cookie';
import Loading from '@/tools/Loading';


// validation steps
const validationSchemaStep1 = Yup.object({
	name: Yup.string().required('وارد کردن نام اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(11, 'حداکثر 11 حرف وارد کنید'),
	lastname: Yup.string().required('وارد کردن نام خانوادگی اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(11, 'حداکثر 11 حرف وارد کنید'),
	gender: Yup.string().required('وارد کردن جنسیت اجباری است'),
	nationality: Yup.string().required('وارد کردن ملیت اجباری است'),
	national_code: Yup.string().when('nationality', {
		is: (value) => value === 'Iran',
		then: (schema) => schema.required('وارد کردن کدملی اجباری است').matches(/^[0-9]{10}$/, 'لطفاً کد ملی معتبر 10 رقمی وارد کنید'),
		otherwise: (schema) => schema,
	}),
	passport_number: Yup.string().when('nationality', {
		is: (value) => value !== 'Iran',
		then: (schema) => schema.required('وارد کردن شماره پاسپورت اجباری است').matches(/^[0-9]{8}$/, 'لطفاً شماره پاسپورت معتبر 8 رقمی وارد کنید'),
		otherwise: (schema) => schema,
	}),

	birthday: Yup.string()
		.required('وارد کردن تاریخ تولد اجباری است')
		.test("is-valid-date", "تاریخ تولد را کامل وارد کنید", value => {
			const [year, month, day] = value.split("-");
			if (year === "undefined" 
				|| month === "undefined" 
				|| day === "undefined"
				|| year === ""
				|| month === ""
				|| day === ""
				
			) return false; 
			return true;
		  }),
	email: Yup.string().email('لطفا یک ایمیل معتبر وارد کنید').required('وارد کردن ایمیل اجباری است').email('لطفاً یک ایمیل معتبر وارد کنید'),
});

const validationSchemaStep2 = Yup.object({
	country: Yup.string().required('وارد کردن کشور محل سکونت اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(20, 'حداکثر 20 حرف وارد کنید'),
	province_id: Yup.string().required('وارد کردن استان محل سکونت اجباری است'),
	city_id: Yup.string().required('وارد کردن شهر محل سکونت اجباری است'),
	address: Yup.string().required('وارد کردن آدرس محل سکونت اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(200, 'حداکثر 200 حرف وارد کنید'),
	address_work: Yup.string().required('وارد کردن آدرس محل کار اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(200, 'حداکثر 200 حرف وارد کنید'),
});

const validationSchemaStep3 = Yup.object({
	expertise: Yup.array().min(1, 'وارد کردن تخصص اجباری است'),
	grade: Yup.array().min(1, 'وارد کردن مقطع تحصیلی اجباری است'),
	language: Yup.array().min(1, 'وارد کردن زبان و گویش اجباری است'),
	password: Yup.string().required('وارد کردن کلمه عبور اجباری است').min(6, 'حداقل 6 حرف وارد کنید').max(11, 'حداکثر 11 حرف وارد کنید'),
	confirmPassword: Yup.string()
		.required('وارد کردن تکرار کلمه عبور اجباری است')
		.oneOf([Yup.ref('password'), null], 'کلمه عبور و تکرار آن باید یکسان باشند '),

	picture: Yup.string(),
});


const RegisterExpert = ({mobile, userStep=1, nationalCodeInitial="", userData}) => { 
    const router = useRouter();
	const [nationalCode, setNationalCode] = useState(nationalCodeInitial);
	const [step, setStep] = useState(userStep);
	const { isPending, mutate:mutateRegister } = useMutation({mutationFn:register});
	const [completed, setCompleted] = useState(false);
	

	const nextStep = () => {
		if (step < 5) {
			const newStep = step + 1;
			setStep(newStep);
		}
	};
	const prevStep = () => {
		if (step > 1) {
			const newStep = step - 1;
			setStep(newStep);
		}
	};

	const defaultDataRegister = {
		type: "expert",
		mobile,
		check_user_register: false,
		verifycode:0
	}
	
	const [errorStep2, setErrorStep2] = useState([]);
	const [errorStep3, setErrorStep3] = useState([]);
	const [errorStep4, setErrorStep4] = useState([]);
	const [errorStep5, setErrorStep5] = useState([]);

	//  ** step 1 form handlers and formik **
	const initialValuesStep1 = {
		name: userData?.name || "",
		lastname: userData?.lastname || "",
		gender: userData?.gender || "",
		nationality: userData?.nationality || "Iran",
		national_code: userData?.national_code,
		passport_number: userData?.passport_number || "",
		birthday: userData?.birthday || "",
		email: userData?.email || "",
	}

	const submitHandlerStep1 = (values) => {
		mutateRegister({
			...defaultDataRegister,
			...values,
			step:"1"
		}, {
			onSuccess:({data})=>{
				if(data){
					nextStep();
				}
			},
			onError:(error)=>{
				toast.error("خطایی رخ داده است");
			}
		})
	}

	const formikStep1 = useFormik({
		initialValues:initialValuesStep1,
		onSubmit:submitHandlerStep1,
		validationSchema:validationSchemaStep1,
		validateOnMount: true,
		enableReinitialize: true,
	});
	


	//  ** step 2 form handlers and formik **
	const initialValuesStep2 = {
		country: userData?.country || "Iran",
		province_id: userData?.province_id || "",
		city_id: userData?.city_id || "",
		address: userData?.address || "",
		address_work: userData?.address_work || "",
	}

	const submitHandlerStep2 = (values) => {
		mutateRegister({
			...defaultDataRegister,
			...values,
			step:"2",
			national_code:nationalCode || formikStep1.values.national_code
		}, {
			onSuccess:({data})=>{
				if(data){
					nextStep();
				}
			},
			onError:(error)=>{
				if(error?.response?.data?.status === 422){
					setErrorStep2(error?.response?.data?.message);
				} else {
					toast.error("خطایی رخ داده است");
				}
			}
		})
	}

	const formikStep2 = useFormik({
		initialValues:initialValuesStep2,
		onSubmit:submitHandlerStep2,
		validationSchema:validationSchemaStep2,
		validateOnMount: true,
		enableReinitialize: true,
	});



	//  ** step 3 form handlers and formik **
	const initialValuesStep3 = {
		expertise: [],
		grade: [],
		language: [],
		password: '',
		confirmPassword: '',
		picture: '',
	}
	
	const submitHandlerStep3 = (values) => {
		const step03Data = {
			expertise: values.expertise,
			grade: values.grade,
			language: values.language,
			password: values.password,
			confirmPassword: values.confirmPassword,
			avatar: values.picture,
			type: 'expert',
			step: '3',
			national_code:nationalCode || formikStep1.values.national_code,
			mobile,
			check_user_register:false,
			verifycode:0,
		};
		const formData = new FormData();
		for (const key in step03Data) {
			if (Array.isArray(step03Data[key]) && step03Data[key].length > 0) {
				formData.append(key, JSON.stringify(step03Data[key]));
			} else {
				formData.append(key, step03Data[key]);
			}
		}

		mutateRegister(formData, {
			onSuccess:({data})=>{
				if(data){
					nextStep();
				}
			},
			onError:(error)=>{
				if(error?.response?.data?.status === 422){
					setErrorStep3(error?.response?.data?.message);
				} else {
					toast.error("خطایی رخ داده است");
				}
			}
		})
	}

	const formikStep3 = useFormik({
		initialValues:initialValuesStep3,
		onSubmit:submitHandlerStep3,
		validationSchema:validationSchemaStep3,
		validateOnMount: true,
		enableReinitialize: true,
	});



	//  ** step 4 form handlers and formik **
	const submitHandlerStep4 = (values) => {
		mutateRegister({
			...defaultDataRegister,
			...values,
			step:"4",
			national_code:nationalCode || formikStep1.values.national_code
		}, {
			onSuccess:({data})=>{
				if(data){
					nextStep();
				}
			},
			onError:(error)=>{
				if(error?.response?.data?.status === 422){
					setErrorStep4(error?.response?.data?.message);
				} else {
					toast.error("خطایی رخ داده است");
				}
			}
		})
	}

	const formikStep4 = useFormik({
		initialValues:{FinalApproval: false},
		onSubmit:submitHandlerStep4,
		validationSchema:Yup.object({
			FinalApproval: Yup.boolean().oneOf([true], 'شما باید قوانین وب سایت را تأیید کنید.'),
		}),
		validateOnMount: true,
		enableReinitialize: true,
	});



	//  ** step 5 form handlers and formik **
	const submitHandlerStep5 = (values) => {
		mutateRegister({
			type: "expert",
			mobile,
			check_user_register: false,
			...values,
			step:"5",
			national_code:nationalCode || formikStep1.values.national_code
		}, {
			onSuccess:({data})=>{
				if(data){
					Cookies.set("accessToken", data.token, {expires:1/48});
					setCompleted(true);
					toast.success("ثبت نام شما با موفقیت تکمیل شد");
					router.replace(`/`);
				}
			},
			onError:(error)=>{
				if(error?.response?.data?.status === 422){
					setErrorStep5(error?.response?.data?.message);
				} else {

					if(error?.response?.data?.status === 401){
						toast.error(enToFaMessages(error?.response?.data?.message[0]));
					}else{
						toast.error("خطایی رخ داده است");
					}
				}
			}
		})
	}

	const formikStep5 = useFormik({
		initialValues:{verifycode: ""},
		onSubmit:submitHandlerStep5,
		validationSchema:Yup.object({
			verifycode: Yup.string()
			  .required("وارد کردن کلمه تأیید اجباری است")
			  .min(5, "لطفا 5 رقم وارد کنید")
			  .max(5, "لطفا 5 رقم وارد کنید"),
		}),
		validateOnMount: true,
		enableReinitialize: true,
	});

    return (
		<>
		{completed && (
			<div className="w-full h-full gap-3 font-bold text-xl  flex-col fixed top-0 right-0 flex items-center justify-center bg-white/80 z-[60]">
				در حال ورود به سایت
				<Loading customeColor="#15aa7f" />
			</div>
		)}
		<div className='w-full flex flex-col gap-7'>
			<Head>
				<title>{`${process.env.NEXT_PUBLIC_SITE_NAME} | ثبت نام`}</title>
			</Head>
			<Header />
			<div className='w-full max-w-screen-lg mx-auto bg-white rounded-lg shadow-sm p-6'>
				<h1 className='text-xl font-semibold text-slate-800 text-center pb-4 mb-4 border-b border-slate-300'>
					ثبت نام متخصصین
				</h1>
				<div className=''>
					
					<StepLevel currentStep={step}/>

					<div className=''>
						{step === 1 && (
							<Step01
								formik={formikStep1}
							>
								<NextPrev prevStep={prevStep} loading={isPending} step={1} />
							</Step01>
						)}
						{step === 2 && (
							<Step02
								formik={formikStep2}
								error={errorStep2}
							>
								<NextPrev prevStep={prevStep} loading={isPending} step={2}/>
							</Step02>
						)}
						{step === 3 && (
							<Step03
								formik={formikStep3}
								error={errorStep3}
							>
								<NextPrev prevStep={prevStep} loading={isPending} step={3}/>
							</Step03>
						)}
						{step === 4 && (
							<Step04
								formik={formikStep4}
								error={errorStep4}
							>
								<NextPrev prevStep={prevStep} loading={isPending} step={4} />
							</Step04>
						)}
						{step === 5 && (
							<Step05
								formik={formikStep5}
								error={errorStep5}
							>
								<NextPrev prevStep={prevStep} loading={isPending} step={5} />
							</Step05>
						)}
					</div>
				</div>
			</div>
			<Footer />
		</div>
		</>
    );
};

export default RegisterExpert;