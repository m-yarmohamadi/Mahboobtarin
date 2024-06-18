import React from 'react';
import { AiFillAccountBook } from 'react-icons/ai';
import Slider from 'react-slick';

const Services = () => {
	var settings = {
		rtl: true,
		arrows: true,
		infinite: true,
		speed: 500,
		slidesToShow: 5,
		rows: 1,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 720, // تعیین اندازه SM
				settings: {
					slidesToShow: 1,
				},
			},
		],

	};
	const data = [
		{
			id: 1,
			url: '/images/OnlineCounseling.png',
			title: 'مشاوره آنلاین',
		},
		{
			id: 2,
			url: '/images/OnlineReservation.png',
			title: 'نوبت دهی آنلاین',
		},
		{
			id: 3,
			url: '/images/Education.webp',
			title: 'آموزش',
		},
		{
			id: 4,
			url: '/images/HomeService.png',
			title: 'کار در منزل',
		},
		{
			id: 5,
			url: '/images/OnlineShop.png',
			title: 'فروشگاه آنلاین',
		},
		{
			id: 6,
			url: '/images/OnlineCounseling.png',
			title: 'مشاوره آنلاین',
		},
		{
			id: 7,
			url: '/images/OnlineReservation.png',
			title: 'نوبت دهی آنلاین',
		},
	];

	return (
		<div>
			<div className=' container mx-auto  pt-12 '>
				<div className='w-full md:p-2 flex  justify-center items-center font-extrabold text-xl md:text-2xl'>
					چه خدماتی به شما ارائه می دهیم؟
				</div>
				<Slider {...settings} className='flex items-center'>
					{data.map((item) => {
						return (
							<div
								key={item.id}
								className='flex items-center justify-center justify-items-center'
							>
								<div className='w-full flex justify-center justify-items-center items-center'>
									<div className='h-52 w-52    m-4 rounded-2xl shadow-md bg-white p-2 z-0'>
										<div className='relative h-40 w-40 flex justify-center items-center m-4'>
											<div className=' hover:cursor-pointer w-full h-full absolute top-0 left-0 border-4 border-dashed border-primary-01 border-opacity-35   rounded-full  z-10'>
												<img
													className='h-full w-full hover:contrast-50'
													src={item.url}
													alt=''
												/>
											</div>
										</div>
									</div>
								</div>
								<span className='flex justify-center items-center font-semibold text-primary-01 hover:font-bold hover:contrast-50 hover:cursor-pointer'>
									{item.title}
								</span>
							</div>
						);
					})}
				</Slider>
			</div>
		</div>
	);
};

export default Services;
