import React from 'react';
import Header from '../Header';

const RegisterType = ({ setUserType }) => {
	return (
		<>
			<Header />
			<div>
				<div className='w-full mt-20'>
					<div className='py-4 flex justify-center items-center w-full'>
						<span className='font-semibold text-primary-01'>لطفاٌ بر اساس نیاز خود یکی از مدلهای زیر را انتخاب کنید:</span>
					</div>
					<div className='w-1/2 max-w-md mx-auto flex flex-col justify-center items-center gap-4'>
						<button
							onClick={() => setUserType('user')}
							className='btn btn--primary flex-1 w-full'>
							ثبت‌نام کاربران
						</button>
						<button
							onClick={() => setUserType('expert')}
							className='btn btn--primary flex-1 w-full'>
							ثبت‌نام متخصصین
						</button>
					</div>
				</div>
			</div>
		</>
	);
};

export default RegisterType;
