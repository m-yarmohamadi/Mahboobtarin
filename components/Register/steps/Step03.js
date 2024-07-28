import Input from '@/tools/Input';
import axios from 'axios';

import * as Yup from 'yup';
import { useFormik } from 'formik';
import NextPrev from '../NextPrev';
import { useState } from 'react';
import ExpertiseModal from './ExpertiseModal';
import GradeModal from './GradeModal';
import LanguageModal from './LanguageModal';
import { enToFaNumber } from '@/utils/enToFa';
import { AiTwotoneDelete } from 'react-icons/ai';

const Step03 = ({ nextStep, prevStep, nationalCode }) => {
	const [error, setError] = useState([]);
	const [loading, setLoading] = useState(0);

	const [expertise, setExpertise] = useState([]);
	const [grade, setGrade] = useState([]);
	const [language, setLanguage] = useState([]);
	const initialValues = {
		expertise,
		grade,
		language,
		password: '',
		confirmPassword: '',
		picture: '',
	};
	const onSubmit = async (values) => {
		setLoading(1);
		try {
			const response = await axios.post(`https://mahboobtarin.mostafaomrani.ir/api/v1/register`, {
				...values,
				national_code: nationalCode,
				expertise,
				grade,
				language,
				step: '3',
				type: 'expert',
			});
			console.log(response.data);
			setLoading(0);
			nextStep();
		} catch (error) {
			console.log(error);
			setLoading(0);
			setError(error.response.data.message);
		}
	};
	const validationSchema = Yup.object({
		expertise: Yup.array().min(1, 'وارد کردن تخصص اجباری است'),
		grade: Yup.array().min(1, 'وارد کردن مقطع تحصیلی اجباری است'),
		language: Yup.array().min(1, 'وارد کردن زبان و گویش اجباری است'),
		password: Yup.string().required('وارد کردن کلمه عبور اجباری است').min(6, 'حداقل 6 حرف وارد کنید').max(11, 'حداکثر 11 حرف وارد کنید'),
		confirmPassword: Yup.string()
			.required('وارد کردن تکرار کلمه عبور اجباری است')
			.oneOf([Yup.ref('password'), null], 'کلمه عبور و تکرار آن باید یکسان باشند '),

		picture: Yup.string(),
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
							<div className='w-full flex justify-start items-start'>{formik.errors.expertise && formik.touched.expertise && <p className='error_Message'>{enToFaNumber(`${formik.errors.expertise}`)}</p>}</div>
							{expertise.map((item, index) => {
								const handleDeleteExpertise = (index) => {
									setExpertise((prevExpertise) => prevExpertise.filter((item, i) => i !== index));
								};

								return (
									<div
										key={index}
										className='flex justify-between items-center bg-primary-01 bg-opacity-10 px-4'>
										<div>{item.title}</div>
										<div className='flex justify-center items-center gap-2 '>
											<span className='flex justify-center items-center pt-2'>{item.subject}</span>
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
							<div className='w-full flex justify-start items-start'>{formik.errors.grade && formik.touched.grade && <p className='error_Message'>{enToFaNumber(`${formik.errors.grade}`)}</p>}</div>

							{grade.map((item, index) => {
								const handleDeleteGrade = (index) => {
									setGrade((prevGrade) => prevGrade.filter((item, i) => i !== index));
								};
								return (
									<div
										key={index}
										className='flex justify-between items-center bg-primary-01 bg-opacity-10 px-4'>
										<div>{item.title}</div>
										<div className='flex justify-center items-center gap-2 '>
											<span className='flex justify-center items-center pt-2'>{item.subject}</span>
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
							<div className='w-full flex justify-start items-start'>{formik.errors.language && formik.touched.language && <p className='error_Message'>{enToFaNumber(`${formik.errors.language}`)}</p>}</div>
							{language.map((item, index) => {
								const handleDeleteLanguage = (index) => {
									setLanguage((prevLanguage) => prevLanguage.filter((item, i) => i !== index));
								};

								return (
									<div
										key={index}
										className='flex justify-between items-center bg-primary-01 bg-opacity-10 px-4'>
										<div>{item.title}</div>
										<div className='flex justify-center items-center gap-2 '>
											<span className='flex justify-center items-center pt-2'>{item.subject}</span>
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

					<div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full items-start '>
						<Input
							name={'password'}
							label={'کلمه عبور'}
							type={'password'}
							formik={formik}
						/>
						<Input
							name={'confirmPassword'}
							label={'تکرار کلمه عبور'}
							type={'password'}
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
					<NextPrev
						prevStep={prevStep}
						loading={loading}
						step={3}
					/>
				</div>
			</form>
			{error &&
				error.map((item, index) => {
					return <div key={index}>{item}</div>;
				})}
		</div>
	);
};

export default Step03;
