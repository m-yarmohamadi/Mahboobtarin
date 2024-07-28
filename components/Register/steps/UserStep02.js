import Input from '@/tools/Input';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import axios from 'axios';
import { toastFunction } from '@/utils/toast';
import { useState } from 'react';
import Loading from '@/tools/Loading';
import { Router, useRouter } from 'next/router';
import OTPInput from 'react-otp-input';
const time = 90;

const UserStep02 = ({ setActiveOtp, nationalCode }) => {
	const [loading, setLoading] = useState(0);
	const router = useRouter();

	const initialValues = {
		verifycode: '',
	};
	const onSubmit = async (values) => {
		setLoading(1);
		try {
			const response = await axios.post(`https://mahboobtarin.mostafaomrani.ir/api/v1/register`, {
				...values,
				national_code: nationalCode,
				verifycode: values.verifycode,
				step: '5',
				type: 'user',
			});
			if (response.data.status === 200) {
				toastFunction(response?.data?.message, 'success');
				setLoading(0);
				router.push('/');
			} else {
				console.log('خطای ناشناخته');
				setLoading(0);
			}
			console.log(response.data);
			console.log(response.data.status);
			setLoading(0);
		} catch (error) {
			console.log(error);
			setLoading(0);
			toastFunction(response?.data?.message, 'error');
		}
	};
	const validationSchema = Yup.object({
		verifycode: Yup.string().required('وارد کردن کد تأیید 5 رقمی اجباری است').min(5, 'لطفا 5 رقم وارد کنید').max(5, 'لطفا 5 رقم وارد کنید'),
	});

	const formik = useFormik({
		initialValues,
		onSubmit,
		validationSchema,
		validateOnMount: true,
		enableReinitialize: true,
	});
	const handleChange = (otp) => {
		// بروزرسانی مقدار verifycode در formik
		formik.setFieldValue('verifycode', otp);
	  };

	return (
		<div>
			<div className='w-full h-full flex flex-col justify-between'>
				<form
					onSubmit={formik.handleSubmit}
					className='w-full h-full flex flex-col justify-between '>
					<div className='w-full h-full flex flex-col justify-between'>
						<div className=' w-full flex flex-col justify-center items-center gap-4 '>
							<p className='text-justify  w-full flex justify-center items-center font-black text-primary-01  mb-4'>لطفا کد ارسال شده به تلفن همراه خود را در اینجا درج کنید</p>
							{/* <div className=' flex justify-center items-start w-1/5'>
								<Input
									name={'verifycode'}
									label={'کد تأیید'}
									type={'text'}
									formik={formik}
									display='flex'
								/>
							</div> */}
							<div>
								<OTPInput
									value={formik.values.verifycode}
									onChange={handleChange}
									numInputs={5}
									renderSeparator={<span>-</span>}
									containerStyle={{
										display: 'flex',
										flexDirection: 'row-reverse',
										alignItems: 'center',
										justifyContent: 'center',
										gap: '8px',
									}}
									renderInput={(props) => (
										<input
											type='number'
											{...props}
										/>
									)}
									inputStyle={{
										width: '2.5rem',
										padding: '0.5rem 0.2rem',
										border: '1px solid #15aa7f',
										borderRadius: '0.5rem',
									}}
								/>
							</div>
							<div className='w-full flex justify-center items-center'>
								<button
									className=' py-2 w-1/5 text-white font-bold bg-primary-01 rounded-md shadow-md hover:opacity-90'
									type='submit'>
									{loading ? (
										<span className='w-full flex justify-center items-center'>
											<Loading />
										</span>
									) : (
										'ثبت فرم'
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
