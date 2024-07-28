import Input from '@/tools/Input';
import Select from '@/tools/Select';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import NextPrev from '../NextPrev';
import axios from 'axios';
import { toastFunction } from '@/utils/toast';
import { useState } from 'react';
import countries from '@/data/countries';


const Nationality = [
	{ id: 1, label: 'یک گزینه را انتخاب کنید', value: '' },
	{ id: 2, label: 'ایرانی', value: 'iran' },
	{ id: 3, label: 'اتباع خارجی', value: 'noiran' },
];
const gender = [
	{ id: 1, label: 'یک گزینه را انتخاب کنید', value: '' },
	{ id: 2, label: 'زن', value: 'woman' },
	{ id: 3, label: 'مرد', value: 'man' },
];

const Step01 = ({ nextStep, prevStep, setNationalCode }) => {
	const [error2, setError2] = useState([]);
	const [loading, setLoading] = useState(0);

	const initialValues = {
		name: '',
		lastname: '',
		gender: '',
		nationality: '',
		national_code: '',
		passport_number: '',
		birthday: '',
		mobile: '+98',
		email: '',
	};
	const onSubmit = async (values) => {
		setError2([]);
		setLoading(1)
		try {
			const response = await axios.post(`https://mahboobtarin.mostafaomrani.ir/api/v1/register`, {
				...values,
				step: '1',
				type:'expert'
			});
			console.log(response.data);
			setNationalCode(values.national_code);
			setLoading(0)
			nextStep();
		} catch (error) {
			console.log(error);
			setLoading(0)
			setError2(error.response.data.message);

			toastFunction(error2, 'error');
		}
	};
	const validationSchema = Yup.object({
		name: Yup.string().required('وارد کردن نام اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(11, 'حداکثر 11 حرف وارد کنید'),
		lastname: Yup.string().required('وارد کردن نام خانوادگی اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(11, 'حداکثر 11 حرف وارد کنید'),
		gender: Yup.string().required('وارد کردن جنسیت اجباری است'),
		nationality: Yup.string().required('وارد کردن ملیت اجباری است'),
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

		birthday: Yup.string().required('وارد کردن تاریخ تولد اجباری است'),
		mobile: Yup.string()
			.required('وارد کردن شماره تلفن همراه اجباری است')
			.matches(/^\+[0-9]{11,13}$/, 'لطفاً شماره موبایل معتبر وارد کنید'),
		email: Yup.string().email('لطفا یک ایمیل معتبر وارد کنید').required('وارد کردن ایمیل اجباری است').email('لطفاً یک ایمیل معتبر وارد کنید'),
	});

	const formik = useFormik({
		initialValues,
		onSubmit,
		validationSchema,
		validateOnMount: true,
		enableReinitialize: true,
	});
	return (
		<div className='w-full h-full transition-all duration-1000 ease-in-out'>
			<form
				onSubmit={formik.handleSubmit}
				className='w-full h-full flex flex-col justify-between '>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-start '>
					<Input
						name={'name'}
						label={'نام'}
						formik={formik}
						type={'text'}
					/>
					<Input
						name={'lastname'}
						label={'نام خانوادگی'}
						formik={formik}
						type={'text'}
					/>

					<div className='flex justify-between items-start gap-4'>
						<Select
							name={'gender'}
							label={'جنسیت'}
							options={gender}
							formik={formik}
						/>
						<Select
							name={'nationality'}
							label={'ملیت'}
							options={Nationality}
							formik={formik}
						/>
					</div>

					<div className='flex justify-between items-start gap-4'>
						{formik.values.nationality !== 'اتباع خارجی' && (
							<Input
								name={'national_code'}
								label={'کد ملی'}
								formik={formik}
								type={'text'}
							/>
						)}
						{formik.values.nationality === 'اتباع خارجی' && (
							<Input
								name={'passport_number'}
								label={'شماره پاسپورت'}
								formik={formik}
								type={'text'}
							/>
						)}
					</div>
					<Input
						name={'birthday'}
						label={'تاریخ تولد'}
						formik={formik}
						type={'date'}
					/>
					<div className='flex justify-between items-start gap-4'>
						<Input
							name={'mobile'}
							label={'شماره تلفن همراه'}
							formik={formik}
							type={'text'}
							placeholder={'+98'}
							dir='ltr'
						/>
						<Input
							name={'email'}
							label={'ایمیل'}
							formik={formik}
							type={'text'}
						/>
					</div>
				</div>
				<NextPrev prevStep={prevStep} loading={loading} step={1} />
			</form>
		</div>
	);
};

export default Step01;
