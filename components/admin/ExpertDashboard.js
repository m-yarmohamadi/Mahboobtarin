import React, { useState } from 'react';
import Header from '../Header';
import { enToFaNumber } from '@/utils/enToFa';
import { GiWallet } from 'react-icons/gi';
import { FaPortrait } from 'react-icons/fa';
import MyInfo from './adminProfileSteps/MyInfo';
import Dashboard from './adminProfileSteps/dashboard';
const dataMenu = [
	{
		id: 1,
		title: 'پیشخوان',
		value: 'dashboard',
		quanity: '',
		icon: '',
	},
	{
		id: 2,
		title: 'اطلاعات من',
		value: 'myInfo',
		quanity: '',
		icon: '',
	},
	{
		id: 3,
		title: 'سفارش جدید',
		value: 'newOrder',
		quanity: '12',
		icon: '',
	},
	{
		id: 4,
		title: 'فراخوان جدید',
		value: '',
		quanity: '7',
		icon: '',
	},
	{
		id: 5,
		title: 'مدیریت خدمات',
		value: '',
		quanity: '',
		icon: '',
	},
	{
		id: 6,
		title: 'گالری',
		value: '',
		quanity: '',
		icon: '',
	},
	{
		id: 7,
		title: 'لینکدونی',
		value: '',
		quanity: '',
		icon: '',
	},
	{
		id: 8,
		title: 'نظزات و امتیازات',
		value: '',
		quanity: '',
		icon: '',
	},
	{
		id: 9,
		title: 'درخواست تولید محتوا',
		value: '',
		quanity: '',
		icon: '',
	},
	{
		id: 10,
		title: 'دنبال کنندگان',
		value: '',
		quanity: '',
		icon: '',
	},
	{
		id: 11,
		title: 'دنبال شونده',
		value: '',
		quanity: '',
		icon: '',
	},
	{
		id: 12,
		title: 'اعلان ها',
		value: '',
		quanity: '3',
		icon: '',
	},
	{
		id: 13,
		title: 'آمار',
		value: '',
		quanity: '',
		icon: '',
	},
	{
		id: 14,
		title: 'دعوت از دوستان',
		value: '',
		quanity: '',
		icon: '',
	},
	{
		id: 15,
		title: 'خرید اشتراک',
		value: '',
		quanity: '',
		icon: '',
	},
	{
		id: 16,
		title: 'پشتیبانی',
		value: '',
		quanity: '',
		icon: '',
	},
	{
		id: 17,
		title: 'تنظیمات',
		value: '',
		quanity: '',
		icon: '',
	},
	{
		id: 18,
		title: 'خروج از حساب کاربری',
		value: '',
		quanity: '',
		icon: '',
	},
];

const ExpertDashboard = () => {
	const [activeStep, setActiveStep] = useState('dashboard');
	const handleStep = () => {
		switch (activeStep) {
			case 'dashboard': {
				return <Dashboard />;
			}
			case 'myInfo': {
				return <MyInfo />;
			}

			default: {
				return <Dashboard />;
			}
		}
	};
	return (
		<div>
			<Header />
			<div className='mt-16'>
				<div className='pt-6 pb-4 text-lg bg-primary-01 w-full text-white font-bold flex justify-center items-center'>داشبورد متخصصان</div>
				<div className='  grid grid-cols-12'>
					<div className=' col-span-3  w-full h-full p-4'>
						<div className=' w-full bg-gray-200 rounded-md'>
							<div className='w-full flex justify-center items-center p-2'>
								<img
									className='w-20 rounded-full border-4 border-white'
									src='/images/FaribaEghdami.jpg'
									alt=''
								/>
							</div>
							<div className='w-full p-2 flex flex-col items-center justify-center gap-2'>
								<span className='font-bold'>مهدی شاه آبادی</span>
								<span>mahdishahabadi@</span>
								<span className='text-sm'>
									سطح: <span className='font-bold'>نقره ای</span>
								</span>
							</div>
							<div className='p-3'>
								<div className='p-3 bg-white rounded-md'>
									<div className=' flex justify-between items-center'>
										<span>مانده تا سطح طلایی:</span>
										<span>{enToFaNumber('21%')}</span>
									</div>
									<div className='w-full '>
										<div className='w-full bg-gray-300 rounded-full dark:bg-gray-800 flex flex-row-reverse'>
											<div className='bg-primary-01 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full w-1/5'>{enToFaNumber('21%')}</div>
										</div>
									</div>
								</div>
							</div>
						</div>

						<div className='p-2'>
							<div className='grid grid-cols-12 justify-center items-center text-gray-800'>
								<div className='w-full col-span-2 text-3xl'>
									<GiWallet />
								</div>
								<div className='w-full col-span-7 flex flex-col justify-center items-start'>
									<span>موجودی کیف پول</span>
									<span>
										<span>{enToFaNumber(0)}</span>
										<span>تومان</span>
									</span>
								</div>
								<div className='w-full col-span-3'>
									<button
										className='p-2 bg-primary-01 text-white rounded-md w-full'
										type=''>
										مشاهده
									</button>
								</div>
							</div>
						</div>

						<div>
							{dataMenu.map((item, index) => {
								return (
									<div
										key={index}
										onClick={() => setActiveStep(item.value)}
										className={`flex justify-start gap-6 items-center px-2 py-4 cursor-pointer ${activeStep.toLowerCase() ===  (item.value).toLowerCase() && `text-secondary-01 font-bold`}`}>
										<span>
											<FaPortrait />
										</span>
										<span>{item.title}</span>
										{item.quanity && <span className='bg-primary-01 w-6 h-6 text-white flex justify-center items-center rounded-full'>{enToFaNumber(item.quanity)}</span>}
									</div>
								);
							})}
						</div>
					</div>
					<div className=' col-span-9 bg-red-400 w-full h-screen'>{handleStep()}</div>
				</div>
			</div>
		</div>
	);
};

export default ExpertDashboard;
