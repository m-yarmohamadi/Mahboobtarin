import Input from '@/tools/Input';
import Select from '@/tools/Select';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import NextPrev from '../NextPrev';
const Expertise = [
	{ id: 0, label: 'یک گزینه را انتخاب کنید', value: '' },
	{ id: 1, label: 'پزشکی', value: 'medical' },
	{ id: 2, label: 'سینما', value: 'cinema' },
	{ id: 3, label: 'نقاشی', value: 'Painting' },
	{ id: 4, label: 'معماری', value: 'architecture' },
];
const Grade = [
	{ id: 0, label: 'یک گزینه را انتخاب کنید', value: '' },
	{ id: 1, label: 'زیر دیپلم', value: 'underDiploma' },
	{ id: 2, label: 'دیپلم', value: 'diploma' },
	{ id: 3, label: 'کاردانی', value: 'AssociateDegree' },
	{ id: 4, label: 'کارشناسی', value: 'BS' },
	{ id: 5, label: 'کارشناسی ارشد', value: 'MSc' },
	{ id: 6, label: 'دکتری', value: 'P.H.D' },
];
const Language = [
	{ id: 0, label: 'یک گزینه را انتخاب کنید', value: '' },
	{ id: 1, label: 'ترکی', value: 'torki' },
	{ id: 2, label: 'کردی', value: 'kordi' },
	{ id: 3, label: 'لری', value: 'lori' },
	{ id: 4, label: 'تالشی', value: 'taleshi' },
	{ id: 5, label: 'عربی', value: 'arabic' },
	{ id: 6, label: 'بلوچ', value: 'baloochi' },
];
const Proficiency = [
	{ id: 0, label: 'یک گزینه را انتخاب کنید', value: '' },
	{ id: 1, label: 'خیلی ضعیف', value: 'VeryWeak' },
	{ id: 2, label: 'ضعیف', value: 'weak' },
	{ id: 3, label: 'متوسط', value: 'medium' },
	{ id: 4, label: 'خوب', value: 'good' },
	{ id: 5, label: 'خیلی خوب', value: 'veryGood' },
	{ id: 6, label: 'عالی', value: 'Excellent' },
];

const Step03 = ({nextStep,prevStep}) => {
	const initialValues = {
		expertise: '',
		expertiseName: '',
		grade: '',
		educationPlace: '',
		language: '',
		proficiency: '',
		specializedSystemCode: '',
		identificationCode: '',
		password: '',
		confirmPassword: '',
		picture: '',
	};
	const onSubmit = (values) => {
		console.log(values);
		nextStep();
	};
	const validationSchema = Yup.object({
		expertise: Yup.string().required('وارد کردن موضوع تخصص اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(11, 'حداکثر 11 حرف وارد کنید'),
		expertiseName: Yup.string().required('وارد کردن عنوان تخصص اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(11, 'حداکثر 11 حرف وارد کنید'),
		grade: Yup.string().required('وارد کردن مقطع تحصیلی اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(11, 'حداکثر 11 حرف وارد کنید'),
		educationPlace: Yup.string().required('وارد کردن نام محل تحصیل اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(11, 'حداکثر 11 حرف وارد کنید'),
		language: Yup.string().required('وارد کردن زبان و گویش اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(11, 'حداکثر 11 حرف وارد کنید'),
		proficiency: Yup.string().required('وارد کردن میزان تسلط اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(11, 'حداکثر 11 حرف وارد کنید'),
		specializedSystemCode: Yup.string().required('وارد کردن کد نظام تخصصی اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(11, 'حداکثر 11 حرف وارد کنید'),
		identificationCode: Yup.string().required('وارد کردن کد معرف اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(11, 'حداکثر 11 حرف وارد کنید'),
		password: Yup.string().required('وارد کردن کلمه عبور اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(11, 'حداکثر 11 حرف وارد کنید'),
		confirmPassword: Yup.string().required('وارد کردن تکرار کلمه عبور اجباری است').min(3, 'حداقل 3 حرف وارد کنید').max(11, 'حداکثر 11 حرف وارد کنید'),
		picture: Yup.string().required('وارد کردن عکس پروفایل اجباری است'),
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
					<div className='flex justify-between items-center gap-4'>
						<Select
							name={'expertise'}
							label={'موضوع تخصص'}
							options={Expertise}
							formik={formik}
						/>
						<Input
							name={'expertiseName'}
							label={'عنوان تخصص'}
							type={'text'}
							formik={formik}
						/>
					</div>
					<div className='flex justify-between items-center gap-4'>
						<Select
							name={'grade'}
							label={'مقطع تحصیلی'}
							options={Grade}
							formik={formik}
						/>
						<Input
							name={'educationPlace'}
							label={'نام محل تحصیل'}
							type={'text'}
							formik={formik}
						/>
					</div>
					<div className='flex justify-between items-center gap-4'>
						<Select
							name={'language'}
							label={'زبان و گویش'}
							options={Language}
							formik={formik}
						/>
						<Select
							name={'proficiency'}
							label={'میزان تسلط'}
							options={Proficiency}
							formik={formik}
						/>
					</div>
					<div className='flex justify-between items-center gap-4'>
						<Input
							name={'specializedSystemCode'}
							label={'کد نظام تخصصی'}
							type={'text'}
							formik={formik}
						/>
						<Input
							name={'identificationCode'}
							label={'کد معرف'}
							type={'text'}
							formik={formik}
						/>
						<button
							className='py-2 mt-5 rounded-md px-2 bg-primary-01 text-white flex justify-center items-center'
							type=''>
							افزودن
						</button>
					</div>
				</div>
				<div className='grid grid-cols-1 md:grid-cols-2 gap-4 w-full '>
					<div className='flex justify-between items-center gap-4'>
						<Input
							name={'password'}
							label={'کلمه عبور'}
							type={'text'}
							formik={formik}
						/>
						<Input
							name={'confirmPassword'}
							label={'تکرار کلمه عبور'}
							type={'text'}
							formik={formik}
						/>
					</div>
					<Input
						name={'picture'}
						label={'عکس پروفایل'}
						type={'file'}
						formik={formik}
					/>
				</div>
				<NextPrev prevStep={prevStep}/>
			</form>
		</div>
	);
};

export default Step03;
