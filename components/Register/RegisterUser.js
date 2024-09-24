import React, { useState } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import { useRouter } from 'next/router';
import Head from 'next/head';
import UserStep from './steps/UserStep';

const RegisterUser = ({mobile, otp}) => {
	const router = useRouter();
	const [nationalCode, setNationalCode] = useState();
	const [step, setStep] = useState(1);

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
		<div className='w-full flex flex-col gap-7'>
			<Head>
				<title>{`${process.env.NEXT_PUBLIC_SITE_NAME} |   ثبت نام کاربران`}</title>
			</Head>
			<Header />
			<div className='w-full max-w-screen-lg mx-auto bg-white rounded-lg shadow-sm p-6'>
				<h1 className='text-xl font-semibold text-slate-800 text-center pb-4 mb-4 border-b border-slate-300'>
					ثبت نام کاربران
				</h1>

				<div className=''>
					<div className=''>
						<UserStep
							setNationalCode={setNationalCode}
							nextStep={nextStep}
							prevStep={prevStep}
							mobile={mobile}
							otp={otp}
						/>
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default RegisterUser;
