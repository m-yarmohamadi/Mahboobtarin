import Input from '@/tools/Input';
import Select from '@/tools/Select';
import * as Yup from 'yup';
import { useFormik } from 'formik';


import React from 'react';
const Nationality = [
	{ id: 1, name: 'ایرانی' },
	{ id: 2, name: 'اتباع خارجی' },
];
const Sex = [
	{ id: 1, name: 'زن' },
	{ id: 2, name: 'مرد' },
];

const Step01 = () => {
	const initialValues = {
		firstName: '',
		lastName: '',
		sex: '',
		nationality: '',
		melliCode: '',
		passportNumber: '',
		birthDay: '',
		mobile: '',
		email: '',
	};
	const onSubmit = (values) => {
		console.log(values);
	};
	const validationSchema = Yup.object({
		firstName: Yup.string().required('تکمیل این گزینه اجباری است'),
		lastName: Yup.string().required('تکمیل این گزینه اجباری است'),
		sex: Yup.string().required('تکمیل این گزینه اجباری است'),
		nationality: Yup.string().required('تکمیل این گزینه اجباری است'),
		melliCode: Yup.string().required('تکمیل این گزینه اجباری است'),
		passportNumber: Yup.string().required('تکمیل این گزینه اجباری است'),
		birthDay: Yup.string().required('تکمیل این گزینه اجباری است'),
		mobile: Yup.string().required('تکمیل این گزینه اجباری است'),
		email: Yup.string().email('لطفا یک ایمیل معتبر وارد کنید').required('تکمیل این گزینه اجباری است'),
	});

	const formik = useFormik({
		initialValues,
		onSubmit,
		validationSchema,
		validateOnMount: true,
		enableReinitialize: true,

	});
	console.log('formik=');
	console.log(formik.values);
	return (
		<div className='w-full '>
			<form
				onSubmit={onSubmit}
				className='w-full '>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full '>
					<Input
						name={'firstName'}
						title={'نام'}
						formik={formik}
						type={'text'}
					/>
					<Input
						name={'lastName'}
						title={'نام خانوادگی'}
						formik={formik}
						type={'text'}
					/>

					<div className='flex justify-between items-center gap-4'>
						<Select
							name={'sex'}
							title={'جنسیت'}
							options={Sex}
						/>
						<Select
							name={'nationality'}
							title={'ملیت'}
							options={Nationality}
						/>
					</div>
					<div className='flex justify-between items-center gap-4'>
						<Input
							name={'melliCode'}
							title={'کد ملی'}
							formik={formik}
							type={'text'}
						/>
						<Input
							name={'passportNumber'}
							title={'شماره پاسپورت'}
							formik={formik}
							type={'text'}
						/>
					</div>
					<Input
						name={'birthDay'}
						title={'تاریخ تولد'}
						formik={formik}
						type={'date'}
					/>
					<div className='flex justify-between items-center gap-4'>
						<Input
							name={'mobile'}
							title={'شماره تلفن همراه'}
							formik={formik}
							type={'text'}
						/>
						<Input
							name={'email'}
							title={'ایمیل'}
							formik={formik}
							type={'text'}
						/>
					</div>
				</div>
			</form>
		</div>
	);
};

export default Step01;
