import Input from '@/tools/Input';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';

const MyInfo = () => {
	const initialValues = {
		aboutYou: '',
		name: '',
		lastname: '',
		national_code: '',
		passport_number: '',
		mobile: Yup.string()
			.required('وارد کردن شماره تلفن همراه اجباری است')
			.matches(/^\+[0-9]{11,13}$/, 'لطفاً شماره موبایل معتبر وارد کنید'),
		tel: '',
		tel2: '',
		gender: '',
		taahol: '',
		birthday: '',
		email: '',
		nationality: '',
		country: '',
		ostan: '',
		shahr: '',
		homeAddress: '',
		officeAddress: '',
		language: '',
		expertise: '',
		grade: '',
		virtualPage: '',
		picture: '',
		allSpecialties: '',
		worksAndHonors: '',
		oldPassword: '',
		password: '',
		confirmPassword: '',
	};
	const onSubmit = async (values) => {
		try {
			console.log(response.data);
		} catch (error) {
			console.log(error);
		}
	};
	const validationSchema = Yup.object({
		aboutYou: '',
		name: Yup.string().required('وارد کردن نام اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(11, 'حداکثر 11 حرف وارد کنید'),
		lastname: Yup.string().required('وارد کردن نام خانوادگی اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(11, 'حداکثر 11 حرف وارد کنید'),
		national_code: Yup.string().when('nationality', {
			is: (value) => value === 'ایرانی',
			then: (schema) => schema.required('وارد کردن کدملی اجباری است').matches(/^[0-9]{10}$/, 'لطفاً کد ملی معتبر 10 رقمی وارد کنید'),
			otherwise: (schema) => schema,
		}),
		passport_number: Yup.string().when('nationality', {
			is: (value) => value === 'اتباع خارجی',
			then: (schema) => schema.required('وارد کردن شماره پاسپورت اجباری است').matches(/^[0-9]{8}$/, 'لطفاً شماره پاسپورت معتبر 8 رقمی وارد کنید'),
			otherwise: (schema) => schema,
		}),
		tel: '',
		tel2: '',
		gender: Yup.string().required('وارد کردن جنسیت اجباری است'),
		taahol: '',
		birthday: Yup.string().required('وارد کردن تاریخ تولد اجباری است'),
		email: Yup.string().email('لطفا یک ایمیل معتبر وارد کنید').required('وارد کردن ایمیل اجباری است').email('لطفاً یک ایمیل معتبر وارد کنید'),
		nationality: Yup.string().required('وارد کردن ملیت اجباری است'),
		country: '',
		ostan: '',
		shahr: '',
		homeAddress: '',
		officeAddress: [],
		language: [],
		expertise: [],
		grade: [],
		virtualPage: [],
		picture: '',
		allSpecialties: [],
		worksAndHonors: [],
		oldPassword: '',
		password: '',
		confirmPassword: '',
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
			<form className='p-4'>
				<div className='w-full grid grid-cols-12 justify-center items-start'>
					<div className='col-span-2'>
						<Input
							name={'picture'}
							label={'تصویر'}
							type={'file'}
							formik={formik}
						/>
					</div>

					<div className='col-span-10'>
						<Input
							name={'aboutYou'}
							label={'درباره شما'}
							type={'text'}
							formik={formik}
						/>
					</div>
				</div>
				<div className='col-span-2'>
					<Input
						name={'name'}
						label={'نام'}
						type={'text'}
						formik={formik}
					/>
				</div>
				<div className='col-span-2'>
					<Input
						name={'lastname'}
						label={'نام خانوادگی'}
						type={'text'}
						formik={formik}
					/>
				</div>
				<div className='col-span-2'>
					<Input
						name={'national_code'}
						label={'کدملی'}
						type={'text'}
						formik={formik}
					/>
				</div>
				<div className='col-span-2'>
					<Input
						name={'passport_number'}
						label={'شماره پاسپورت'}
						type={'text'}
						formik={formik}
					/>
				</div>
				<div className='col-span-2'>
					<Input
						name={'mobile'}
						label={'تلفن همراه'}
						type={'text'}
						formik={formik}
					/>
				</div>
				<div className='col-span-2'>
					<Input
						name={'tel'}
						label={'تلفن ثابت'}
						type={'text'}
						formik={formik}
					/>
				</div>
				<div className='col-span-2'>
					<Input
						name={'tel2'}
						label={'تلفن اضطراری'}
						type={'text'}
						formik={formik}
					/>
				</div>
				<div className='col-span-2'>
					<Input
						name={'gender'}
						label={'جنسیت'}
						type={'text'}
						formik={formik}
					/>
				</div>
				<div className='col-span-2'>
					<Input
						name={'taahol'}
						label={'وضعیت تأهل'}
						type={'text'}
						formik={formik}
					/>
				</div>
				<div className='col-span-2'>
					<Input
						name={'birthday'}
						label={'تاریخ تولد'}
						type={'text'}
						formik={formik}
					/>
				</div>
				<div className='col-span-2'>
					<Input
						name={'email'}
						label={'ایمیل'}
						type={'text'}
						formik={formik}
					/>
				</div>
				<div className='col-span-2'>
					<Input
						name={'nationality'}
						label={'ملیت'}
						type={'text'}
						formik={formik}
					/>
				</div>
				<div className='col-span-2'>
					<Input
						name={'country'}
						label={'کشور محل سکونت'}
						type={'text'}
						formik={formik}
					/>
				</div>
				<div className='col-span-2'>
					<Input
						name={'ostan'}
						label={'استان محل سکونت'}
						type={'text'}
						formik={formik}
					/>
				</div>
				<div className='col-span-2'>
					<Input
						name={'shahr'}
						label={'شهر محل سکونت'}
						type={'text'}
						formik={formik}
					/>
				</div>
				<div className='col-span-2'>
					<Input
						name={'homeAddress'}
						label={'آدرس محل سکونت'}
						type={'text'}
						formik={formik}
					/>
				</div>
				<div className='col-span-2'>
					<Input
						name={'officeAddress'}
						label={'آدرس محل کار'}
						type={'text'}
						formik={formik}
					/>
				</div>
				<div className='col-span-2'>
					<Input
						name={'language'}
						label={'زبان خارجی'}
						type={'text'}
						formik={formik}
					/>
				</div>
				<div className='col-span-2'>
					<Input
						name={'expertise'}
						label={'تخصص'}
						type={'text'}
						formik={formik}
					/>
				</div>
				<div className='col-span-2'>
					<Input
						name={'grade'}
						label={'مقطع تحصیلی'}
						type={'text'}
						formik={formik}
					/>
				</div>
				<div className='col-span-2'>
					<Input
						name={'virtualPage'}
						label={'صفحه مجازی'}
						type={'text'}
						formik={formik}
					/>
				</div>
				<div className='col-span-2'>
					<Input
						name={'allSpecialties'}
						label={'کلیه تخصص ها و مهارتها'}
						type={'text'}
						formik={formik}
					/>
				</div>
				<div className='col-span-2'>
					<Input
						name={'worksAndHonors'}
						label={'آثار و افتخارات'}
						type={'text'}
						formik={formik}
					/>
				</div>
				<div className='col-span-2'>
					<Input
						name={'oldPassword'}
						label={'کلمه عبور فعلی'}
						type={'text'}
						formik={formik}
					/>
				</div>
				<div className='col-span-2'>
					<Input
						name={'password'}
						label={'کلمه عبور جدید'}
						type={'password'}
						formik={formik}
					/>
				</div>
				<div className='col-span-2'>
					<Input
						name={'confirmPassword'}
						label={'تکرار کلمه عبور جدید'}
						type={'password'}
						formik={formik}
					/>
				</div>
			</form>
		</div>
	);
};

export default MyInfo;
