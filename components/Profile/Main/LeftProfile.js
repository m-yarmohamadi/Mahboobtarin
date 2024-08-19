import React, { useState } from 'react';
import TitleItems from './TitleItems';
import { FaClock, FaComment, FaDochub, FaSearch, FaTextWidth, FaTimes } from 'react-icons/fa';
import { BsChatText } from 'react-icons/bs';

import { FaClockRotateLeft } from 'react-icons/fa6';
import { enToFaNumber } from '@/utils/enToFa';
import { AiOutlineCheckCircle } from 'react-icons/ai';
import { IoPerson } from 'react-icons/io5';
import Input from '@/tools/Input';
import Modal from '@/components/Modal';
import BookingForm from './BookingForm';
const Services = [
	{
		id: 1,
		icon: 'BsChatText',
		title: 'مشاوره متنی',
		price: 119500,
		timeEnd: 'پاسخ دهی کمتر از 1 ساعت (حداکثر 10 ساعت)',
		endService: 'پایان توافقی گفتگو',
	},
	{
		id: 2,
		icon: 'BsChatText',
		title: 'مشاوره صوتی اینترنتی',
		price: 119500,
		timeEnd: 'پاسخ دهی کمتر از 1 ساعت (حداکثر 10 ساعت)',
		endService: 'پایان توافقی گفتگو',
	},
	{
		id: 3,
		icon: 'BsChatText',
		title: 'مشاوره تلفنی',
		price: 119500,
		timeEnd: 'پاسخ دهی کمتر از 1 ساعت (حداکثر 10 ساعت)',
		endService: 'پایان توافقی گفتگو',
	},
	{
		id: 4,
		icon: 'BsChatText',
		title: 'مشاوره ویدیویی',
		price: 0,
		timeEnd: 'پاسخ دهی کمتر از 1 ساعت (حداکثر 10 ساعت)',
		endService: 'پایان توافقی گفتگو',
	},
	{
		id: 5,
		icon: 'BsChatText',
		title: 'دعوتنامه',
		price: 0,
		timeEnd: 'پاسخ دهی کمتر از 1 ساعت (حداکثر 10 ساعت)',
		endService: 'پایان توافقی گفتگو',
	},
	{
		id: 6,
		icon: 'BsChatText',
		title: 'سمینار (آموزش)',
		price: 12000000,
		timeEnd: 'پاسخ دهی کمتر از 1 ساعت (حداکثر 10 ساعت)',
		endService: 'پایان توافقی گفتگو',
	},
	{
		id: 7,
		icon: 'BsChatText',
		title: 'تبلیغات',
		price: 0,
		timeEnd: 'پاسخ دهی کمتر از 1 ساعت (حداکثر 10 ساعت)',
		endService: 'پایان توافقی گفتگو',
	},
	{
		id: 8,
		icon: 'BsChatText',
		title: 'مشارکت در کلینیک',
		price: 1000000,
		timeEnd: 'پاسخ دهی کمتر از 1 ساعت (حداکثر 10 ساعت)',
		endService: 'پایان توافقی گفتگو',
	},
	{
		id: 9,
		icon: 'BsChatText',
		title: 'حمایت',
		price: 0,
		timeEnd: 'پاسخ دهی کمتر از 1 ساعت (حداکثر 10 ساعت)',
		endService: 'پایان توافقی گفتگو',
	},
	{
		id: 10,
		icon: 'BsChatText',
		title: 'نوبت حضوری مطب',
		price: 1000000,
		timeEnd: 'پاسخ دهی کمتر از 1 ساعت (حداکثر 10 ساعت)',
		endService: 'پایان توافقی گفتگو',
	},
];
const Followers = [
	{
		id: 1,
		picUrl: '/images/FaribaEghdami.webp',
		name: 'علی رسولی',
		idCloud: '@Ali_Rasouli',
		position: 'معاون مرکز توسعه فناوری های راهبردی، معاونت علمی، فناوری و اقتصاد دانش بنیان',
		ablution: 0,
	},
	{
		id: 2,
		picUrl: '/images/FaribaEghdami.webp',
		name: 'مهدی انجدینی',
		idCloud: '@Anjidani',
		position: 'معاون مرکز توسعه فناوری های راهبردی، معاونت علمی، فناوری و اقتصاد دانش بنیان',
		ablution: 2,
	},
	{
		id: 3,
		picUrl: '/images/FaribaEghdami.webp',
		name: 'محمدرضا پاکدل',
		idCloud: '@m_pakdel',
		position: 'عضو هیأت مدیره شرکت ملی پست',
		ablution: 1,
	},
	{
		id: 4,
		picUrl: '/images/FaribaEghdami.webp',
		name: 'امیر جهانی',
		idCloud: '@Amir_Jahani',
		position: 'معاون مرکز توسعه فناوری های راهبردی، معاونت علمی، فناوری و اقتصاد دانش بنیان',
		ablution: 2,
	},
	{
		id: 5,
		picUrl: '/images/FaribaEghdami.webp',
		name: 'خبرگزاری حوزه (حوزه علمیه قم)',
		idCloud: '@Hoze',
		position: 'معاون مرکز توسعه فناوری های راهبردی، معاونت علمی، فناوری و اقتصاد دانش بنیان',
		ablution: 0,
	},
];

const LeftProfile = () => {
	const [showIdeasDetail, setShowIdeasDetail] = useState(1);
	const [modal, setModal] = useState(0);

	return (
		<div className='w-full  '>
			<div className='p-2'>
				<div className=' border border-gray-200 rounded-md p-4  w-full'>
					<TitleItems title={'پلن های خدمات'} />
					<div className='w-full flex flex-col justify-center items-center gap-2'>
						{Services.map((item, index) => {
							return (
								<div
									key={item.id}
									onClick={() => setShowIdeasDetail(index + 1)}
									className='  cursor-pointer w-full flex flex-col justify-center items-start gap-2 p-1 pb-3  border border-gray-300 rounded-md'>
									<div onClick={()=>setModal(item.id)} className='w-full flex-col sm:flex-row sm:items-center flex justify-between gap-4'>
										<div className=' flex items-center gap-1 truncate'>
											<div>
												<span className='rounded-md flex justify-center items-center text-lg text-primary-01 bg-primary-01 bg-opacity-20 w-8 h-8'>
													<BsChatText />
												</span>
											</div>
											<span className='font-bold text-sm truncate'>{item.title}</span>
										</div>
										<span className='text-primary-01 flex-1 justify-end items-center gap-1 flex text-sm pl-3 font-bold'>
											{enToFaNumber(`${item.price}`)} 
											<span className='text-xs font-normal'>
												تومان
											</span>

										</span>
									</div>
									<Modal title={item.title} open={modal === item.id} onClose={()=>setModal(0)}>
										<BookingForm onClose={()=>setModal(0)}/>
									</Modal>
									{showIdeasDetail === index + 1 && (
										<div className='ps-2 flex flex-col justify-start items-center gap-2 text-gray-600'>
											<div className='w-full flex justify-start items-center gap-1'>
												<span>
													<FaClock />
												</span>
												<span className='text-xs'>{enToFaNumber(`${item.timeEnd}`)} </span>
											</div>
											<div className='w-full flex justify-start items-center gap-1'>
												<span>
													<FaClockRotateLeft />
												</span>
												<span className='text-sm'>{enToFaNumber(`${item.endService}`)} </span>
											</div>
										</div>
									)}
								</div>
							);
						})}
						{/* <button
							className='p-2 text-sm w-full bg-primary-01 rounded-md text-white shadow hover:bg-opacity-90'
							type=''>
							ادامه و پرداخت
						</button> */}
					</div>
				</div>
			</div>
			<div className='w-full p-2 '>
				<div className='w-full p-4 bg-gray-200 shadow-md  rounded-md'>
					<div className='w-full flex justify-between flex-col sm:flex-row items-center gap-2 text-md font-bold'>
						<span className='truncate'>افرادی برای دنبال کردن</span>
						<div className='text-white text-xl rounded-full flex justify-between items-center w-24 bg-gray-300  h-fit'>
							<div className='w-full h-full bg-blue-800 px-4 py-1 rounded-full'>
								<AiOutlineCheckCircle />
							</div>
							<div className='w-full h-full p-1  rounded-full text-gray-500'>
								<IoPerson />
							</div>
						</div>
					</div>
					<div className='w-full flex flex-col'>
						{Followers.map((item) => {
							return (
								<div
									key={item.id}
									className='w-full min-h-full justify-between flex flex-col gap-3 px-2 py-8'>
									<div className='w-full flex flex-col items-center sm:flex-row lg:flex-col xl:flex-row gap-2 justify-between'>
										<div className=''>
											<div className='w-12 h-12'>
												<img
													className='w-full h-full object-cover object-center rounded-[18px]'
													src={item.picUrl}
													alt=''
												/>
											</div>
										</div>
										<div className='w-full flex items-center justify-between gap-2'>
											<div className='flex-1 flex flex-col gap-1 justify-center items-start'>
												<span className='flex justify-start items-center gap-1'>
													<h3 className='text-sm font-bold text-gray-800'>{item.name}</h3>
													{item.ablution === 1 ? (
														<span className='font-bold text-green-600 text-sm'>
															<AiOutlineCheckCircle />
														</span>
													) : item.ablution === 2 ? (
														<span className='font-bold text-blue-600 text-xs'>
															<AiOutlineCheckCircle />
														</span>
													) : (
														''
													)}
												</span>
												<span className='text-gray-500 text-xs'>{item.idCloud}</span>
											</div>
											<button
												className='w-auto text-xs bg-primary-01 p-2 rounded-md text-white font-bold hover:bg-opacity-95'
												type=''>
												مشاهده پروفایل
											</button>
										</div>
									</div>
									<div className='w-full flex flex-col items-center sm:items-start justify-between gap-2 text-xs'>
										<div>
											<span className='w-full text-xs text-gray-800 leading-5 font-medium'>{item.position}</span>
										</div>
										
									</div>
								</div>
							);
						})}
					</div>
					<div className='w-full'>
						<button
							className=' flex justify-center items-center  px-4 py-2 rounded-md text-primary-01 '
							type=''>
							بیشتر
						</button>
					</div>
				</div>
			</div>
			<div className='p-3'>
				<div className='bg-gray-200 px-3 h-12 gap-1 flex justify-start items-center border border-gray-400 rounded-full'>
					<span className='text-gray-500'>
						<FaSearch className='w-5 h-5'/>
					</span>

					<input
						className='bg-gray-200 rounded-md text-sm focus:ring-red-200  p-1 w-full'
						placeholder='جستجو در محبوبترین'
						type='search'
						name=''
						value=''
					/>
				</div>
				<div className='w-full h- px-2 my-2 bg-gray-200 rounded-md shadow-md'>
					<div className='p-4'>
						<span className='text-lg font-bold'>جستجو های پرتکرار</span>
					</div>
					<div className=' flex flex-wrap items-center gap-2 text-xs font-medium'>
						<span className='px-3 py-1.5 text-gray-800 bg-gray-100 shadow-sm rounded-3xl'>متخصص زنان</span>
						<span className='px-3 py-1.5 text-gray-800 bg-gray-100 shadow-sm rounded-3xl'>غدد و متابولیسم</span>
						<span className='px-3 py-1.5 text-gray-800 bg-gray-100 shadow-sm rounded-3xl'>دیابت</span>
						<span className='px-3 py-1.5 text-gray-800 bg-gray-100 shadow-sm rounded-3xl'>پوست</span>
						<span className='px-3 py-1.5 text-gray-800 bg-gray-100 shadow-sm rounded-3xl'>زیبایی</span>
						<span className='px-3 py-1.5 text-gray-800 bg-gray-100 shadow-sm rounded-3xl'>بازیگری</span>
						<span className='px-3 py-1.5 text-gray-800 bg-gray-100 shadow-sm rounded-3xl'>برنامه نویس</span>
						<span className='px-3 py-1.5 text-gray-800 bg-gray-100 shadow-sm rounded-3xl'>فیلمنامه</span>
						<span className='px-3 py-1.5 text-gray-800 bg-gray-100 shadow-sm rounded-3xl'>هنرور</span>
						<span className='px-3 py-1.5 text-gray-800 bg-gray-100 shadow-sm rounded-3xl'>مغز و اعصاب</span>
						<span className='px-3 py-1.5 text-gray-800 bg-gray-100 shadow-sm rounded-3xl'>آموزش فوتبال</span>
						<span className='px-3 py-1.5 text-gray-800 bg-gray-100 shadow-sm rounded-3xl'>گوش و حلق و بینی</span>
						<span className='px-3 py-1.5 text-gray-800 bg-gray-100 shadow-sm rounded-3xl'>نقاشی</span>
					</div>
					<div className='pt-40 pb-2'>
						<span className='text-primary-01 font-bold p-2'>بیشتر</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default LeftProfile;
