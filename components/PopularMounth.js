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
			url: '/images/PopularMounth/a.farhadi.jpg',
			name: 'اصغر فرهادی',
			title: 'کارگردان',
		},
		{
			id: 2,
			url: '/images/PopularMounth/f-moghimi.jpg',
			name: 'فاطمه مقیمی',
			title: 'کارآفرین',
		},
		{
			id: 3,
			url: '/images/PopularMounth/l-hatami.jpg',
			name: 'لیلا حاتمی',
			title: 'بازیگر',
		},
		{
			id: 4,
			url: '/images/PopularMounth/m-farshchian.jpg',
			name: 'محمود فرشچیان',
			title: 'نقاش',
		},
		{
			id: 5,
			url: '/images/PopularMounth/m-samiee.jpg',
			name: 'دکتر مجید سمیعی',
			title: 'متخصص مغز و اعصاب',
		},
		{
			id: 6,
			url: '/images/PopularMounth/m-taremi.jpg',
			name: 'مهدی طارمی',
			title: 'فوتبالیست',
		},
		{
			id: 7,
			url: '/images/PopularMounth/s-aghili.jpg',
			name: 'سالار عقیلی',
			title: 'خواننده',
		},
		{
			id: 8,
			url: '/images/PopularMounth/sh-hoseyni.jpg',
			name: 'شهاب حسینی',
			title: 'بازیگر',
		},
		{
			id: 9,
			url: '/images/PopularMounth/z-nemati.jpg',
			name: 'زهرا نعمتی',
			title: 'ورزشکار تیراندازی',
		},
		{
			id: 10,
			url: '/images/PopularMounth/a.farhadi.jpg',
			name: 'اصغر فرهادی',
			title: 'کارگردان',
		},
		{
			id: 11,
			url: '/images/PopularMounth/f-moghimi.jpg',
			name: 'فاطمه مقیمی',
			title: 'کارآفرین',
		},
		{
			id: 12,
			url: '/images/PopularMounth/l-hatami.jpg',
			name: 'لیلا حاتمی',
			title: 'بازیگر',
		},
		{
			id: 13,
			url: '/images/PopularMounth/m-farshchian.jpg',
			name: 'محمود فرشچیان',
			title: 'نقاش',
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
