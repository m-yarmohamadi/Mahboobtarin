import Input from '@/tools/Input';
import Select from '@/tools/Select';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import NextPrev from '../NextPrev';
import axios from 'axios';
import { toastFunction } from '@/utils/toast';
import { useState } from 'react';
import Loading from '@/tools/Loading';
import CheckOtp from '@/tools/CheckOtp';
import OTPInput from 'react-otp-input';
import { enToFaNumber } from '@/utils/enToFa';
import { HiArrowRightOnRectangle } from 'react-icons/hi2';
import { Router, useRouter } from 'next/router';
const time = 90;

const UserStep02 = ({setActiveOtp,nationalCode}) => {
	const [error2, setError2] = useState([]);
	const [loading, setLoading] = useState(0);
	const [otp, setOtp] = useState();
    const router = useRouter();


	const initialValues = {
		verifycode: '',
	};
	const onSubmit = async (values) => {
		setError2([]);
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
                router.push('/');
                ;
			} else {
				console.log('خطای ناشناخته');
			}
			console.log(response.data);
			console.log(response.data.status);
			setLoading(0);
		} catch (error) {
			console.log(error);
			setLoading(0);
			setError2(error?.response?.data?.message);

			toastFunction(error2, 'error');
		}
	};
	const validationSchema = Yup.object({
		verifycode: Yup.string().required('وارد کردن کلمه تأیید اجباری است').min(5, 'لطفا 5 رقم وارد کنید').max(5, 'لطفا 5 رقم وارد کنید'),
	});

	const formik = useFormik({
		initialValues,
		onSubmit,
		validationSchema,
		validateOnMount: true,
		enableReinitialize: true,
	});

	return (
		<div>
			<div className='w-full h-full flex flex-col justify-between'>
				<form
					onSubmit={formik.handleSubmit}
					className='w-full h-full flex flex-col justify-between '>
					<div className='w-full h-full flex flex-col justify-between'>
						<div className=' w-full flex flex-col justify-center items-center gap-2  '>
							<p className='text-justify  w-full  mb-4'>لطفا کد ارسال شده به تلفن همراه خود را در اینجا درج کنید</p>
							<div className='grid grid-cols-6'>
								<div className=' col-span-2 flex justify-center items-center px-6 w-56'>
									<Input
										name={'verifycode'}
										label={'کد تأیید'}
										type={'text'}
										formik={formik}
										display='flex'
									/>
								</div>
							</div>
						</div>
					</div>
					<div>
						<button type='submit'>ثبت فرم</button>
					</div>
				</form>
			</div>
		</div>
	);
};

export default UserStep02;
