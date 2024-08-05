import React from 'react';
import PN from 'persian-number';

import { AiTwotoneStar } from 'react-icons/ai';
import { FaAngleLeft } from 'react-icons/fa';
const data = [
	{
		id: 1,
		url: '/images/NasimMarashi.jpg',
		score: '4.1',
		number: '5000',
		confirmation: 'yes',
		name: 'دکتر حدیثه بقایی',
		title: 'متخصص زنان و زایمان',
	},
	{
		id: 2,
		url: '/images/FaribaEghdami.jpg',
		score: '4.9',
		number: '4000',
		confirmation: 'no',
		name: 'دکتر فرناز سماعی',
		title: 'متخصص زنان و زایمان',
	},
	{
		id: 3,
		url: '/images/NasimMarashi.jpg',
		score: '3.8',
		number: '3000',
		confirmation: 'pending',
		name: 'دکتر رکسانا بی سپار',
		title: 'متخصص زنان و زایمان',
	},
	{
		id: 4,
		url: '/images/FaribaEghdami.jpg',
		score: '5',
		number: '15000',
		confirmation: 'yes',
		name: 'دکتر سارا کلانتر',
		title: 'متخصص زنان و زایمان',
	},
	{
		id: 5,
		url: '/images/NasimMarashi.jpg',
		score: '4.7',
		number: '6000',
		confirmation: 'no',
		name: 'دکتر فرینار حقایق خراسانی',
		title: 'متخصص زنان و زایمان',
	},
];

const RecommendedPsychologists = () => {
	const setConfirmationItem = (i) => {
		if (i === 'yes') {
			return 'bg-green-600';
		}
		if (i === 'no') {
			return 'bg-red-600';
		}
		if (i === 'pending') {
			return 'bg-gray-600';
		}
	};
	return (
		<div className=' md:container px-8 md:px-0'>
			<div className='flex justify-between items-center font-semibold pt-8'>
				<div className='flex justify-center items-center gap-1'>
					<div className=' bg-primary-01 w-4 h-4 rounded-full'></div>
					<span>روانشناسان پیشنهادی</span>
				</div>
				<div className='flex justify-center items-center gap-1 text-primary-01 '>
					<span>نمایش همه</span>
					<span>
						<FaAngleLeft />
					</span>
				</div>
			</div>
			<div className='w-full grid xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 justify-items-center items-center gap-8 pt-4'>
				{data.slice(0,window.innerWidth > 640 ? 5 : 4).map((item) => (
					<div key={item.id} className='w-full bg-primary-02 shadow-md bg-opacity-30 rounded-md py-4 flex flex-col justify-center items-center'>
						<div className=' relative w-28 h-28 rounded-full shadow-md'>
							<img className='rounded-full w-full h-full ' src={item.url} alt='' />
							<div
								className={` absolute top-2 right-2 w-4 h-4 ${setConfirmationItem(
									item.confirmation
								)} rounded-full border border-white`}
							></div>
						</div>
						<div className='w-full flex justify-around items-center p-4'>
							<div className='flex justify-center items-center gap-1 bg-orange-100 p-1 rounded-md text-orange-700 font-semibold text-sm'>
								<span>{PN.convertEnToPe(`${item.score}`)}</span>

								<span>
									<AiTwotoneStar />
								</span>
							</div>
							<span className='flex justify-center items-center gap-1 p-1 rounded-md text-primary-01 font-semibold text-sm'>
								{PN.convertEnToPe(`${item.number}`)}+<span>مشاوره</span>
							</span>
						</div>
						<span className=' font-semibold'>{item.name}</span>
						<span>{item.title}</span>
					</div>
				))}
			</div>
		</div>
	);
};

export default RecommendedPsychologists;
