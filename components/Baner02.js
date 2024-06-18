import React from 'react';

const Baner02 = () => {
	return (
		<div>
			<div className='py-24'>
				<div className='w-full relative '>
					<img
						className='w-full h-72 object-cover object-top'
						src='/images/Baner002.png'
						alt=''
					/>

					<div className='  absolute top-0 right-0 z-10 w-full h-full '>
						<div className=' md:container px-8 md:px-0 flex justify-between items-center gap-16 md:gap-32 w-full h-full'>
							<div className='w-full flex justify-center items-center '>
								<div className='w-full '>
									<div className='flex justify-center items-center gap-2 text-primary-02 md:text-gray-800'>
										<div className=' w-full md:w-1/2 flex flex-col justify-center items-start'>
											<span className='text-2xl font-bold'>به هوای بهار</span>
											<span className='text-lg font-medium'>
												جدیدترین های تیشرت
											</span>
											<span className='text-lg font-medium'>
												پلوشرت و پیراهن مردانه
											</span>
											<button className='border border-primary-02 md:border-0 bg-primary-01 text-white font-bold py-1 px-8 rounded-lg shadow-md'>
												خــرید
											</button>
										</div>
									</div>
								</div>
							</div>
							<div className=' w-full  flex justify-center items-center text-4xl font-extrabold text-primary-01 md:text-white '>
								<div className='w-1/2 flex flex-col justify-center items-end'>
									<span>MEN`S</span>
									<span className='w-full flex justify-end items-center'>
										<hr className='w-1/6  border-2 border-blue-400 ' />
										<hr className='w-1/12  border-2 border-blue-900 ' />
									</span>

									<span className='pt-2 text-wrap'>SPRING</span>
									<span className='text-2xl font-thin'>FASHION</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Baner02;
