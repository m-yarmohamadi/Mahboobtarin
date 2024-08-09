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
const sliderImg = [
	{
		id: 1,
		url: 'images/Baner002.png',
		title: 'baner01',
	},
	{
		id: 1,
		url: 'images/Baner002.png',
		title: 'baner02',
	},
	{
		id: 1,
		url: 'images/Baner002.png',
		title: 'baner03',
	},
	{
		id: 1,
		url: 'images/Baner002.png',
		title: 'baner04',
	},
];
const Baner02 = () => {
	const swiperRef = useRef(null);
	return (
		<div className='py-24'>
			<Swiper
				modules={[Navigation, Pagination, Scrollbar, A11y, Autoplay]}
				spaceBetween={60}
                        navigation={{
                            nextEl: '.custom-button-next',
                            prevEl: '.custom-button-prev',
                        }}
				loop
				slidesPerView={1}
				autoplay={{ delay: 4000 }}
				pagination={{ clickable: true }}
				scrollbar={{ draggable: true }}
				>
				{sliderImg.map((item, index) => {
					return (
						<SwiperSlide key={index}>
							<div className='w-full relative '>
								<img
									className='w-full h-72 object-cover object-top'
									src={item.url}
									alt={item.title}
								/>

								<div className='  absolute top-0 right-0 z-10 w-full h-full '>
									<div className='  px-8 md:px-0 flex justify-between items-center gap-16 md:gap-32 w-full h-full'>
										<div className='w-full flex justify-center items-center '>
											<div className='w-full '>
												<div className=' hidden md:flex justify-center items-center gap-2 text-primary-02 md:text-gray-800'>
													<div className=' w-full md:w-1/2 flex flex-col justify-center items-start'>
														<span className='text-2xl font-bold'>به هوای بهار</span>
														<span className='text-lg font-medium'>جدیدترین های تیشرت</span>
														<span className='text-lg font-medium'>پلوشرت و پیراهن مردانه</span>
														<button className='border border-primary-02 md:border-0 bg-primary-01 text-white font-bold py-1 px-8 rounded-lg shadow-md'>خــرید</button>
													</div>
												</div>
											</div>
										</div>
										<div className=' w-full hidden md:flex justify-center items-center text-4xl font-extrabold text-primary-01 md:text-white '>
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
							<button className='custom-button-prev   hover:cursor-pointer left-3'>
								<FaChevronLeft />
							</button>
							<button className='custom-button-next   hover:cursor-pointer right-3'>
								<FaChevronRight />
							</button>
						</SwiperSlide>
					);
				})}
			</Swiper>
		</div>
	);
};

export default Baner02;
