import Input from '@/tools/Input';
import Select from '@/tools/Select';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import NextPrev from '../NextPrev';
const Nationality = [
	{ id: 1, label: 'یک گزینه را انتخاب کنید',value:'' },
	{ id: 2, label: 'ایرانی', value:'itan' },
	{ id: 3, label: 'اتباع خارجی', value:'noiran' },
];
const Sex = [
	{ id: 1, label: 'یک گزینه را انتخاب کنید',value:'' },
	{ id: 2, label: 'زن',value:'woman' },
	{ id: 3, label: 'مرد',value:'man' },
];

const Step01 = ({nextStep,prevStep}) => {
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
		nextStep()
	};
	const validationSchema = Yup.object({
		firstName: Yup.string().required('وارد کردن نام اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(11, 'حداکثر 11 حرف وارد کنید'),
		lastName: Yup.string().required('وارد کردن نام خانوادگی اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(11, 'حداکثر 11 حرف وارد کنید'),
		sex: Yup.string().required('وارد کردن جنسیت اجباری است'),
		nationality: Yup.string().required('وارد کردن ملیت اجباری است'),
		melliCode: Yup.string()
			.required('وارد کردن کدملی اجباری است')
			.matches(/^[0-9]{10}$/, 'لطفاً کد ملی معتبر 10 رقمی وارد کنید'),
		passportNumber: Yup.string()
			.required('وارد کردن شماره پاسپورت اجباری است')
			.matches(/^[0-9]{9}$/, 'لطفاً شماره پاسپورت معتبر 9 رقمی وارد کنید'),
		birthDay: Yup.string().required('وارد کردن تاریخ تولد اجباری است'),
		mobile: Yup.string()
			.required('وارد کردن شماره تلفن همراه اجباری است')
			.matches(/^[0-9]{11}$/, 'لطفاً شماره موبایل معتبر 11 رقمی وارد کنید'),
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
		<div className='w-full h-full'>
			<form
				onSubmit={formik.handleSubmit}
				className='w-full h-full flex flex-col justify-between '>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full items-start '>
					<Input
						name={'firstName'}
						label={'نام'}
						formik={formik}
						type={'text'}
					/>
					<Input
						name={'lastName'}
						label={'نام خانوادگی'}
						formik={formik}
						type={'text'}
					/>

					<div className='flex justify-between items-start gap-4'>
						<Select
							name={'sex'}
							label={'جنسیت'}
							options={Sex}
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
						<Input
							name={'melliCode'}
							label={'کد ملی'}
							formik={formik}
							type={'text'}
						/>
						<Input
							name={'passportNumber'}
							label={'شماره پاسپورت'}
							formik={formik}
							type={'text'}
						/>
					</div>
					<Input
						name={'birthDay'}
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
						/>
						<Input
							name={'email'}
							label={'ایمیل'}
							formik={formik}
							type={'text'}
						/>
					</div>
				</div>
				<NextPrev prevStep={prevStep}/>
			</form>
		</div>
	);
};

export default Step01;
