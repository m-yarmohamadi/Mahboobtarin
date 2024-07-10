import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import Select from '@/tools/Select';
import Input from '@/tools/Input';

const LoginModal = ({ openLoginModal, setOpenLoginModal }) => {
	const initialValues = {
		email: '',
		password: '',
	};
	const onSubmit = (values) => {
		console.log(values);
	};
	const validationSchema = Yup.object({
		email: Yup.string().email('لطفا یک ایمیل معتبر وارد کنید').required('وارد کردن ایمیل اجباری است').email('لطفاً یک ایمیل معتبر وارد کنید'),
		password: Yup.string().required('وارد کردن کلمه عبور اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(11, 'حداکثر 11 حرف وارد کنید'),
	});

	const formik = useFormik({
		initialValues,
		onSubmit,
		validationSchema,
		validateOnMount: true,
		enableReinitialize: true,
	});

	return (
		<Dialog
			open={openLoginModal}
			onClose={setOpenLoginModal}
			className='relative z-20'>
			<DialogBackdrop
				transition
				className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in'
			/>
			<div className='fixed inset-0 z-20 w-screen overflow-y-auto'>
				<div className='flex min-h-full items-start justify-center p-4 text-center sm:items-center sm:p-0'>
					<DialogPanel
						transition
						className=' relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-4 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-lg data-[closed]:sm:translate-y-0 data-[closed]:sm:scale-95'>
						<div className='w-full bg-primary-01 contrast-200 border-2 border-primary-03 rounded-lg text-white font-bold  p-3 flex justify-center items-center'>ورود کاربران</div>
						<div className='w-full grid grid-cols-3'>
							<div className=' col-span-2 w-full flex justify-between items-center'>
								<form className='w-full bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4 flex flex-col justify-between items-center gap-2'>
									<div className='w-full'>
										<Input
											name={'email'}
											label={'ایمیل'}
											formik={formik}
											type={'text'}
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
											type='button'
											onClick={() => setOpenLoginModal(false)}
											className='flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500  sm:w-auto'>
											انصراف
										</button>
										<button
											type='button'
											onClick={() => setOpenLoginModal(false)}
											className='flex w-full justify-center rounded-md bg-primary-01 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-opacity-85  sm:w-auto'>
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
					</DialogPanel>
				</div>
			</div>
		</Dialog>
	);
};

export default LoginModal;
