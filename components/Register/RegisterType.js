import React from 'react';
import Header from '../Header';
import Footer from '../Footer';
import Link from 'next/link';

const RegisterType = () => {
	return (
		<div>
			<div className='w-full mt-20'>
				<div className='py-4 flex justify-center items-center w-full'>
					<span className='font-bold text-primary-01'>لطفاٌ بر اساس نیاز خود یکی از مدلهای زیر را انتخاب کنید:</span>
				</div>
				<div className='w-full flex justify-center items-center gap-10'>
                <Link
						href={{
							pathname: '/users/register',
							query: { type: 'expert' },
						}}>
						<div className='bg-primary-01 shadow-md hover:bg-opacity-90 text-white font-bold px-4 py-2 rounded-md'>ثبت نام متخصصین</div>
					</Link>
					<Link
						href={{ 
							pathname: '/users/register',
							query: { type: 'user' },
						}}>
						<div className='bg-primary-01 shadow-md hover:bg-opacity-90 text-white font-bold px-4 py-2 rounded-md'>ثبت نام کاربران</div>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default RegisterType;
