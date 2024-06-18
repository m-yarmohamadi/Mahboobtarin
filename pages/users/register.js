import React, { useState } from 'react';
import * as Yup from 'yup';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Step01 from '@/components/steps/Step01';
import Step02 from '@/components/steps/Step02';
import Step03 from '@/components/steps/Step03';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';
import { useFormik } from 'formik';

const register = () => {
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
		email: Yup.string().required('تکمیل این گزینه اجباری است'),
	});

	const formik = useFormik({
		initialValues,
		onSubmit,
		validationSchema,
	});
	const [step, setStep] = useState(1);
	const nextStep = () => {
		if (step < 4) {
			formik.handleSubmit();
			const newStep = step + 1;
			setStep(newStep);
		}
	};
	const prevStep = () => {
		if (step > 1) {
			const newStep = step - 1;
			setStep(newStep);
		}
	};
	return (
		<div>
			<Header />
			<div className='  w-full h-full pb-8 '>
				<div className='w-full p-4 my-8 bg-primary-01 flex justify-center items-center text-white font-bold text-2xl '>ثبت نام متخصصین</div>
				<div className='container bg-white bg-opacity-70 border border-primary-01 px-4 md:px-16 py-4 rounded-md'>
					<div className='w-full flex justify-between items-center gap-4'>
						<div className={`w-full h-3 ${step > 0 ? `bg-primary-01` : `bg-gray-300`} shadow-md rounded-full`}></div>
						<div className={`w-full h-3 ${step > 1 ? `bg-primary-01` : `bg-gray-300`} shadow-md rounded-full`}></div>
						<div className={`w-full h-3 ${step > 2 ? `bg-primary-01` : `bg-gray-300`} shadow-md rounded-full`}></div>
						<div className={`w-full h-3 ${step > 3 ? `bg-primary-01` : `bg-gray-300`} shadow-md rounded-full`}></div>
					</div>
					<div className='py-8 md:h-96 md:max-h-96'>
						{step === 1 && <Step01 formik={formik} />}
						{step === 2 && <Step01 formik={formik} />}
						{step === 3 && <Step01 formik={formik} />}
						{step === 4 && <Step01 formik={formik} />}
					</div>
					<div className='flex justify-between items-center '>
						<div
							onClick={prevStep}
							className='px-4 py-2 bg-primary-01 flex justify-between items-center gap-4 cursor-pointer hover:shadow-md hover:bg-opacity-85 font-semibold text-xl text-white rounded-md'>
							<span>
								<FaArrowAltCircleRight />
							</span>

							<span>مرحله قبل</span>
						</div>
						<div
							onClick={nextStep}
							className='px-4 py-2 bg-primary-01 flex justify-between items-center gap-4 cursor-pointer hover:shadow-md hover:bg-opacity-85 font-semibold text-xl text-white rounded-md'>
							<span>مرحله بعد</span>
							<span>
								<FaArrowAltCircleLeft />
							</span>
						</div>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default register;
