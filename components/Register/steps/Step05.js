import * as Yup from 'yup';
import { useFormik } from 'formik';
import NextPrev from '../NextPrev';
import CheckBox from '@/tools/CheckBox';
import axios from 'axios';
import { useState } from 'react';
import Input from '@/tools/Input';
import OTPInput from 'react-otp-input';

const Step05 = ({ nextStep, prevStep, nationalCode }) => {
	const [error, setError] = useState([]);
	const [loading, setLoading] = useState(0);

	const initialValues = {
		verifycode: '',
	};
	const [otp, setOtp] = useState();
	const onSubmit = async (values) => {
		setLoading(1);
		try {
			const response = await axios.post(`https://mahboobtarin.mostafaomrani.ir/api/v1/register`, {
				...values,
				national_code: nationalCode,
				verifycode: values.verifycode,
				step: '5',
				type: 'expert',
			});
			console.log(response.data);
			setLoading(0);
			nextStep();
		} catch (error) {
			console.log(error);
			setLoading(0);
			{
				error.response.data.message && setError(error.response.data.message);
			}
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
					<NextPrev
						prevStep={prevStep}
						loading={loading}
						step={5}
					/>
				</div>
			</form>
			{error &&
				error.map((item, index) => {
					return <div key={index}>{item}</div>;
				})}
		</div>
	);
};

export default Step05;
