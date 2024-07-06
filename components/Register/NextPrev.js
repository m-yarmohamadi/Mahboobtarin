import React from 'react';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

const NextPrev = ({prevStep}) => {
	return (
		<div className='py-8 flex justify-between items-center '>
			<button
			onClick={prevStep}
			type='submit'
				className='px-4 py-2 bg-primary-01 flex justify-between items-center gap-4 cursor-pointer hover:shadow-md hover:bg-opacity-85 font-semibold text-xl text-white rounded-md'>
				<span>
					<FaArrowAltCircleRight />
				</span>

				<span>مرحله قبل</span>
			</button>
			<button
			type='submit'
				className='px-4 py-2 bg-primary-01 flex justify-between items-center gap-4 cursor-pointer hover:shadow-md hover:bg-opacity-85 font-semibold text-xl text-white rounded-md'>
				<span>مرحله بعد</span>
				<span>
					<FaArrowAltCircleLeft />
				</span>
			</button>
		</div>
	);
};

export default NextPrev;
