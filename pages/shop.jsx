import Header from '@/components/Header';
import Slider from '@/components/shop/Slider';
import SpecialSell from '@/components/shop/SpecialSell';
import Categoreis from '@/components/shop/Categories';
import BestSellers from '@/components/shop/BestSellers';
import SelectedDiscounts from '@/components/shop/SelectedDiscounts';
import PopularBrands from '@/components/shop/PopularBrands';
import SupportOption from '@/components/shop/SupportOption';
import Footer from '@/components/Footer';

const sliders = [
	{
		image: '/images/shop/baner01.jpg',
	},
	{
		image: '/images/shop/baner02.jpg',
	},
];
const banners = [
	{
		image: '/images/shop/banerShop01.png',
	},
	{
		image: '/images/shop/banerShop02.png',
	},
	{
		image: '/images/shop/banerShop03.png',
	},
	{
		image: '/images/shop/banerShop04.png',
	},
];

export default function shop() {
	return (
		<div>
			<Header />
			<Slider sliders={sliders} />
			<SpecialSell />
			<Categoreis />

			<div className='md:mx-auto md:container p-6 mt-14'>
				<div className='w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 mb-6'>
					{banners.map((item, index) => {
						return (
							<div
								key={index}
								className=' relative w-full rounded-lg overflow-hidden hover:shadow-md'>
								<img
									src={item.image}
									alt={item.image}
									className='w-full h-full object-cover '
								/>
                                <button className=' absolute bottom-2 right-2 py-2 px-4 bg-slate-50 rounded-md hover:bg-slate-100'>
                                    خرید
                                </button>
							</div>
						);
					})}
				</div>
				<div className='w-full  rounded-lg overflow-hidden'>
					<img
						src='/images/shop/banerShop05.png'
						alt=''
						className='w-full h-full object-cover object-center'
					/>
				</div>
			</div>

			<BestSellers />
			<SelectedDiscounts />

			<div className='w-full h-[250px] mt-9'>
				<img
					src='/images/shop/banerShop06.png'
					alt=''
					className='w-full  object-cover object-center'
				/>
			</div>

			<PopularBrands />
			<SupportOption />
			<Footer />
		</div>
	);
}
