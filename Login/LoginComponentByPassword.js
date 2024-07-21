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
		username: Yup.string().required('وارد کردن تلفن همراه اجباری است').matches(/^\+[0-9]{11,13}$/, 'لطفاً شماره موبایل معتبر وارد کنید'),
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
		<div>
			<div className='flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0'>
				<div
					transition
					className='  transform overflow-hidden rounded-lg text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95'>
					<div className='w-full grid grid-cols-3'>
						<div className=' col-span-2 w-full flex justify-between items-center'>
							<form
								onSubmit={formik.handleSubmit}
								className='w-full px-4 pb-4 pt-5 sm:p-6 sm:pb-4 flex flex-col justify-between items-center gap-2'>
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
						</div>
						<div className='w-full bg-primary-02 flex flex-col justify-around items-center'>
							<div className='px-6 py-8'>
								<img
									src='/images/logo.webp'
									alt=''
								/>
							</div>
							<div className='flex flex-col justify-center items-center gap-2 text-xs font-bold'>
								<button className=' hover:text-primary-01'>فراموشی کلمه عبور</button>
								<button className=' hover:text-primary-01'>حساب کاربری دارم</button>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LoginComponentByPassword;
