import React from 'react';
import { TiStopwatch } from 'react-icons/ti';
import PN from 'persian-number';
import { FaChevronLeft } from 'react-icons/fa';
import { FaArrowLeftLong, FaArrowRightLong } from 'react-icons/fa6';
import LeftAndRightArrows from '@/tools/LeftAndRightArrows';
import { useGetBestSellProducts } from '@/hooks/useProducts';
import numberWithCommas from '@/utils/numberWithCommas';
import { useAddToCart, useGetCart } from '@/hooks/useCart';
import { useGetAddress } from '@/hooks/useProfile';
import Link from 'next/link';
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
	const { isLoading, products } = useGetBestSellProducts();
	const { addressList } = useGetAddress();
	const { isProductInCart } = useGetCart();
	const { isAdding, addNewToCart } = useAddToCart();
	const addDiscount = (item, discount) => {
		return item - ((item * discount) / 100)
	}


	return (
		<div className=' md:container px-8 md:px-0'>
			<div className='w-full'>
				<div className='w-full  md:flex justify-between items-center pb-4'>
					<span className='font-bold text-2xl text-primary-01 flex justify-center items-center pb-8 md:pb-0'>
						<span> تا</span>
						<span>{PN.convertEnToPe('80%')} </span>
						<span> تخفیف </span>
						&nbsp;
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
				<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-4'>
					<div className='w-full bg-gray-200 hover:bg-gray-100 hover:shadow-md'>
						<img
							className='m-auto inset-0 object-cover'
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
					{!isLoading && products?.map((item) => {
						return (
							<div key={item.id} className='flex flex-col overflow-hidden bg-white rounded-xl duration-300 border border-gray-300 hover:shadow-md'>
								<Link href={`/products/${item.id}`} className='block'>
									<div className='aspect-w-10 aspect-h-10'>
										<img
											src={item.photos[0].path}
											alt={item.photos[0].original_name}
											className='w-full h-full object-center object-cover'
										/>
									</div>
								</Link>
								<div className='p-4 flex-1 flex flex-col justify-between'>
									<Link href={`/products/${item.id}`} className='block'>
										<h3 className='text-gray-800 font-bold mb-2'>
											{item.title}
										</h3>
										<div className='text-xs text-gray-600 leading-8' dangerouslySetInnerHTML={{ __html: item.shortdescription }} />

									</Link>
									<div className='space-y-4'>
										<div className='w-full flex mt-4 gap-1 justify-between items-center'>
											{item.discount_price !== 0 && <span className='text-sm text-white bg-error px-4 py-2 rounded-md'>{item.discount_price} %</span>}
											<div className='flex flex-col justify-center items-center'>
												<p className='text-md line-through  text-gray-400'>{numberWithCommas(item.price)} </p>
												<p className='text-lg font-bold text-gray-700 text-left'>{numberWithCommas(addDiscount(item.price, item.discount_price))} تومان</p>

											</div>
										</div>
										<div className='flex justify-between items-center'>
											<span className='flex flex-col justify-center items-start text-xs'>
												<span>عرضه کننده:</span>
												<span>امیر عزیزی</span>
											</span>
											<span>
												<img className='w-10 h-10 rounded-full' src='/images//KavehBehbahani.jpg' />
											</span>
										</div>
										{
											isProductInCart(item.id) ?
												<Link href="/cart" className='btn btn--secondary w-full'>
													موجود در سبد خرید، مشاهده
												</Link>
												:
												<button onClick={() => addNewToCart(item.id)} className='btn btn--primary w-full'>
													افزودن به سبد خرید
												</button>
										}
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
