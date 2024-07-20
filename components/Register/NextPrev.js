import Loading from '@/tools/Loading';
import React from 'react';
import { FaArrowAltCircleLeft, FaArrowAltCircleRight } from 'react-icons/fa';

const NextPrev = ({ prevStep, loading, step }) => {
	return (
		<div className={`py-8 flex  items-center ${step===1 ? `justify-end` :`justify-between`}`}>
			<button
				onClick={prevStep}
				type='submit'
				className={`px-4 py-2 bg-primary-01 flex  items-center gap-4 cursor-pointer hover:shadow-md hover:bg-opacity-85 font-semibold text-xl text-white rounded-md ${step === 1 && ` hidden `}`}>
				<span>
					<FaArrowAltCircleRight />
				</span>

				<span>مرحله قبل</span>
			</button>
			<button
				type='submit'
				className={`px-4 py-2 bg-primary-01 flex justify-between items-center gap-4 cursor-pointer hover:shadow-md hover:bg-opacity-85 font-semibold text-xl disabled text-white rounded-md ${loading && `aria-disabled`} disabled:bg-primary-02`}>
				{!loading ? (
					<>
					{step===5 ? <span>ثبت نهایی</span> : <span>مرحله بعد</span>}
						
						<span>
							<FaArrowAltCircleLeft />
						</span>
					</>
				) : (
<Loading />
)}
			</button>
		</div>
	);
};

export default NextPrev;
