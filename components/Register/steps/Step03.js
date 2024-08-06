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
import FormData from 'form-data';
import InputFileform from '@/tools/InputFileForm';
import toast from 'react-hot-toast';

const Step03 = ({ formik, children, error }) => {
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
									{formik.values.expertise.length > 2 ? (
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
									formikExpertise={formik}
								/>
							</div>
							<div className='w-full flex justify-start items-start'>{formik.errors.expertise && formik.touched.expertise && <p className='error_Message'>{enToFaNumber(`${formik.errors.expertise}`)}</p>}</div>
							{formik.values.expertise.map((item, index) => {
								const handleDeleteExpertise = (index) => {
									formik.setFieldValue("expertise", formik.values.expertise.filter((item, i) => i !== index));
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
									{formik.values.grade.length > 2 ? (
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
									formikGrade={formik}
								/>
							</div>
							<div className='w-full flex justify-start items-start'>{formik.errors.grade && formik.touched.grade && <p className='error_Message'>{enToFaNumber(`${formik.errors.grade}`)}</p>}</div>

							{formik.values.grade.map((item, index) => {
								const handleDeleteGrade = (index) => {
									formik.setFieldValue("grade", formik.values.grade.filter((item, i) => i !== index));
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
									{formik.values.language.length > 2 ? (
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
									formikLanguage={formik}
								/>
							</div>
							<div className='w-full flex justify-start items-start'>{formik.errors.language && formik.touched.language && <p className='error_Message'>{enToFaNumber(`${formik.errors.language}`)}</p>}</div>
							{formik.values.language.map((item, index) => {
								const handleDeleteLanguage = (index) => {
									formik.setFieldValue("language", formik.values.language.filter((item, i) => i !== index));
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

					<div className='grid grid-cols-1 md:grid-cols-3 gap-4 w-full items-start mt-7 '>
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

						<InputFileform
							onChange={(e)=>{
								const file = e.target.files[0];
								const maxFileSize = 2 * 1024 * 1024; // 2MB

								if (file && file.size > maxFileSize) {
									toast.error("حجم تصویر باید حداقل 2 مگابایت باشد")
									e.target.value = null;
								} else {
									formik.setFieldValue("picture", e.target.files[0]);
								}
							}}
							name={'picture'}
							label="تصویر پروفایل"
							type={'file'}
						/>
					</div>
				</div>
				<div>
					{children}
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
