import React from 'react';
import { TiStopwatch } from 'react-icons/ti';
import PN from 'persian-number';
import { FaChevronLeft } from 'react-icons/fa';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import LeftAndRightArrows from '@/tools/LeftAndRightArrows';
const data = [
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
	{
		id: 4,
		url: '/images/Book004.png',
		name: 'روانشناسی تاریک',
		ouner: 'ویلیام کوپر',
		Publications: '...',
		Price: 120000,
		Discount: 70,
		Supplier: 'سارا کریمی',
		SupplierUrl: '/images/KavehBehbahani.jpg',
	},
	{
		id: 5,
		url: '/images/Book005.png',
		name: '48 قانون قدرت و قانون پنجاهم',
		ouner: 'رابرت',
		Publications: '...',
		Price: 746000,
		Discount: 77,
		Supplier: 'عباس غفاری',
		SupplierUrl: '/images/KavehBehbahani.jpg',
	},
];

const Store = () => {
	const DiscountCalculation = (i, d) => {
		return i - (i * d) / 100;
	};
	return (
		<div className=' md:container px-8 md:px-0'>
			<div className='w-full'>
				<div className='w-full  md:flex justify-between items-center pb-4'>
					<span className='font-bold text-2xl text-primary-01 flex justify-center items-center pb-8 md:pb-0'>
						<span> تا</span>
						<span>{PN.convertEnToPe('80%')} </span>
						<span> تخفیف </span>
						<span className='text-gray-800'> در محبوب مال</span>
					</span>
					<div className='flex justify-between items-center gap-4'>
						<span>زمان باقیمانده:</span>

						<div className='text-lg flex justify-center items-center gap-2 bg-gray-800 py-1 px-3 text-white rounded-md'>
							<span>{PN.convertEnToPe('28:30:41')} </span>
							<span className='text-xl text-yellow-400'>
								<TiStopwatch />
							</span>
						</div>
					</div>
				</div>
				<div className='grid xs:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4'>
					<div className='w-full bg-gray-200 hover:bg-gray-100 hover:shadow-md'>
						<img
							className=' object-cover'
							src='/images/sale.png'
							alt=''
						/>
						<div className='p-2 flex justify-center items-center gap-2 font-bold'>
							<span>مشاهده همه</span>
							<span>
								<FaChevronLeft />
							</span>
						</div>
					</div>
					{data.map((item) => {
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
								<div className='flex justify-between items-center py-1 px-2'>
									<div className='flex flex-col justify-center items-start text-xs'>
										<span>عرضه کننده:</span>
										<span>{item.Supplier}</span>
									</div>
									<div className=''>
										<img
											className=' w-10 rounded-full'
											src={item.SupplierUrl}
											alt=''
										/>
									</div>
								</div>
							</div>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Store;
