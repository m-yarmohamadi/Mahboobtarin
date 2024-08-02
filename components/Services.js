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
			<div className='w-full container mx-auto  pt-12 px-0 '>
				<div className='w-full md:p-2 flex  justify-center items-center font-extrabold text-xl md:text-2xl'>چه خدماتی به شما ارائه می دهیم؟</div>
				<Swiper
					modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
					navigation={{
						nextEl: '.custom-button-next',
						prevEl: '.custom-button-prev',
					}}
					loop
					className={'px-4'}
					slidesPerView={1}
					spaceBetween={3}
					breakpoints={{
						480: {
							slidesPerView: 1,
							spaceBetween: 5,
						},
						640: {
							slidesPerView: 2,
							spaceBetween: 7,
						},
						768: {
							slidesPerView: 3,
							spaceBetween: 9,
						},
						1024: {
							slidesPerView: 4,
							spaceBetween: 11,
						},
						1280: {
							slidesPerView: 5,
							spaceBetween: 13,
						},
						1536: {
							slidesPerView: 6,
							spaceBetween: 15,
						},
					}}
					autoplay={{ delay: 7000 }}
					pagination={false}
					scrollbar={false}
					onSwiper={(swiper) => console.log(swiper)}
					onSlideChange={() => console.log('slide change')}>
					{data.map((item) => {
						return (
							<SwiperSlide
								key={item.id}
								className='flex items-center justify-center justify-items-center'>
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
								<span className='flex justify-center items-center font-semibold text-primary-01 hover:font-bold hover:contrast-50 hover:cursor-pointer'>{item.title}</span>
							</SwiperSlide>
						);
					})}
					<button className='custom-button-prev px-10   -left-3'>
						<FaChevronLeft />
					</button>
					<button className='custom-button-next   -right-3'>
						<FaChevronRight />
					</button>
				</Swiper>
			</div>
		</div>
	);
};

export default Services;
