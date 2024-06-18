import React from 'react';
import RecommendedDoctors from './RecommendedDoctors';
import RecommendedPsychologists from './RecommendedPsychologists';

const Recommended = () => {
	return (
		<div>
			<RecommendedDoctors />
			<RecommendedPsychologists />
			<div className='py-8 w-full flex justify-center items-center'>
				<button
					className='py-2 px-8 bg-primary-01 text-white font-semibold rounded-lg'
					type=''
				>
					موارد بیشتر
				</button>
			</div>
		</div>
	);
};

export default Recommended;
