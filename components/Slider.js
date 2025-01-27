import React from 'react';
import { BiFilter, BiSearch, BiSlider, BiSolidDiscount } from 'react-icons/bi';
import SearchBox from './search&filter/SearchBox';

const Slider = () => {
	return (
		<div>
			<div className='w-full md:container  bg-primary-01 md:rounded-b-2xl'>
				<div className='text-white px-4 xs:w-11/12 lg:w-1/3 mx-auto flex flex-col justify-center items-center pt-8 pb-24 gap-3 text-sm'>
					{/* <div className='  font-bold text-2xl'>محبــوب ترین</div> */}
					<div>دسترسی آسان به برترین‌ها در هر مکان و زمان</div>
					<SearchBox />
				</div>
			</div>
		</div>
	);
};

export default Slider;
