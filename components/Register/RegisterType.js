import React from 'react';
import Header from '../Header';

const RegisterType = ({setUserType}) => {
	return (
		<>
		<Header />
		<div>
			<div className='w-full mt-20'>
				<div className='py-4 flex justify-center items-center w-full'>
					<span className='font-semibold text-primary-01'>لطفاٌ بر اساس نیاز خود یکی از مدلهای زیر را انتخاب کنید:</span>
				</div>
				<div className='w-full max-w-md mx-auto flex justify-center items-center gap-4'>
                	<button onClick={()=>setUserType("expert")} className='btn btn--primary flex-1'>
						ثبت نام متخصصین
					</button>
					<button onClick={()=>setUserType("user")} className='btn btn--primary flex-1'>
						ثبت نام کاربران
					</button>
				</div>
			</div>
		</div>
		</>
	);
};

export default RegisterType;
