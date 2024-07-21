import * as Yup from 'yup';
import { useFormik } from 'formik';
import Input from '@/tools/Input';
import axios from 'axios';
import toast from 'react-hot-toast';

const LoginComponentByPassword = () => {
	const initialValues = {
		username: '',
		password: '',
	};
	const onSubmit = async (values) => {
		try {
			const response = await axios.post(`https://mahboobtarin.mostafaomrani.ir/api/v1/login`, {
				...values,
				type: 'pass',
				otp: '0',
			});
			console.log(response.data);

			toast.success(data.message);
		} catch (error) {
			console.log(error);
			toast?.error?.response?.data?.message;
		}
	};
	const validationSchema = Yup.object({
		username: Yup.string()
			.required('وارد کردن تلفن همراه اجباری است')
			.matches(/^\+[0-9]{11,13}$/, 'لطفاً شماره موبایل معتبر وارد کنید'),
		password: Yup.string().required('وارد کردن کلمه عبور اجباری است').min(6, 'حداقل 6 حرف وارد کنید').max(11, 'حداکثر 11 حرف وارد کنید'),
	});

	const formik = useFormik({
		initialValues,
		onSubmit,
		validationSchema,
		validateOnMount: true,
		enableReinitialize: true,
	});

	return (
		<form
			onSubmit={formik.handleSubmit}
			className='w-full flex flex-col justify-between items-center gap-2 transition-all duration-1000 ease-in-out'>
			<div className='w-full'>
				<Input
					name={'mobile'}
					label={'شماره تلفن همراه'}
					formik={formik}
					type={'text'}
					placeholder={'+98'}
					dir='ltr'
				/>
				<Input
					name={'password'}
					label={'کلمه عبور'}
					formik={formik}
					type={'password'}
				/>
			</div>
			<div className=' w-full py-3 flex justify-end items-center gap-2'>
				<button
					type='submit'
					className='flex w-full justify-center rounded-md bg-primary-01 px-8 py-2 text-sm font-semibold text-white shadow-sm hover:bg-opacity-85  sm:w-auto'>
					ورود
				</button>
			</div>
		</form>
	);
};

export default LoginComponentByPassword;
