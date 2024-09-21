import React, { useEffect, useRef, useState } from 'react';
import {  FaRegHeart, FaRegStar, FaStar } from 'react-icons/fa';
import { IoShareSocialOutline } from 'react-icons/io5';
import PN from 'persian-number';
import {  FaRegCalendar } from 'react-icons/fa6';
import TitleItems from './TitleItems';
import ViewMore from './ViewMore';
import LeftAndRightArrows from '@/tools/LeftAndRightArrows';
import { enToFaNumber } from '@/utils/enToFa';
import { Countries } from '@/data/countries';
import { useGetProvinces } from '@/hooks/useCity';
import { toPersianDateLong } from '@/utils/toPersianDate';
import Link from 'next/link';
import { MdAccessTime } from 'react-icons/md';
import { HiOutlineLocationMarker } from 'react-icons/hi';
import { BiMedal } from 'react-icons/bi';
import { Navigation } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/swiper-bundle.css';
import numberWithCommas from '@/utils/numberWithCommas';

const ideas = [
	{
		id: 1,
		name: 'بهمن مرادی خامنه',
		time: '53 روز قبل',
		score: 5,
		comment: 'بسیار عالی',
	},
	{
		id: 2,
		name: 'مرجان محمدلو',
		time: '62 روز قبل',
		score: 3,
		comment: 'خیلی صبور و بادقت',
	},
	{
		id: 3,
		name: 'معصومه کیانی',
		time: '20 روز قبل',
		score: 1,
		comment: 'واقعا دکتر خوبی بود',
	},
	{
		id: 4,
		name: 'عطیه جعفری برنجی',
		time: '76 روز قبل',
		score: 4,
		comment: 'از هر لحاظ عالی هستند',
	},
	{
		id: 5,
		name: 'مهدی مولایی',
		time: '32 روز قبل',
		score: 3,
		comment: 'بسیار دکتر کاربلد و...',
	},
];
const mostPopular = [
	{
		id: 1,
		title: 'رنگ',
		value: 'زرد',
	},
	{
		id: 2,
		title: 'رشته ورزشی',
		value: 'فوتبال',
	},
	{
		id: 3,
		title: 'تیم ورزشی',
		value: 'استقلال',
	},
	{
		id: 4,
		title: 'مرکز خرید',
		value: 'تیراژه',
	},
	{
		id: 5,
		title: 'شاعر',
		value: 'حافظ',
	},
	{
		id: 6,
		title: 'پاتوق',
		value: 'کافه ملانا',
	},
	{
		id: 7,
		title: 'تیم ورزشی',
		value: 'استقلال',
	},
	{
		id: 8,
		title: 'مرکز خرید',
		value: 'اطلس مال',
	},
	{
		id: 9,
		title: 'شاعر',
		value: 'سعدی',
	},
	{
		id: 10,
		title: 'رشته ورزشی',
		value: 'فوتبال',
	},
	{
		id: 11,
		title: 'تیم ورزشی',
		value: 'استقلال',
	},
	{
		id: 12,
		title: 'مرکز خرید',
		value: 'ایران مال',
	},
];
const product = [
	{
		id: 1,
		url: '/images/Book001.png',
		name: 'پاستیل بنفش',
		ouner: 'کاترین اپل گیت',
		Publications: '...',
		Price: 128000,
		Discount: 83,
		Supplier: 'امیر عزیزی',
		SupplierUrl: '/images/KavehBehbahani.jpg',
	},
	{
		id: 2,
		url: '/images/Book002.png',
		name: '12 قانون برای زندگی',
		ouner: 'جردن پیترسون',
		Publications: '...',
		Price: 398000,
		Discount: 77,
		Supplier: 'علی محمودی',
		SupplierUrl: '/images/KavehBehbahani.jpg',
	},
	{
		id: 3,
		url: '/images/Book003.png',
		name: 'انسان در جستجوی معنا',
		ouner: 'ویکتور فرانگل',
		Publications: '...',
		Price: 138000,
		Discount: 73,
		Supplier: 'سحر عمادی',
		SupplierUrl: '/images/KavehBehbahani.jpg',
	},
];
const DetailProfile = ({ userData }) => {
	const [showCompleteBio, setShowCompleteBio] = useState(false);
	const [isClamped, setIsClamped] = useState(false);
	const textRef = useRef(null);
	const getCountryLabel = [...Countries].filter((c) => c.value === userData?.nationality)[0]?.label;
	const { provinces, isLoading } = useGetProvinces();
	const getProvinceLabel = !isLoading && provinces.filter((p) => p.id === 5)[0]?.name;
	

	const DiscountCalculation = (i, d) => {
		return i - (i * d) / 100;
	};
	const [score, setScore] = useState(0);

	useEffect(() => {
		if(userData?.description){
			const lineHeight = parseInt(window.getComputedStyle(textRef.current).lineHeight, 10);
			const maxHeight = lineHeight * 5; // حداکثر ارتفاع برای 5 خط
		
			if (textRef.current.scrollHeight > maxHeight) {
			setIsClamped(true);
			} else {
			setIsClamped(false);
			}
		}
	  }, [userData?.description]);

	return (
		<div className='w-full'>
			<div id="personalinfo" className='w-full'>
				<div className='flex justify-between gap-3 -mt-24 md:-mt-16'>
					<div className='flex flex-col justify-end items-center gap-2'>
						<div className='w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary-02 overflow-hidden flex items-center justify-center'>
							<img
								className={!userData?.avatar[0]?.path ? 'w-11 h-11 md:w-12 md:h-12' : "w-full h-full object-cover"}
								src={userData?.avatar[0]?.path || '/images/defaultUser.png'}
								alt={`${userData?.name} ${userData?.lastname} `}
							/>
						</div>
						<span className='bg-green-300 text-xs font-semibold text-gray-700 rounded-full py-1 px-4'>فعال</span>
					</div>
					<div className='flex justify-end gap-3 text-sm font-medium text-gray-800 pt-10'>
						
						<span className='flex justify-end items-center gap-1'>
							<FaRegHeart className='w-6 h-6 text-red-600'/>
						</span>
						<span className='flex justify-end items-center gap-1'>
							<IoShareSocialOutline className='w-6 h-6 text-blue-500'/>
						</span>
					</div>
				</div>
				<div className='flex flex-col mt-6'>
						<span className=' font-bold text-xl md:text-2xl'>
							{' '}
							{userData?.name}
							{` `}
							{userData?.lastname}
						</span>
						<span className=' text-xs text-gray-700'>{userData?.email}</span>
						<span className='py-2  text-xs md:text-sm text-gray-700'>{userData?.expertises[0].subject}</span>
					</div>
				
				<div className='flex flex-col xs:flex-row justify-between gap-2 pt-6'>
					<div className='space-y-2'>
						<span className='flex items-center w-full gap-4 text-sm md:text-base'>
							<span className='flex justify-center items-center text-gray-800 font-semibold'>
								<HiOutlineLocationMarker className='w-6 h-6 ml-1'/>
								<span>{getCountryLabel}</span>
								<span>، {userData?.nationality === "Iran" ? getProvinceLabel : userData?.province_id}</span>
							</span>
							
						</span>
						<span className='text-xs md:text-sm mr-[2px] flex items-center gap-1 whitespace-nowrap text-gray-800 font-semibold'>
							<FaRegCalendar className='w-5 h-5 text-gray-800'/>
							<span className='text-gray-600 font-normal'>
								تاریخ پیوستن : 
							</span>
							{new Date(userData?.created_at).toLocaleDateString("fa-IR", {year:"numeric", month:"long", day:"numeric"})}
						</span>
					</div>
					<div className='space-y-2'>
						<div className='flex items-center  text-xs md:text-sm text-gray-800 font-semibold'>
							<BiMedal className='w-7 h-7 text-green-600 ml-1'/>
							<span className='text-gray-600 font-normal'>
								تجربه : 
							</span>
							12 سال
						</div>
						<span className='flex items-center gap-1 text-xs md:text-sm'>
							<FaRegStar className='w-6 h-6 text-yellow-400 mr-[2px]'/>
							<span>{enToFaNumber('4.90 (از 24 نظر)')}</span>
						</span>
					</div>
				</div>
				
			</div>

			{/* بیوگرافی */}
			{userData.description &&
			<div id='bio' className='pt-16'>
				<TitleItems title={'بیوگرافی'} />
				<p ref={textRef} className={`${!showCompleteBio && "line-clamp-5 "} text-xs sm:text-sm sm:leading-8 leading-6 font-medium text-gray-800 text-justify`}>
					{userData?.description}
				</p>
				{isClamped &&
				<ViewMore complete={showCompleteBio} onClick={()=>setShowCompleteBio(!showCompleteBio)}/>
				}
			</div>
			}

			{/* نشانی */}
			<div id='address' className='pt-16'>
				<TitleItems title={'نشانی'} />
				<div className=' grid grid-cols-1 gap-2'>	
					<div className='w-full flex flex-col gap-4'>
						{userData?.phone && <div className='w-full text-gray-800 text-sm flex justify-start items-center gap-2'>
							<span className='font-bold'>تلفن:</span>
							<span>{userData?.phone} </span>
						</div>}
						<div className='text-sm text-gray-800'>
							<span className='w-full font-bold'>آدرس : </span>
							<span className='w-full text-justify'>
								{userData?.addresses[0].address}
							</span>
						</div>
					</div>
					<div className='py-2'>
						<iframe
							className='w-full border border-primary-01 rounded-md'
							src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12965.515589214649!2d51.45349569305417!3d35.667671352622676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f91fd8c5df094a3%3A0x9838892b68822f61!2z2YXYrNmF2YjYudmHINmI2LHYsti024wg2KLbjNiqINin2YTZhNmHINiz2LnbjNiv24w!5e0!3m2!1sfa!2s!4v1719175469337!5m2!1sfa!2s'></iframe>
					</div>
				</div>
			</div>

			{/* تخصص و مهارت */}
			{userData?.expert_description && 
			<div id='skills' className='pt-16'>
				<TitleItems title={'تخصص و مهارت'} />
				<div className=' '>
					<ul className='text-xs font-medium text-gray-800 sm:text-sm'>
						{userData?.expert_description}
					</ul>
				</div>
			</div>}

			{/* آثار و افتخارات */}
			{userData?.honors_description && 
			<div id='honors_description' className='pt-16'>
				<TitleItems title={'آثار و افتخارات'} />
				<div className=' '>
					<ul className='text-xs font-medium text-gray-800 sm:text-sm'>
						{userData?.honors_description}
					</ul>
				</div>
			</div>}

			{/* محبوب ترین های .... */}
			<div id='populars' className='pt-16'>
				<TitleItems title={`محبوب ترین های ${userData?.name} ${userData?.lastname}`} />
				<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-2 gap-2 mb-4'>
					{mostPopular.map((item) => {
						return (
							<div
								key={item.id}
								className=' flex justify-start items-center text-xs sm:text-sm text-gray-800 gap-1'>
								<span className='font-bold'> {item.title} : </span>
								<span> {item.value}</span>
							</div>
						);
					})}
				</div>
				<ViewMore />
			</div>

			{/* گالری */}
			<div id='gallery' className='pt-16'>
				<TitleItems title={'گالری'} />
				<div className='grid grid-cols-1 sm:grid-cols-2 w-full gap-4 '>
					<div className='aspect-w-16 aspect-h-10'>
						<img
							src='/images/galery.jpg'
							className=' object-cover w-full h-full rounded-md'
							alt=''
						/>
					</div>
					{userData.gallery.map((item) => {
						return (
							<div className='relative'>
								<div
									className='aspect-w-16 aspect-h-10'>
									{
										item.type === "gallery-image" ?
									
										<img
											src={item.path}
											className=' hover:grayscale hover:cursor-pointer object-cover w-full h-full object-center rounded-md'
											alt=''
										/>
										:
										<video
											controls
											className='hover:grayscale hover:cursor-pointer object-cover w-full h-full object-center rounded-md'>
											<source
												src={item.path}
												type='video/mp4'
											/>
										</video>
									}
								</div>
								<span className='flex justify-center items-center absolute bottom-0 right-0 w-full text-xs font-semibold p-1 bg-gray-800 text-white bg-opacity-80 rounded-b-md'>{item.title}</span>
							</div>
						);
					})}
				</div>
				{/* <ViewMore /> */}
			</div>

			{/* لینکدونی */}
			<div id='linkdins' className='pt-16'>
				<TitleItems title={'لینکدونی'} />
				<div className='rounded-xl overflow-hidden'>
					{userData?.link_dooni.map((item, index) => {
						return (
							<div
								key={item.id}
								className={` flex flex-col p-3 ${!(index % 2) && `bg-gray-100`}`}
							>

								<Link href={item.link} rel='nofollow' className='font-semibold hover:text-blue-500 hover:underline text-gray-800 mt-1 mb-3 flex items-center gap-2'>
									<span className='w-2 h-2 rounded-full bg-gray-700 inline-block'></span>
									{item.title}
								</Link>
								<div className='flex items-center justify-between'>
									<div className='text-sm text-gray-500'>
										منبع خبر : 
										<span className='text-gray-700 font-medium'>
											{item.source}
										</span>
									</div>
									<div className='text-xs flex items-center gap-1 text-gray-400'>
										<MdAccessTime className='w-4 h-4'/>
										{toPersianDateLong(item.created_at)}
									</div>
								</div>
							</div>
						);
					})}
				</div>

				{/* <ViewMore /> */}
			</div>

			{/* غرفه */}
			<div id='booth' className='w-full pt-16'>
				<div className='flex justify-between items-end py-2'>
					<TitleItems title={'غرفه'} />
					<LeftAndRightArrows />
				</div>

					<div className='w-full'>
						<Swiper
							modules={[Navigation]}
							slidesPerView={'auto'}
							navigation={{
								nextEl: '#booth-expert-btn-next',
								prevEl: '#booth-expert-btn-prev'
							}}
						>
							{product.map((item, index) => {
								return (
									<SwiperSlide key={index} className="!w-[250px] ml-4">
										<div className='border border-gray-300 bg-gradient-to-b  from-blue-100  to-white overflow-hidden rounded-xl hover:shadow-md hover:cursor-pointer'>
											<div className='border-b border-gray-300 rounded-t-xl bg-gradient-to-tl from-transparent hover:from-blue-100 to-white'>
												<div className='aspect-w-8 aspect-h-8'>
													<img
														className='w-full h-full object-contain p-6 object-center'
														src={item.url}
														alt=''
													/>
												</div>
											</div>
											<div className='flex flex-col justify-center items-center gap-1 p-2'>
												<span className='line-clamp-1 font-extrabold truncate'>{item.name}</span>
												<span className='text-xs md:text-sm'>{item.ouner}</span>
												<span className='line-clamp-1 text-xs text-gray-500'>انتشارات:{item.Publications}</span>
											</div>
											<div className='flex justify-between p-4 items-end gap-3'>
												<div className='py-1 px-2 text-sm bg-primary-01 text-white font-bold rounded-md flex justify-center items-center'>%{PN.convertEnToPe(`${item.Discount}`)}</div>
												<div className=' flex flex-col justify-start items-center'>
													<del className='text-gray-400'>{numberWithCommas(`${item.Price}`)}</del>
													<span className='font-bold'>
														{numberWithCommas(`${DiscountCalculation(item.Price, item.Discount)}`)}
														تومان
													</span>
												</div>
											</div>
										</div>
									</SwiperSlide>
								);
							})}
						</Swiper>
					</div>
					{/* <div className='w-full grid xs:grid-cols-2 md:grid-cols-3  gap-4'>
						{product.map((item) => {
							return (
							);
						})}
					</div> */}
			</div>

			{/* نظرات کاربران */}
			<div id='comments' className='pt-16'>
				<TitleItems title={'نظرات کاربران'} />
				<div className='w-full '>
					<div className='pb-4 border border-gray-400 rounded-lg w-full '>
						<div className=' flex flex-col items-center gap-4 w-full  p-4'>
							<span className='text-sm font-semibold text-gray-800'>به این پزشک چه امتیازی می دهید؟</span>
							<div className='flex items-center gap-3'>
								<span className={` cursor-pointer ${score >= 1 ? `text-gray-800` : ` text-gray-300`}`}>
									<FaStar onClick={() => setScore(1)} />
								</span>
								<span className={` cursor-pointer ${score >= 2 ? `text-gray-800` : ` text-gray-300`}`}>
									<FaStar onClick={() => setScore(2)} />
								</span>
								<span className={` cursor-pointer ${score >= 3 ? `text-gray-800` : ` text-gray-300`}`}>
									<FaStar onClick={() => setScore(3)} />
								</span>
								<span className={` cursor-pointer ${score >= 4 ? `text-gray-800` : ` text-gray-300`}`}>
									<FaStar onClick={() => setScore(4)} />
								</span>
								<span className={` cursor-pointer ${score >= 5 ? `text-gray-800` : ` text-gray-300`}`}>
									<FaStar onClick={() => setScore(5)} />
								</span>
							</div>
						</div>
						<div>
							<form className='p-4'>
								<label htmlFor='Opinion'></label>
								<textarea
									rows='8'
									className=' w-full  text-sm   focus:ring-0 border border-gray-300 rounded-md p-2'
									placeholder='لطفا نظر خود را درج فرمایید...'
									required></textarea>
								<div className='flex justify-end items-center'>
									<button
										className=' bg-primary-01 px-8 text-white font-bold py-2 rounded-md'
										type=''>
										ثبت
									</button>
								</div>
							</form>
						</div>
						<div className='p-4 w-full'>
							{ideas.map((item) => {
								return (
									<div
										key={item.id}
										className='w-full border-b border-b-slate-300 py-6 last:border-b-0 flex flex-col justify-center items-start gap-1'>
										<span className='font-bold text-sm text-gray-800'>{item.name}</span>
										<div className='w-full flex justify-between mb-4 items-center gap-4 text-gray-500 text-sm'>
											<span className='flex justify-start items-center gap-1 text-primary-01'>
												<FaStar />
												<FaStar />
												<FaStar />
												<FaStar />
												<FaStar />
											</span>
											<span className='text-xs text-gray-400 flex items-center gap-1'>
												<MdAccessTime className='w-4 h-4'/>
												{enToFaNumber(`${item.time}`)}
											</span>
										</div>
										<span className='text-gray-600 text-xs font-thin'>{item.comment}</span>
									</div>
								);
							})}
						</div>
						<ViewMore />
					</div>
				</div>
			</div>
		</div>
	);
};

export default DetailProfile;
