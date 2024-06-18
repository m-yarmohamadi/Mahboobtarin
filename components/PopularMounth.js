import React from 'react';
import Slider from 'react-slick';

const PopularMounth = () => {
	var settings = {
		rtl: true,
		arrows: true,
		infinite: true,
		speed: 500,
		rows: 1,
		slidesToShow: 9,
		slidesToScroll: 1,
		responsive: [
			{
				breakpoint: 480, // تعیین اندازه SM
				settings: {
					slidesToShow: 1,
				},
			},
			{
				breakpoint: 768, // تعیین اندازه MD
				settings: {
					slidesToShow: 2,
				},
			},
			{
				breakpoint: 1024, // تعیین اندازه LG
				settings: {
					slidesToShow: 6,
				},
			},
		],
	};
	const data = [
		{
			id: 1,
			url: '/images/AliArdam.jpg',
			name: 'علی اردم',
			title: 'متخصص قلب',
		},
		{
			id: 2,
			url: '/images/Mansoor.zabetian.jpg',
			name: 'منصور ضابطیان',
			title: 'دندانپزشک',
		},
		{
			id: 3,
			url: '/images/SadeghAlHoseini.jpg',
			name: 'صادق الحسینی',
			title: 'وکیل پایه یک',
		},
		{
			id: 4,
			url: '/images/KavehBehbahani.jpg',
			name: 'کاوه بهبهانی',
			title: 'شاعر',
		},
		{
			id: 5,
			url: '/images/MahdiYazdaniKhoram.jpg',
			name: 'مهدی یزدانی خرم',
			title: 'بازیگر',
		},
		{
			id: 6,
			url: '/images/FaribaEghdami.webp',
			name: 'فریبا اقدامی',
			title: 'نویسنده',
		},
		{
			id: 7,
			url: '/images/MohsenPourramezani.webp',
			name: 'محسن پوررمضانی',
			title: 'طراح لباس',
		},
		{
			id: 8,
			url: '/images/MohammadFazeli.jpg',
			name: 'محمد فاضلی',
			title: 'کارآفرین',
		},
		{
			id: 9,
			url: '/images/NasimMarashi.jpg',
			name: 'نسیم مرعشی',
			title: 'طراح گریم',
		},
		{
			id: 10,
			url: '/images/FaribaEghdami.webp',
			name: 'فریبا اقدامی',
			title: 'نویسنده',
		},
		{
			id: 11,
			url: '/images/MohsenPourramezani.webp',
			name: 'محسن پوررمضانی',
			title: 'طراح لباس',
		},
		{
			id: 12,
			url: '/images/MohammadFazeli.jpg',
			name: 'محمد فاضلی',
			title: 'کارآفرین',
		},
		{
			id: 13,
			url: '/images/NasimMarashi.jpg',
			name: 'نسیم مرعشی',
			title: 'طراح گریم',
		},
	];

	return (
		<div className=' container pt-12 '>
			<div className='p-2 flex  justify-center items-center font-extrabold text-2xl'>محبوب ترین های ماه</div>
			<Slider
				{...settings}
				className='w-full  flex justify-between justify-items-center items-center my-4'>
				{data.map((item) => {
					return (
						<div
							key={item.id}
							className='w-full flex flex-col justify-center items-center'>
							<div className='w-full flex justify-center items-center justify-items-center'>
								<div className='m-1  rounded-full w-20 ring-2 ring-primary-01 ring-offset-2'>
									<img
										className='grayscale hover:grayscale-0  rounded-full'
										src={item.url}
										alt=''
									/>
								</div>
							</div>
							<span className='pt-2 flex justify-center items-center'>{item.name}</span>
							<span className='pb-2 flex justify-center items-center text-gray-400 text-sm'>{item.title}</span>
						</div>
					);
				})}
			</Slider>
		</div>
	);
};

export default PopularMounth;
