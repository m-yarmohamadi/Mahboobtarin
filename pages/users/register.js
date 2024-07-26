import React, { useState } from 'react';
import Footer from '@/components/Footer';
import Header from '@/components/Header';
import Step01 from '@/components/Register/steps/Step01';
import Step02 from '@/components/Register/steps/Step02';
import Step03 from '@/components/Register/steps/Step03';
import Step04 from '@/components/Register/steps/Step04';
import { useRouter } from 'next/router';
import Step05 from '@/components/Register/steps/Step05';


const register = () => {
	const router = useRouter();
const [nationalCode,setNationalCode]=useState()
	const [step, setStep] = useState(5);
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
	const endRegister = ()=>{
		router.push('/users/login')
	}
	return (
		<div className='w-full  max-w-full h-full max-h-full box-content pt-12'>
			<Header />
			<div className='  w-full h-full pb-8 '>
				<div className='w-full p-4 my-8 bg-primary-01 flex justify-center items-center text-white font-bold text-2xl '>ثبت نام متخصصین</div>
				<div className='container bg-white bg-opacity-70 border border-primary-01 px-4 md:px-16 py-4 rounded-md'>
					<div className='w-full flex justify-between items-center gap-4'>
						<div className={`w-full h-3 ${step > 0 ? `bg-primary-01` : `bg-gray-300`} shadow-md rounded-full`}></div>
						<div className={`w-full h-3 ${step > 1 ? `bg-primary-01` : `bg-gray-300`} shadow-md rounded-full`}></div>
						<div className={`w-full h-3 ${step > 2 ? `bg-primary-01` : `bg-gray-300`} shadow-md rounded-full`}></div>
						<div className={`w-full h-3 ${step > 3 ? `bg-primary-01` : `bg-gray-300`} shadow-md rounded-full`}></div>
						<div className={`w-full h-3 ${step > 4 ? `bg-primary-01` : `bg-gray-300`} shadow-md rounded-full`}></div>
					</div>
					<div className='pt-8 md:h-96 md:max-h-96'>
						{step === 1 && (
							<Step01
							setNationalCode={setNationalCode}
								nextStep={nextStep}
								prevStep={prevStep}
							/>
						)}
						{step === 2 && (
							<Step02
							nationalCode={nationalCode}
								nextStep={nextStep}
								prevStep={prevStep}
							/>
						)}
						{step === 3 && (
							<Step03
							nationalCode={nationalCode}

								nextStep={nextStep}
								prevStep={prevStep}
							/>
						)}
						{step === 4 && (
							<Step04
							nationalCode={nationalCode}

								nextStep={nextStep}
								prevStep={prevStep}
							/>
						)}
						{step === 5 && (
							<Step05
							nationalCode={nationalCode}

								nextStep={endRegister}
								prevStep={prevStep}
							/>
						)}
					</div>
				</div>
			</div>
			<Footer />
		</div>
	);
};

export default register;
