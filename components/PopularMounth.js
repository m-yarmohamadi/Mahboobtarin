import React, { useRef } from 'react';
import { Navigation, Pagination, Scrollbar, A11y, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/swiper-bundle.css';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const PopularMounth = () => {
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
		<div className='w-full container mx-auto pt-12 '>
			<div className='w-full px-2 py-4 flex  justify-center items-center justify-items-center font-extrabold text-2xl'>محبوب ترین های ماه</div>
			<Swiper
				modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
				navigation={{
					nextEl: '.custom-button-next',
					prevEl: '.custom-button-prev',
				}}
				loop
				slidesPerView={1}
				spaceBetween={3}

				breakpoints={{
					480: {
						slidesPerView: 2,
						spaceBetween: 5,
					},
					640: {
						slidesPerView: 3,
						spaceBetween: 10,
					},
					768: {
						slidesPerView: 4,
						spaceBetween: 10,
					},
					1024: {
						slidesPerView: 6,
						spaceBetween: 15,
					},
					1280: {
						slidesPerView: 7,
						spaceBetween: 15,
					},
					1536: {
						slidesPerView: 8,
						spaceBetween: 20,
					},
				}}
				autoplay={{ delay: 4000 }}
				pagination={false}
				scrollbar={false}
				>
				{data.map((item) => {
					return (
						<SwiperSlide
							key={item.id}
							className='w-full flex flex-col justify-center items-center justify-items-center text-center'>
							<div className='w-full flex justify-center items-center justify-items-center text-center px-5'>
								<div className='my-1  rounded-full w-20 ring-2 ring-primary-01 ring-offset-2'>
									<img
										className='grayscale hover:grayscale-0  rounded-full'
										src={item.url}
										alt=''
									/>
								</div>
							</div>
							<span className='pt-2 flex justify-center items-center'>{item.name}</span>
							<span className='pb-2 flex justify-center items-center text-gray-400 text-sm'>{item.title}</span>
						</SwiperSlide>
					);
				})}

				<button className='custom-button-prev   -left-3'> 
					<FaChevronLeft />
				</button>
				<button className='custom-button-next   -right-3'>
					<FaChevronRight />
				</button>
			</Swiper>

		</div>
	);
};

export default PopularMounth;
