import React from 'react';

const News = () => {
	return (
		<div className=' bg-white py-16'>
			<div className='md:container px-8 md:px-0 grid sm:grid-cols-1 lg:grid-cols-2 md:gap-x-20 '>
				<div>
					<button
						className='py-2 px-8 bg-primary-01 text-white text-xl font-bold rounded-lg'
						type=''
					>
						مجله محبوب ترین
					</button>
					<div className='  font-semibold text-2xl py-8'>
						<p className=' text-justify border-r-8 border-primary-01 p-2'>
							جــدیدترین عــلائم کـرونا با شیـوع سویه های جدید BQ1 و SBB
						</p>
					</div>
					<div className='py-8'>
						<p className=' text-justify text-lg'>
							امیکرون نام سویه جدید از ویروس کرونا است که برای اولین بار در آفریقای
							جنوبی کشف شد و به سرعت در سراسر جهان گسترش پیدا کرد. اصلی ترین علائم
							کرونا امیکرون عبارتند از بدن درد، عطسه، آبریزش بینی، خارش گلو و خستگی.
							نکته مهم در مورد امیکرون، مدت زمانی است که این ویروس فرد را درگیر می
							کند.
							<span className=' text-primary-01 cursor-pointer'>ادامه مطلب...</span>
						</p>
					</div>
				</div>
				<div>
					<img className='w-full rounded-xl lg:rounded-s-none lg:rounded-ee-none lg:rounded-se-3xl' src='/images/omicron.png' alt='' />
				</div>
			</div>
			<div className=' md:container px-8 md:px-0 pt-16'>
				<div className='grid xs:grid-cols-2 md:grid-cols-4 gap-4'>
					<div className='w-full '>
						<img className=' shadow-md shadow-primary-01 rounded-ss-3xl' src="/images/liraglotide.webp" alt=""/>
						<div className=' shadow-md flex flex-col justify-center items-start p-2 border-r-8 border-primary-01'>
							<span className=' font-bold'>خرید ویکتوزا (لیراگلوتاید)</span>
							<span>کاربرد در کاهش وزن</span>
							 
						</div>
					</div>
					<div className='w-full '>
						<img className=' shadow-md shadow-primary-01 rounded-se-3xl' src="/images/gardasil.jpg" alt=""/>
						<div className='shadow-md flex flex-col justify-center items-start p-2 border-r-8 border-primary-01'>
							<span className=' font-bold'>خرید ویکتوزا (لیراگلوتاید)</span>
							<span>کاربرد در کاهش وزن</span>
							 
						</div>
					</div>
					<div className='w-full '>
						<img className=' shadow-md shadow-primary-01 rounded-ss-3xl' src="/images/Dandan.jpg" alt=""/>
						<div className='shadow-md flex flex-col justify-center items-start p-2 border-r-8 border-primary-01'>
							<span className=' font-bold'>خرید ویکتوزا (لیراگلوتاید)</span>
							<span>کاربرد در کاهش وزن</span>
							 
						</div>
					</div>
					<div className='w-full '>
						<img className=' shadow-md shadow-primary-01 rounded-se-3xl' src="/images/baby.jpg" alt=""/>
						<div className='shadow-md flex flex-col justify-center items-start p-2 border-r-8 border-primary-01'>
							<span className=' font-bold'>خرید ویکتوزا (لیراگلوتاید)</span>
							<span>کاربرد در کاهش وزن</span>
							 
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};

export default News;
