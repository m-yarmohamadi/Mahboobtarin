import React from 'react';

const Baner03 = () => {
	return (
		<div className='py-16'>
			<div>
				<div className='w-full relative'>
					<img className='h-56 w-full object-cover' src='/images/Baner003.png' alt='' />
					<div className=' container w-full'>
						<div className='w-full h-full  absolute top-0 right-0 flex justify-between justify-items-center items-center'>
							<div className='ps-8 md:ps-0 w-full text-white flex flex-col justify-center items-center gap-4'>
								<span className='text-2xl md:text-4xl font-extrabold'>روانشناسی برای همه !</span>
								<span className=' px-8 md:px-0 text-xl md:text-2xl font-bold'>خدمات روانشناسی با تعرفه های به صرفه </span>
                                <button className=' bg-white text-primary-01 font-extrabold  text-2xl md:text-3xl py-2 px-8 rounded-2xl hover:shadow-md hover:opacity-80' type="">شروع مشاوره</button>
							</div>
							<div className='w-full'></div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Baner03;
