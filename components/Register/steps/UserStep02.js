import Input from '@/tools/Input';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { toastFunction } from '@/utils/Toast';
import { useState } from 'react';
import Loading from '@/tools/Loading';
import { Router, useRouter } from 'next/router';
import OTPInput from 'react-otp-input';
import { useMutation } from '@tanstack/react-query';
import { register } from '@/services/authService';
import toast from 'react-hot-toast';
import Cookies from 'js-cookie';
const time = 90;

const UserStep02 = ({ setActiveOtp, nationalCode, mobile }) => {
	const router = useRouter();
	const { mutate:mutateRegister, isPending } = useMutation({mutationFn:register});
	const [completed, setCompleted] = useState(false);

	const onSubmit = (values) => {
		mutateRegister({
			...values,
			mobile,
			check_user_register:false,
			step:"5",
			type:"user",
			national_code:nationalCode
		},{
			onSuccess:({data})=>{
				if(data && data.status === 200){
					Cookies.set("accessToken", data.token, {expires:1/48});
					toast.success("ثبت نام شما با موفقیت تکمیل شد");
					setCompleted(true);
					router.replace("/");
				}
			},
			onError:(error)=>{
				if(error?.response?.data?.message[0] === "verifycode not valid"){
					formik.setFieldError("verifycode", "کد تایید وارد شده نادرست است");
				} else {
					toast.error("خطایی رخ داده!");
				}
			}
		});
	}

	const formik = useFormik({
		initialValues:{verifycode: ''},
		onSubmit,
		validationSchema:Yup.object({
			verifycode: Yup.string()
				.required('وارد کردن کد تأیید 5 رقمی اجباری است')
				.min(5, 'لطفا 5 رقم وارد کنید')
				.max(5, 'لطفا 5 رقم وارد کنید')
		}),
		enableReinitialize: true,
	});


	return (
		<div>
			{completed && (
				<div className="w-full h-full gap-3 font-bold text-xl  flex-col fixed top-0 right-0 flex items-center justify-center bg-white/80 z-[60]">
					در حال ورود به سایت
					<Loading customeColor="#15aa7f" />
				</div>
			)}
			<div className='w-full h-full flex flex-col justify-between'>
				<form
					onSubmit={formik.handleSubmit}
					className='w-full h-full flex flex-col justify-between '>
					<div className='w-full h-full flex flex-col justify-between'>
						<div className=' w-full flex flex-col justify-center items-center gap-4 mt-7'>
							<div>
								<div className=" w-auto flex flex-col justify-center items-center gap-2  ">
									<p className=" w-full flex items-center justify-center font-medium text-sm text-gray-700 mb-4">
									لطفا کد ارسال شده به تلفن همراه خود را در اینجا درج کنید
									</p>
									<OTPInput
										value={formik.values.verifycode}
										onChange={(e)=>formik.setFieldValue("verifycode", e)}
										numInputs={5}
										shouldAutoFocus
										containerStyle="flex flex-row-reverse items-center justify-center gap-3"
										renderInput={(props) => <input type="number" {...props} />}
										inputStyle="!w-full !max-w-12 !h-12 bg-white border border-slate-300 !rounded-lg text-xl text-slate-800 outline-none focus:!border-primary-01"
									/>
									{
									formik.errors.verifycode &&
										<span className='text-error text-xs '>
											{formik.errors.verifycode}
										</span>
									}
								</div>
							</div>
							<div className='w-full flex justify-center items-center'>
								<button
									className='btn btn--primary w-full max-w-sm'
									type='submit'>
									{isPending ? (
										<span className='w-full flex justify-center items-center'>
											<Loading />
										</span>
									) : (
										'ثبت'
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
