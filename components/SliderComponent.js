import React from 'react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import useMainPage from '@/hooks/useMainPage';

const modules = [Navigation, Pagination, Scrollbar, A11y];
const SliderComponent = ({sliderImg, slidesPerView ,width,heigth }) => {
	const {isLoading,sliders} = useMainPage();
	return (
		<Swiper
			modules={modules}
			spaceBetween={60}
            navigation
            loop
			slidesPerView={slidesPerView}
            autoplay
			pagination={{ clickable: true }}
			scrollbar={{ draggable: true }}
			onSwiper={(swiper) => console.log(swiper)}
			onSlideChange={() => console.log('slide change')}>
			{!isLoading && sliders.map((item,index) => {
				return (
					<SwiperSlide key={index}>
						<img
							className={`${width} ${heigth} object-cover`}
							src={item.photo?.path}
							alt={item.title}
						/>
					</SwiperSlide>
				);
			})}
		</Swiper>
	);
};

export default SliderComponent;
