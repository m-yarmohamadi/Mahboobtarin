import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const SliderComponent = () => {
	const settings = {
		dots: false,
		infinite: true,
		speed: 500,
		slidesToShow: 2,
		slidesToScroll: 2,
		arrows: true,
		responsive: [
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1,
				},
			},
		],
	};

	return (
		<div className='w-full'>
			<Slider {...settings}>
				<div >
					<div className=' bg-red-400 w-full h-full'>222</div>
				</div>
				<div>
					<img src='/images/amazing.jpg' alt='Image 2' />
				</div>
				<div>
					<img src='/images/amazing.jpg' alt='Image 3' />
				</div>
				<div>
					<img src='/images/amazing.jpg' alt='Image 4' />
				</div>
				<div>
					<img src='/images/amazing.jpg' alt='Image 5' />
				</div>
				<div>
					<img src='/images/amazing.jpg' alt='Image 6' />
				</div>
				<div>
					<img src='/images/amazing.jpg' alt='Image 7' />
				</div>
				<div>
					<img src='/images/amazing.jpg' alt='Image 8' />
				</div>
				<div>
					<img src='/images/amazing.jpg' alt='Image 9' />
				</div>
				<div>
					<img src='/images/amazing.jpg' alt='Image 10' />
				</div>
			</Slider>
		</div>
	);
};

export default SliderComponent;
