import React from 'react';
import { BiFilter, BiSearch, BiSlider, BiSolidDiscount } from 'react-icons/bi';
import { FaChevronCircleLeft } from 'react-icons/fa';
import { FaMasksTheater, FaSackDollar, FaUserDoctor } from 'react-icons/fa6';
import { FcSportsMode } from 'react-icons/fc';
import { MdOutlineSportsKabaddi, MdFolderSpecial } from 'react-icons/md';
import { GoLaw } from 'react-icons/go';
import { GiHiking, GiBugleCall } from 'react-icons/gi';
import { PiBuildingOfficeBold } from 'react-icons/pi';
import { AiTwotoneExperiment } from 'react-icons/ai';
import SliderComponent from './SliderComponent';

const iconMap = {
	FaSackDollar,
	BiFilter,
	BiSearch,
	FaMasksTheater,
	FaChevronCircleLeft,
	FcSportsMode,
	MdOutlineSportsKabaddi,
	FaUserDoctor,
	GoLaw,
	GiHiking,
	PiBuildingOfficeBold,
	BiSolidDiscount,
	AiTwotoneExperiment,
	GiBugleCall,
};
const sliderImg = [
	{ title: 'slider01', url: '/images/img001.jpg' },
	{ title: 'slider02', url: '/images/img002.jpg' },
	{ title: 'slider03', url: '/images/img003.jpg' },
];

const data = [
	{
		id: 1,
		icon: 'FaSackDollar',
		title: 'اقتصاد',
	},
	{
		id: 2,
		icon: 'FaMasksTheater',
		title: 'هنر',
	},
	{
		id: 3,
		icon: 'FaUserDoctor',
		title: 'سلامت و زیبایی',
	},
	{
		id: 4,
		icon: 'MdOutlineSportsKabaddi',
		title: 'ورزش',
	},

	{
		id: 5,
		icon: 'GoLaw',
		title: 'وکالت و حقوق',
	},
	{
		id: 6,
		icon: 'GiHiking',
		title: 'تفریح و گردش',
	},
	{
		id: 7,
		icon: 'PiBuildingOfficeBold',
		title: 'محبوب مال',
	},
	{
		id: 8,
		icon: 'BiSolidDiscount',
		title: 'پیشنهاد ویژه',
	},
	{
		id: 9,
		icon: 'AiTwotoneExperiment',
		title: 'تجربه',
	},
	{
		id: 10,
		icon: 'GiBugleCall',
		title: 'فراخوان',
	},
];
const Baner = () => {
	return (
		<div className=' md:container '>
			<div className='w-5/6 mx-auto bg-white rounded-2xl -mt-16  text-gray-800'>
				<div className='w-full h-full flex justify-evenly items-start py-2 gap-2 text-xs  scrollbar-thumb-gray-400 scrollbar-track-gray-100 scrollbar-thin overflow-auto'>
					{data.map((item) => (
						<div
							key={item.id}
							className='flex flex-col justify-center items-center w-full hover:text-primary-01 hover:cursor-pointer'>
							<span className='text-3xl p-2'>{iconMap[item.icon] && React.createElement(iconMap[item.icon])}</span>
							<span className='lg:text-sm text-center'>{item.title}</span>
						</div>
					))}

					<div className=' h-full flex flex-col justify-center items-center w-full text-primary-01  hover:text-opacity-80 hover:cursor-pointer'>
						<span className='w-full h-full justify-items-center text-3xl px-4 py-6 flex justify-center items-center'>
							<FaChevronCircleLeft />
						</span>
					</div>
				</div>
				<div className='grid md:grid-cols-3 gap-1  '>
					<div className=' hidden md:block w-full h-36 relative  '>
						<img
							className='absolute top-0 right-0 object-cover object-left-bottom h-36 w-full -2xl z-0'
							src='/images/img001.jpg'
							alt=''
						/>
						{/* <div className=' absolute top-0 right-0 w-full bg-gradient-to-l from-[#e4d4b2] via-[#e4d4b2] to-transparent h-full -2xl border-2 border-white z-10'>
							<div className='flex flex-col justify-center items-center gap-2 w-4/5 h-full'>
								<div className='text-lg font-extrabold'>دنیاتو زندگی کن</div>
								<div>نقاشی ساختمان با آچاره</div>
								<button className='py-1 px-3 shadow-sm hover:shadow-md bg-white text-gray-700 hover:text-gray-950 font-semibold text-md rounded-md'>ثبت سفارش</button>
							</div>
						</div> */}
					</div>
					<div className='w-full h-72 relative col-span-2 row-span-2 '>
<SliderComponent sliderImg={sliderImg} slidesPerView={1} width={'w-full'} heigth={'h-72'}/>
						{/* <img
							className=' absolute top-0 right-0 object-cover object-left-bottom h-72 w-full rounded-b-2xl md:rounded-ee-2xl z-0'
							src='/images/img002.jpg'
							alt=''
						/> */}
						{/* <div className=' absolute top-0 right-0 w-full bg-gradient-to-l from-[#e8ecef] via-[#e8ecef] to-transparent h-full rounded-b-2xl md:rounded-ee-2xl border-2 border-white z-10'>
							<div className='flex flex-col justify-center items-center gap-6 w-3/5 h-full'>
								<div className='text-2xl font-extrabold'>نقاشی با قیمت قطعی</div>
								<div>خدمات نقاشی ساختمان</div>
								<button className='py-1 px-3 shadow-sm hover:shadow-md bg-white text-gray-700 hover:text-gray-950 font-semibold text-md rounded-md'>ثبت سفارش</button>
							</div>
						</div> */}
					</div>
					<div className='hidden md:block w-full h-36 relative  '>
						<img
							className='absolute top-0 right-0 object-cover object-left-bottom h-36 w-full rounded-es-2xl z-0'
							src='/images/img003.jpg'
							alt=''
						/>
						{/* <div className=' absolute top-0 right-0 w-full bg-gradient-to-l from-white via-white to-transparent h-full rounded-es-2xl border-2 border-white z-10'>
							<div className='flex flex-col justify-center items-center gap-2 w-4/5 h-full'>
								<div className='text-lg font-extrabold'>وانت اختصاصی - کارگر حرفه ای</div>
								<div>خدمات اسباب کشی با وانت</div>
								<button className='py-1 px-3 shadow-sm hover:shadow-md bg-white text-gray-700 hover:text-gray-950 font-semibold text-md rounded-md'>ثبت سفارش</button>
							</div>
						</div> */}
					</div>
				</div>
			</div>
		</div>
	);
};

export default Baner;
