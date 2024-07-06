import Input from '@/tools/Input';
import Select from '@/tools/Select';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import NextPrev from '../NextPrev';
import { useState } from 'react';
import ExpertiseModal from './ExpertiseModal';
import GradeModal from './gradeModal';
import LanguageModal from './LanguageModal';

const Step04 = ({ nextStep, prevStep }) => {
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
	const [openExpertiseModal, setOpenExpertiseModal] = useState(false);
	const [openGradeModal, setOpenGradeModal] = useState(false);
	const [openLanguageModal, setOpenLanguageModal] = useState(false);

	return (
		<div className='w-full h-full flex flex-col justify-between'>
			<form
				onSubmit={formik.handleSubmit}
				className='w-full h-full flex flex-col justify-between '>
				<div className='w-full h-full flex flex-col justify-between'>
					<div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full h-full items-start justify-between '>
						<div className='w-full flex justify-between items-end border-b-2 border-primary-01 pb-2'>
							<div>تخصص</div>
							<div>
								<button
									onClick={() => setOpenExpertiseModal(!openExpertiseModal)}
									className='bg-primary-01 p-2 rounded-md text-white'
									type=''>
									افزودن
								</button>
							</div>
							<ExpertiseModal
								openExpertiseModal={openExpertiseModal}
								setOpenExpertiseModal={setOpenExpertiseModal}
							/>
						</div>
						<div className='w-full flex justify-between items-end border-b-2 border-primary-01 pb-2'>
							<div>مقطع تحصیلی</div>
							<div>
								<button
									onClick={() => setOpenGradeModal(!openGradeModal)}
									className='bg-primary-01 p-2 rounded-md text-white'
									type=''>
									افزودن
								</button>
							</div>
							<GradeModal
								openGradeModal={openGradeModal}
								setOpenGradeModal={setOpenGradeModal}
							/>
						</div>
						<div className='w-full flex justify-between items-end border-b-2 border-primary-01 pb-2'>
							<div>زبان و گویش</div>
							<div>
								<button
									onClick={() => setOpenLanguageModal(!openLanguageModal)}
									className='bg-primary-01 p-2 rounded-md text-white'
									type=''>
									افزودن
								</button>
							</div>
							<LanguageModal
								openLanguageModal={openLanguageModal}
								setOpenLanguageModal={setOpenLanguageModal}
							/>
						</div>
					</div>
					<div className='grid grid-cols-1 md:grid-cols-5 gap-4 w-full items-start '>
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

						<Input
							name={'picture'}
							label={'عکس پروفایل'}
							type={'file'}
							formik={formik}
						/>
					</div>
				</div>
				<div>
					<NextPrev prevStep={prevStep} />
				</div>
			</form>
		</div>
	);
};

export default Step04;
