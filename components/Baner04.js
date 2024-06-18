import React from 'react';

const Baner04 = () => {
	return (
		<div className='pb-16'>
			<div>
				<div className='w-full relative'>
					<img className='h-56 w-full object-cover' src='/images/Baner004.png' alt='' />
					<div className=' container w-full'>
						<div className='w-full h-full  absolute top-0 right-0 flex justify-between justify-items-center items-center'>
							<div className='  w-full text-white flex flex-col justify-center items-center gap-4'>
								<span className='text-3xl font-extrabold'>راه مهارت</span>
								<span className='text-xl font-bold'>5 تا 15 اردیبهشت ماه </span>
                                <button className=' bg-white text-primary-01 font-extrabold text-xl py-2 px-8 rounded-2xl' type="">مشاهده</button>
							</div>
							<div className='w-full'></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Baner04;
