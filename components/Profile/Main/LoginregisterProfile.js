import Link from 'next/link';
import React from 'react';

const LoginregisterProfile = () => {
	return (
		<div className='w-full grid md:grid-cols-2 gap-4 md:gap-16 justify-center items-center container box-content  my-16'>
			<div className=' w-full '>
				<div className='md:h-64 w-full flex flex-col justify-center items-start gap-8 bg-primary-01 bg-opacity-30 px-12 py-6 rounded-xl'>
					<span className='text-primary-01 font-bold text-lg'>کاربر هستید؟</span>
					<p className='text-justify'>شما با عضویت در سامانه محبوب‌ترین ضمن آشنایی با برترین‌های حوزه های مختلف، از دریافت خدمات آنلاین و حضوری آنان بهره و لذت ببرید.</p>
					<Link
						href={{
							pathname: '/users/register',
							query: { type: 'user' },
						}}>
						<button className='bg-primary-01 px-8 py-2 rounded-md text-white font-bold'>ثبت‌نام کاربران</button>
					</Link>
				</div>
			</div>
			<div className=' w-full '>
				<div className='md:h-64 w-full flex flex-col justify-center items-end gap-8 bg-primary-01 bg-opacity-30 px-12 py-6 rounded-xl'>
					<span className='text-primary-01 font-bold text-lg'>متخصص هستید؟</span>
					<p className='text-justify'>شما با عضویت در بخش متخصصین سامانه محبوب‌ترین ضمن معرفی دقیق و ماندگار خود جهت تکمیل دانشنامه، درگاه ارتباطی خود با مردم را افتتاح نمایید. .</p>
					<Link
						href={{
							pathname: '/users/register',
							query: { type: 'expert' },
						}}>
						<button className='bg-primary-01 px-8 py-2 rounded-md text-white font-bold'>ثبت‌نام متخصصین</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default LoginregisterProfile;
