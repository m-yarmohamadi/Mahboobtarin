import React, { useEffect, useRef, useState } from 'react';
import { FaCalendar, FaLocationArrow, FaRegHeart, FaStar } from 'react-icons/fa';
import { IoShareSocialOutline } from 'react-icons/io5';
import PN from 'persian-number';

import { FaFlag } from 'react-icons/fa6';
import { FcGlobe } from 'react-icons/fc';
import TitleItems from './TitleItems';
import ViewMore from './ViewMore';
import LeftAndRightArrows from '@/tools/LeftAndRightArrows';
import { enToFaNumber } from '@/utils/enToFa';
import { Countries } from '@/data/countries';
import { useGetProvinces } from '@/hooks/useCity';
import { toPersianDateLong } from '@/utils/toPersianDate';
import Link from 'next/link';

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
const galery = [
	{
		id: 1,
		title: 'مهمانی در کافه محبوب ترین',
		urlPic: '/images/tabiat-01.jpg',
	},
	{
		id: 2,
		title: 'بیمارانی که با گل شفا گرفتند',
		urlPic: '/images/tabiat-02.jpg',
	},
	{
		id: 3,
		title: 'حال خوب در یک روز بهاری',
		urlPic: '/images/tabiat-03.jpg',
	},
	{
		id: 4,
		title: 'کارگاه خیاطی روپوش های پزشکی',
		urlPic: '/images/tabiat-04.jpg',
	},
	{
		id: 5,
		title: 'کارگاه خیاطی روپوش های پزشکی',
		urlPic: '/images/tabiat-05.jpg',
	},
];
const News = [
	{
		id: 1,
		title: 'تشخیص فشار خون بالا از روی انگشتان',
		time: '7 ساعت پیش',
		refrence: 'مشرق نیوز',
	},
	{
		id: 2,
		title: '"وارفارین" ایرانی به زودی وارد بازار می شود',
		time: '9 ساعت پیش',
		refrence: 'صد آنلاین',
	},
	{
		id: 3,
		title: 'تشخیص فشار خون بالا از روی انگشتان',
		time: '10 ساعت پیش',
		refrence: 'خبرگزاری تسنیم',
	},
	{
		id: 4,
		title: '"وارفارین" ایرانی به زودی وارد بازار می شود',
		time: '12 ساعت پیش',
		refrence: 'مشرق نیوز',
	},
	{
		id: 5,
		title: 'تشخیص فشار خون بالا از روی انگشتان',
		time: '17 ساعت پیش',
		refrence: 'خبرگزاری تسنیم',
	},
	{
		id: 6,
		title: '"وارفارین" ایرانی به زودی وارد بازار می شود',
		time: '21 ساعت پیش',
		refrence: 'مشرق نیوز',
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
		const lineHeight = parseInt(window.getComputedStyle(textRef.current).lineHeight, 10);
		const maxHeight = lineHeight * 5; // حداکثر ارتفاع برای 5 خط
	
		if (textRef.current.scrollHeight > maxHeight) {
		  setIsClamped(true);
		} else {
		  setIsClamped(false);
		}
	  }, [userData?.description]);

	return (
		<div className=''>
			<div className='w-full grid grid-cols-4 -mt-14'>
				<div className='flex flex-col justify-end items-center gap-2'>
					<div className='w-28 h-28 rounded-full bg-primary-03 overflow-hidden flex items-center justify-center'>
						<img
							className={!userData?.avatar[0]?.path ? 'w-14 h-14' : "w-full h-full object-cover"}
							src={userData?.avatar[0]?.path || '/images/defaultUser.png'}
							alt={`${userData?.name} ${userData?.lastname} `}
						/>
					</div>
					<span className='bg-green-300 rounded-full px-4'>فعال</span>
				</div>
				<div className='flex flex-col justify-end items-center'>
					<span className=' font-bold text-md'>
						{' '}
						{userData?.name}
						{` `}
						{userData?.lastname}
					</span>
					<span className=' text-xs text-gray-700'>{userData?.email}</span>
					<span className='py-2  text-xs text-gray-700'>مشاوره خانواده و ازدواج</span>
				</div>
				<div className='flex flex-col justify-end items-center text-xs'>
					<span className='p-2 flex justify-around items-center w-full'>
						<span className='flex justify-center items-center gap-1'>
							<FaLocationArrow />
							<span>{userData?.nationality === "Iran" ? getProvinceLabel : userData?.province_id}</span>
						</span>
						<span className='flex justify-center items-center gap-1'>
							<FcGlobe />
							<FaFlag />
							<span>{getCountryLabel}</span>
						</span>
					</span>
					<span className='flex justify-center items-center gap-1 whitespace-nowrap'>
						<span>
							<FaCalendar />
						</span>
						<span>{`تاریخ پیوستن: ${new Date(userData?.created_at).toLocaleDateString("fa-IR", {year:"numeric", month:"long", day:"numeric"})}`}</span>
					</span>
					<span className='pt-2  '>{'تجربه: 12 سال'}</span>
				</div>
				<div className='flex flex-col justify-end items-start gap-1 text-xs ps-10'>
					<span className='flex justify-center items-center gap-1'>
						<FaStar />
						<span>{enToFaNumber('4.90 (از 24 نظر)')}</span>
					</span>
					<span className='flex justify-center items-center gap-1'>
						<span>
							<FaRegHeart />
						</span>
						<span>افزودن به علاقمندی</span>
					</span>
					<span className='flex justify-center items-center gap-1'>
						<span>
							<IoShareSocialOutline />
						</span>
						<span>اشتراک گذاری</span>
					</span>
				</div>
			</div>

			{/* بیوگرافی */}
			<div className='pt-16'>
				<TitleItems title={'بیوگرافی'} />
				<p ref={textRef} className={`${!showCompleteBio && "line-clamp-5 "} text-justify`}>
					{userData?.description}
				</p>
				{isClamped &&
				<ViewMore complete={showCompleteBio} onClick={()=>setShowCompleteBio(!showCompleteBio)}/>
			}
			</div>

			{/* نشانی */}
			<div className='pt-16'>
				<TitleItems title={'نشانی'} />
				<div className=' grid grid-cols-12 gap-2'>
					<div className=' col-span-3 py-2'>
						<iframe
							className='w-full border border-primary-01 rounded-md'
							src='https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d12965.515589214649!2d51.45349569305417!3d35.667671352622676!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3f91fd8c5df094a3%3A0x9838892b68822f61!2z2YXYrNmF2YjYudmHINmI2LHYsti024wg2KLbjNiqINin2YTZhNmHINiz2LnbjNiv24w!5e0!3m2!1sfa!2s!4v1719175469337!5m2!1sfa!2s'></iframe>
					</div>
					<div className='w-full col-span-9 flex flex-col py-4'>
						{userData?.addresses.map((item)=>(
							<div className='mb-4' key={item.id}>
								<span className='w-full font-bold'>آدرس:</span>
								<span className='w-full text-justify'>
									{item.address}
								</span>
							</div>
						))}
						
						<div className='w-full max-w-full flex justify-start items-center pt-8 gap-2'>
							<span className='font-bold'>تلفن:</span>
							<span>{userData?.phone} </span>
						</div>
					</div>
				</div>
			</div>

			{/* تخصص و مهارت */}
			<div className='pt-16'>
				<TitleItems title={'تخصص و مهارت'} />
				<div className=' '>
					<ul>
						{userData?.expert_description}
					</ul>{' '}
				</div>
			</div>

			{/* آثار و افتخارات */}
			<div className='pt-16'>
				<TitleItems title={'آثار و افتخارات'} />
				<div className=' '>
					<ul>
						{userData?.honors_description}
					</ul>{' '}
				</div>
			</div>

			{/* محبوب ترین های .... */}
			<div className='pt-16'>
				<TitleItems title={'محبوب ترین های زهرا حاجی رضایی'} />
				<div className='grid grid-cols-3 '>
					{mostPopular.map((item) => {
						return (
							<div
								key={item.id}
								className=' flex justify-start items-center'>
								<span className='font-bold'>{item.title}: </span>
								<span>{item.value}</span>
							</div>
						);
					})}
				</div>
				<ViewMore />
			</div>

			{/* گالری */}
			<div className='pt-16'>
				<div className='grid grid-cols-3 w-full gap-4  pt-16 '>
					<div>
						<img
							src='/images/galery.jpg'
							className=' object-cover w-full h-40 rounded-md'
							alt=''
						/>
					</div>
					{userData.gallery.map((item) => {
						return (
							<div
								key={item.id}
								className='relative'>
								{
									item.type === "gallery-image" ?
								
									<img
										src={item.path}
										className=' hover:grayscale hover:cursor-pointer object-cover w-full h-40 rounded-md'
										alt=''
									/>
									:
									<video
										controls
										className='hover:grayscale hover:cursor-pointer object-cover w-full h-40 rounded-md'>
										<source
											src={item.path}
											type='video/mp4'
										/>
									</video>
								}
								<span className='flex justify-center items-center absolute bottom-0 right-0 w-full text-xs font-semibold p-1 bg-gray-800 text-white bg-opacity-80 rounded-b-md'>{item.title}</span>
							</div>
						);
					})}
				</div>
				{/* <ViewMore /> */}
			</div>
			{/* لینکدونی */}
			<div className='pt-16'>
				<TitleItems title={'لینکدونی'} />
				<div className=' '>
					{userData?.link_dooni.map((item, index) => {
						return (
							<Link
								key={item.id}
								href={item.link}
								rel="nofollow"
								className={` grid grid-cols-12 py-3 ${!(index % 2) && `bg-gray-100`}`}>
								<div className=' col-span-7'>{item.title}</div>
								<div className=' col-span-3'>{toPersianDateLong(item.created_at)}</div>
								<div className=' col-span-2'>{item.source}</div>
							</Link>
						);
					})}
				</div>

				{/* <ViewMore /> */}
			</div>

			{/* غرفه */}

			<div className='pt-16'>
				<div className='flex justify-between items-end py-2'>
					<TitleItems title={'غرفه'} />
					<LeftAndRightArrows />
				</div>

				<div className='w-full '>
					<div className='w-full grid xs:grid-cols-2 md:grid-cols-3  gap-4'>
						{product.map((item) => {
							return (
								<div
									key={item.id}
									className='border border-gray-300 w-full bg-gradient-to-b  from-blue-100  to-white overflow-hidden rounded-xl hover:shadow-md hover:cursor-pointer'>
									<div className='border-b border-gray-300 rounded-t-xl w-full h-3/5 bg-gradient-to-tl from-transparent hover:from-blue-100 to-white flex justify-center items-center'>
										<img
											className=' w-full p-4'
											src={item.url}
											alt=''
										/>
									</div>
									<div className='flex flex-col justify-center items-center  p-2'>
										<span className='line-clamp-1 font-extrabold'>{item.name}</span>
										<span>{item.ouner}</span>
										<span className='line-clamp-1 text-xs text-gray-500'>انتشارات:{item.Publications}</span>
									</div>
									<div className='flex justify-around items-center gap-3 p-1'>
										<div className='py-2 px-4 bg-primary-01 text-white font-bold rounded-md flex justify-center items-center'>%{PN.convertEnToPe(`${item.Discount}`)}</div>
										<div className=' flex flex-col justify-start items-center'>
											<del className='text-gray-400'>{PN.convertEnToPe(`${item.Price}`)}</del>
											<span className='font-bold'>
												{PN.convertEnToPe(`${DiscountCalculation(item.Price, item.Discount)}`)}
												تومان
											</span>
										</div>
									</div>
								</div>
							);
						})}
					</div>
				</div>

				<ViewMore />
			</div>
			{/* نظرات کاربران */}
			<div className='pt-16'>
				<TitleItems title={'نظرات کاربران'} />
				<div className='w-full '>
					<div className=' border border-gray-400 rounded-lg w-full '>
						<div className=' flex justify-start items-center gap-4 w-full  p-4'>
							<span>به این پزشک چه امتیازی می دهید؟</span>
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
						<div>
							{ideas.map((item) => {
								return (
									<div
										key={item.id}
										className='p-4 flex flex-col justify-center items-start gap-1'>
										<span className='font-bold'>{item.name}</span>
										<div className=' flex justify-start items-center gap-4 text-gray-500 text-sm'>
											<span className='flex justify-start items-center gap-1 text-primary-01'>
												<FaStar />
												<FaStar />
												<FaStar />
												<FaStar />
												<FaStar />
											</span>
											<span>{enToFaNumber(`${item.time}`)} </span>
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
