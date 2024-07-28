import React, { useState } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useRouter } from 'next/router';
import Head from 'next/head';
import UserStep from './steps/UserStep';

const RegisterUser = () => {
	const router = useRouter();
	const [nationalCode, setNationalCode] = useState();
	const [step, setStep] = useState(1);
	console.log(step);

	const nextStep = () => {
		if (step < 5) {
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
	const endRegister = () => {
		router.push('/users/login');
	};

	return (
		<div className='w-full  max-w-full h-full max-h-full box-content'>
			<Head>
				<title>{`${process.env.NEXT_PUBLIC_SITE_NAME} |   ثبت نام کاربران`}</title>
			</Head>
			<Header />
			<div className='  w-full h-full pb-8 '>
				<div className='w-full p-4 my-8 bg-primary-01 flex justify-center items-center text-white font-bold text-2xl '>ثبت نام کاربران</div>
				<div className='container bg-white bg-opacity-70 border border-primary-01 px-4 md:px-16 py-4 rounded-md'>
					<div className='pt-8 md:h-96 md:max-h-96'>
						<UserStep
							setNationalCode={setNationalCode}
							nextStep={nextStep}
							prevStep={prevStep}
						/>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default RegisterUser;
