import Input from '@/tools/Input';
import Select from '@/tools/Select';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import NextPrev from '../NextPrev';
import { useState } from 'react';
import ExpertiseModal from './ExpertiseModal';
import GradeModal from './GradeModal';
import LanguageModal from './LanguageModal';
import { enToFaNumber } from '@/utils/enToFa';
import { FaDeleteLeft } from 'react-icons/fa6';
import { MdDelete, MdDeleteOutline } from 'react-icons/md';
import { AiTwotoneDelete } from 'react-icons/ai';

const Step04 = ({ nextStep, prevStep }) => {
	const [expertise, setExpertise] = useState([]);
	const [grade, setGrade] = useState([]);
	const [language, setLanguage] = useState([]);
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
		setOpenExpertiseModal(false);
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
						<div>
							<div className='w-full flex justify-between items-end border-b-2 border-primary-01 pb-2'>
								<div className='font-bold'>تخصص</div>
								<div>
									{expertise.length > 2 ? (
										<button
											disabled
											className='bg-primary-02 shadow-md p-2 rounded-md text-primary-04 text-xs'
											type=''>
											{enToFaNumber('امکان درج بیش از 3 گزینه وجود ندارد')}
										</button>
									) : (
										<button
											onClick={() => setOpenExpertiseModal(!openExpertiseModal)}
											className='bg-primary-01 p-2 rounded-md text-white text-xs font-bold'
											type=''>
											افزودن
										</button>
									)}
								</div>
								<ExpertiseModal
									openExpertiseModal={openExpertiseModal}
									setOpenExpertiseModal={setOpenExpertiseModal}
									setExpertise={setExpertise}
									expertise={expertise}
								/>
							</div>
							{expertise.map((item, index) => {
								const handleDeleteExpertise = (index) => {
									setExpertise((prevExpertise) => prevExpertise.filter((item, i) => i !== index));
								};

								return (
									<div
										key={index}
										className='flex justify-between items-center bg-primary-01 bg-opacity-10 px-4'>
										<div>{item.expertise}</div>
										<div className='flex justify-center items-center gap-2 '>
											<span className='flex justify-center items-center pt-2'>{item.expertiseName}</span>
											<span
												onClick={() => handleDeleteExpertise(index)}
												className='text-error flex justify-center items-center text-xl'>
												<AiTwotoneDelete />
											</span>
										</div>
									</div>
								);
							})}
						</div>

						<div>
							<div className='w-full flex justify-between items-end border-b-2 border-primary-01 pb-2'>
								<div className='font-bold'>مقطع تحصیلی</div>
								<div>
									{grade.length > 2 ? (
										<button
											disabled
											className='bg-primary-02 shadow-md p-2 rounded-md text-primary-04 text-xs'
											type=''>
											{enToFaNumber('امکان درج بیش از 3 گزینه وجود ندارد')}
										</button>
									) : (
										<button
											onClick={() => setOpenGradeModal(!openGradeModal)}
											className='bg-primary-01 p-2 rounded-md text-white text-xs font-bold'
											type=''>
											افزودن
										</button>
									)}
								</div>
								<GradeModal
									openGradeModal={openGradeModal}
									setOpenGradeModal={setOpenGradeModal}
									setGrade={setGrade}
									grade={grade}
								/>
							</div>
							{grade.map((item, index) => {
								const handleDeleteGrade = (index) => {
									setGrade((prevGrade) => prevGrade.filter((item, i) => i !== index));
								};
								return (
									<div
										key={index}
										className='flex justify-between items-center bg-primary-01 bg-opacity-10 px-4'>
										<div>{item.grade}</div>
										<div className='flex justify-center items-center gap-2 '>
											<span className='flex justify-center items-center pt-2'>{item.educationPlace}</span>
											<span
												onClick={() => handleDeleteGrade(index)}
												className='text-error flex justify-center items-center text-xl'>
												<AiTwotoneDelete />
											</span>
										</div>
									</div>
								);
							})}
						</div>

						<div>
							<div className='w-full flex justify-between items-end border-b-2 border-primary-01 pb-2'>
								<div className='font-bold'>زبان و گویش</div>
								<div>
									{language.length > 2 ? (
										<button
											disabled
											className='bg-primary-02 shadow-md p-2 rounded-md text-primary-04 text-xs'
											type=''>
											{enToFaNumber('امکان درج بیش از 3 گزینه وجود ندارد')}
										</button>
									) : (
										<button
											onClick={() => setOpenLanguageModal(!openLanguageModal)}
											className='bg-primary-01 p-2 rounded-md text-white text-xs font-bold'
											type=''>
											افزودن
										</button>
									)}
								</div>
								<LanguageModal
									openLanguageModal={openLanguageModal}
									setOpenLanguageModal={setOpenLanguageModal}
									setLanguage={setLanguage}
									language={language}
								/>
							</div>
							{language.map((item, index) => {
								const handleDeleteLanguage = (index) => {
									setLanguage((prevLanguage) => prevLanguage.filter((item, i) => i !== index));
								};

								return (
									<div
										key={index}
										className='flex justify-between items-center bg-primary-01 bg-opacity-10 px-4'>
										<div>{item.language}</div>
										<div className='flex justify-center items-center gap-2 '>
											<span className='flex justify-center items-center pt-2'>{item.proficiency}</span>
											<span
												onClick={() => handleDeleteLanguage(index)}
												className='text-error flex justify-center items-center text-xl'>
												<AiTwotoneDelete />
											</span>
										</div>
									</div>
								);
							})}
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
